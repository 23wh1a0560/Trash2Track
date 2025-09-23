from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class ReportStatus(str, Enum):
    REPORTED = "reported"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"

class UserRole(str, Enum):
    CITIZEN = "citizen"
    WORKER = "worker"
    ADMIN = "admin"

class WasteType(str, Enum):
    GENERAL = "general"
    RECYCLABLE = "recyclable"
    HAZARDOUS = "hazardous"
    ORGANIC = "organic"
    E_WASTE = "e_waste"

# Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    role: UserRole
    eco_points: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class WasteReport(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    description: str
    waste_type: WasteType
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None
    status: ReportStatus = ReportStatus.REPORTED
    assigned_worker: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    resolved_at: Optional[datetime] = None

class Bin(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    location: str
    latitude: float
    longitude: float
    capacity: int  # liters
    current_level: int  # percentage 0-100
    waste_type: WasteType
    last_collected: datetime
    next_collection: datetime

class Schedule(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    worker_id: str
    area: str
    bins: List[str]  # bin IDs
    scheduled_date: datetime
    status: str = "pending"  # pending, in_progress, completed
    route_order: List[str] = []

class Driver(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    vehicle_number: str
    shift: str  # morning, evening, night
    availability: bool = True
    current_route: Optional[str] = None

# Create requests models
class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
    role: UserRole

class WasteReportCreate(BaseModel):
    user_id: str
    title: str
    description: str
    waste_type: WasteType
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    role: UserRole

# Auth endpoints
@api_router.post("/auth/login")
async def login(request: LoginRequest):
    # Mock authentication - in production, implement proper auth
    users = await db.users.find({"email": request.email, "role": request.role}).to_list(1)
    if not users:
        # Create demo user if doesn't exist
        demo_user = User(
            name=f"Demo {request.role.title()}",
            email=request.email,
            phone="+1234567890",
            role=request.role,
            eco_points=250 if request.role == UserRole.CITIZEN else 0
        )
        await db.users.insert_one(demo_user.dict())
        return {"user": demo_user, "token": "demo_token_123"}
    
    user = User(**users[0])
    return {"user": user, "token": "demo_token_123"}

# User endpoints
@api_router.post("/users", response_model=User)
async def create_user(user_data: UserCreate):
    user = User(**user_data.dict())
    await db.users.insert_one(user.dict())
    return user

@api_router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    user_data = await db.users.find_one({"id": user_id})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user_data)

# Waste report endpoints
@api_router.post("/reports", response_model=WasteReport)
async def create_report(report_data: WasteReportCreate):
    report = WasteReport(**report_data.dict())
    await db.reports.insert_one(report.dict())
    return report

@api_router.get("/reports", response_model=List[WasteReport])
async def get_reports(user_id: Optional[str] = None, status: Optional[ReportStatus] = None):
    query = {}
    if user_id:
        query["user_id"] = user_id
    if status:
        query["status"] = status
    
    reports = await db.reports.find(query).to_list(100)
    return [WasteReport(**report) for report in reports]

@api_router.put("/reports/{report_id}/status")
async def update_report_status(report_id: str, status: ReportStatus, worker_id: Optional[str] = None):
    update_data = {"status": status}
    if worker_id:
        update_data["assigned_worker"] = worker_id
    if status == ReportStatus.RESOLVED:
        update_data["resolved_at"] = datetime.now(timezone.utc)
    
    await db.reports.update_one({"id": report_id}, {"$set": update_data})
    return {"message": "Status updated successfully"}

# Bin management endpoints
@api_router.get("/bins", response_model=List[Bin])
async def get_bins():
    bins = await db.bins.find().to_list(100)
    return [Bin(**bin_data) for bin_data in bins]

@api_router.get("/bins/alerts")
async def get_bin_alerts():
    bins = await db.bins.find({"current_level": {"$gte": 60}}).to_list(100)
    return [Bin(**bin_data) for bin_data in bins]

# Schedule endpoints
@api_router.get("/schedules", response_model=List[Schedule])
async def get_schedules(worker_id: Optional[str] = None):
    query = {}
    if worker_id:
        query["worker_id"] = worker_id
    
    schedules = await db.schedules.find(query).to_list(100)
    return [Schedule(**schedule) for schedule in schedules]

@api_router.post("/schedules", response_model=Schedule)
async def create_schedule(schedule_data: Schedule):
    await db.schedules.insert_one(schedule_data.dict())
    return schedule_data

# Driver endpoints
@api_router.get("/drivers", response_model=List[Driver])
async def get_drivers():
    drivers = await db.drivers.find().to_list(100)
    return [Driver(**driver) for driver in drivers]

@api_router.put("/drivers/{driver_id}/assign")
async def assign_driver(driver_id: str, route_id: str):
    await db.drivers.update_one(
        {"id": driver_id}, 
        {"$set": {"current_route": route_id, "availability": False}}
    )
    return {"message": "Driver assigned successfully"}

# Analytics endpoints
@api_router.get("/analytics/overview")
async def get_analytics_overview():
    total_reports = await db.reports.count_documents({})
    resolved_reports = await db.reports.count_documents({"status": "resolved"})
    active_bins = await db.bins.count_documents({})
    high_priority_bins = await db.bins.count_documents({"current_level": {"$gte": 80}})
    
    return {
        "total_reports": total_reports,
        "resolved_reports": resolved_reports,
        "pending_reports": total_reports - resolved_reports,
        "active_bins": active_bins,
        "high_priority_bins": high_priority_bins,
        "collection_efficiency": round((resolved_reports / max(total_reports, 1)) * 100, 1)
    }

# Initialize demo data
@api_router.post("/init-demo-data")
async def init_demo_data():
    # Clear existing data
    await db.users.delete_many({})
    await db.reports.delete_many({})
    await db.bins.delete_many({})
    await db.schedules.delete_many({})
    await db.drivers.delete_many({})
    
    # Create demo users
    demo_users = [
        User(name="John Citizen", email="citizen@demo.com", phone="+1234567890", role=UserRole.CITIZEN, eco_points=350),
        User(name="Mike Worker", email="worker@demo.com", phone="+1234567891", role=UserRole.WORKER, eco_points=0),
        User(name="Admin Smith", email="admin@demo.com", phone="+1234567892", role=UserRole.ADMIN, eco_points=0),
    ]
    
    for user in demo_users:
        await db.users.insert_one(user.dict())
    
    # Create demo waste reports
    demo_reports = [
        WasteReport(
            user_id=demo_users[0].id,
            title="Overflowing Bin on Main Street",
            description="The public bin near the coffee shop is overflowing with waste.",
            waste_type=WasteType.GENERAL,
            location="123 Main Street",
            latitude=40.7128,
            longitude=-74.0060,
            status=ReportStatus.REPORTED
        ),
        WasteReport(
            user_id=demo_users[0].id,
            title="Illegal Dumping in Park",
            description="Someone dumped construction waste in Central Park.",
            waste_type=WasteType.HAZARDOUS,
            location="Central Park",
            latitude=40.7589,
            longitude=-73.9851,
            status=ReportStatus.IN_PROGRESS,
            assigned_worker=demo_users[1].id
        ),
        WasteReport(
            user_id=demo_users[0].id,
            title="Recyclables Mixed with General Waste",
            description="Recyclable materials are being mixed with general waste at this location.",
            waste_type=WasteType.RECYCLABLE,
            location="456 Oak Avenue",
            latitude=40.7505,
            longitude=-73.9934,
            status=ReportStatus.RESOLVED,
            resolved_at=datetime.now(timezone.utc)
        )
    ]
    
    for report in demo_reports:
        await db.reports.insert_one(report.dict())
    
    # Create demo bins
    demo_bins = [
        Bin(
            location="Downtown Plaza",
            latitude=40.7128,
            longitude=-74.0060,
            capacity=240,
            current_level=85,
            waste_type=WasteType.GENERAL,
            last_collected=datetime.now(timezone.utc),
            next_collection=datetime.now(timezone.utc)
        ),
        Bin(
            location="Park Entrance",
            latitude=40.7589,
            longitude=-73.9851,
            capacity=120,
            current_level=45,
            waste_type=WasteType.RECYCLABLE,
            last_collected=datetime.now(timezone.utc),
            next_collection=datetime.now(timezone.utc)
        ),
        Bin(
            location="Shopping Center",
            latitude=40.7505,
            longitude=-73.9934,
            capacity=180,
            current_level=92,
            waste_type=WasteType.GENERAL,
            last_collected=datetime.now(timezone.utc),
            next_collection=datetime.now(timezone.utc)
        )
    ]
    
    for bin_data in demo_bins:
        await db.bins.insert_one(bin_data.dict())
    
    # Create demo drivers
    demo_drivers = [
        Driver(name="Robert Johnson", phone="+1234567893", vehicle_number="WM-001", shift="morning"),
        Driver(name="Sarah Wilson", phone="+1234567894", vehicle_number="WM-002", shift="evening"),
        Driver(name="David Brown", phone="+1234567895", vehicle_number="WM-003", shift="morning", availability=False, current_route="route-1")
    ]
    
    for driver in demo_drivers:
        await db.drivers.insert_one(driver.dict())
    
    return {"message": "Demo data initialized successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()