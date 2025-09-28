# T2T – Trash to Track

**T2T – Trash to Track** is an intelligent, sustainability-focused waste management platform designed to optimize urban sanitation. The system integrates citizens, municipal workers, and administrators, leveraging real-time IoT data, cloud services, and responsive web technologies to create cleaner, smarter, and more efficient cities.

---

## Features

### Citizen Module
- Submit geo-tagged photos of overflowing bins or waste dumps.  
- Track waste collection schedules.  
- Earn eco-points for responsible participation.  
- Monitor the status of submitted reports in real time.  

### Worker Module
- Receive alerts from IoT-enabled smart bins.  
- Optimized collection routes for efficiency.  
- Access training modules and real-time performance dashboards.  
- Log completed tasks for tracking and accountability.  

### Administrator Module
- Monitor bin statuses and fill levels through dashboards.  
- Assign and manage worker routes efficiently.  
- Analyze operational efficiency with real-time metrics.  
- Issue rewards and penalties to maintain accountability.  
- Generate insights for strategic planning and resource allocation.  

---

## System Architecture

### Frontend
- **React.js** – Component-based UI framework for dynamic web apps.  
- **CRACO** – Custom Webpack and Tailwind CSS configuration without ejecting.  
- **Tailwind CSS** – Utility-first styling for responsive and consistent design.  
- **shadcn/ui** – Prebuilt, reusable UI components for rapid development.  
- **Lucide React** – Lightweight and customizable icon library.  
- **React Router** – Client-side routing and navigation.  

### Backend & Cloud Services
- **Firebase Authentication** – Secure login with role-based access control.  
- **Firestore** – Real-time NoSQL database for reports, sensor data, and users.  
- **Firebase Functions** – Serverless backend logic and automation.  
- **Firebase Storage** – Cloud storage for photos and attachments.  
- **Firebase Hosting** – Frontend hosting (also compatible with Vercel or Netlify).  

### IoT Integration
- Smart bins equipped with **ultrasonic or weight sensors**.  
- Real-time fill-level monitoring triggers alerts and route updates.  
- Data sent via Firebase SDK for analytics and dashboard visualization.  

---

## Workflow Overview
1. Citizens report waste issues with geo-tagged photos.  
2. IoT smart bins transmit real-time fill-level data.  
3. Alerts and optimized routes are sent to municipal workers.  
4. Administrators monitor dashboards for trends and efficiency.  
5. Rewards and penalties maintain accountability and encourage citizen engagement.  
6. Data analytics informs operational improvements and policy decisions.  

---

## Technology Stack

| Layer      | Technology |
|------------|-----------|
| Frontend   | React.js, Tailwind CSS, shadcn/ui, Lucide React, CRACO, React Router |
| Backend    | Firebase Auth, Firestore, Firebase Functions, Firebase Storage |
| Hosting    | Firebase Hosting, Vercel, Netlify |
| IoT        | Ultrasonic / Weight Sensors |

---

## Benefits
- Real-time waste monitoring and alerts.  
- Optimized collection routes reduce cost and fuel consumption.  
- Enhanced operational efficiency and accountability.  
- Encourages public participation via eco-point incentives.  
- Promotes sustainable urban sanitation practices.  
