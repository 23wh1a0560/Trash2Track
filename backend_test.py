import requests
import sys
import json
from datetime import datetime

class T2TAPITester:
    def __init__(self, base_url="https://waste-wizard-8.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.demo_users = {}

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and len(response_data) <= 3:
                        print(f"   Response: {response_data}")
                    elif isinstance(response_data, list) and len(response_data) <= 2:
                        print(f"   Response: {len(response_data)} items returned")
                except:
                    print(f"   Response: Non-JSON response")
                return True, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_demo_data_initialization(self):
        """Test demo data initialization"""
        print("\n" + "="*50)
        print("TESTING DEMO DATA INITIALIZATION")
        print("="*50)
        
        success, response = self.run_test(
            "Initialize Demo Data",
            "POST",
            "init-demo-data",
            200
        )
        return success

    def test_authentication(self):
        """Test authentication for all three roles"""
        print("\n" + "="*50)
        print("TESTING AUTHENTICATION")
        print("="*50)
        
        demo_accounts = [
            {"email": "citizen@demo.com", "role": "citizen"},
            {"email": "worker@demo.com", "role": "worker"},
            {"email": "admin@demo.com", "role": "admin"}
        ]
        
        all_passed = True
        for account in demo_accounts:
            success, response = self.run_test(
                f"Login as {account['role']}",
                "POST",
                "auth/login",
                200,
                data=account
            )
            if success and 'user' in response:
                self.demo_users[account['role']] = response['user']
                print(f"   User ID: {response['user']['id']}")
            else:
                all_passed = False
        
        return all_passed

    def test_user_endpoints(self):
        """Test user management endpoints"""
        print("\n" + "="*50)
        print("TESTING USER ENDPOINTS")
        print("="*50)
        
        all_passed = True
        
        # Test get user for each role
        for role, user_data in self.demo_users.items():
            success, response = self.run_test(
                f"Get {role} user",
                "GET",
                f"users/{user_data['id']}",
                200
            )
            if not success:
                all_passed = False
        
        # Test create new user
        new_user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "role": "citizen"
        }
        
        success, response = self.run_test(
            "Create new user",
            "POST",
            "users",
            200,
            data=new_user_data
        )
        if not success:
            all_passed = False
        
        return all_passed

    def test_waste_report_endpoints(self):
        """Test waste report CRUD operations"""
        print("\n" + "="*50)
        print("TESTING WASTE REPORT ENDPOINTS")
        print("="*50)
        
        all_passed = True
        
        # Get citizen user for creating reports
        citizen_user = self.demo_users.get('citizen')
        if not citizen_user:
            print("❌ No citizen user found for testing reports")
            return False
        
        # Test create report
        report_data = {
            "user_id": citizen_user['id'],
            "title": "Test Waste Report",
            "description": "This is a test waste report",
            "waste_type": "general",
            "location": "Test Location",
            "latitude": 40.7128,
            "longitude": -74.0060
        }
        
        success, response = self.run_test(
            "Create waste report",
            "POST",
            "reports",
            200,
            data=report_data
        )
        
        report_id = None
        if success and 'id' in response:
            report_id = response['id']
        else:
            all_passed = False
        
        # Test get all reports
        success, response = self.run_test(
            "Get all reports",
            "GET",
            "reports",
            200
        )
        if not success:
            all_passed = False
        
        # Test get reports by user
        success, response = self.run_test(
            "Get reports by user",
            "GET",
            "reports",
            200,
            params={"user_id": citizen_user['id']}
        )
        if not success:
            all_passed = False
        
        # Test update report status
        if report_id:
            worker_user = self.demo_users.get('worker')
            success, response = self.run_test(
                "Update report status",
                "PUT",
                f"reports/{report_id}/status?status=in_progress&worker_id={worker_user['id'] if worker_user else 'test'}",
                200
            )
            if not success:
                all_passed = False
        
        return all_passed

    def test_bin_endpoints(self):
        """Test bin management endpoints"""
        print("\n" + "="*50)
        print("TESTING BIN ENDPOINTS")
        print("="*50)
        
        all_passed = True
        
        # Test get all bins
        success, response = self.run_test(
            "Get all bins",
            "GET",
            "bins",
            200
        )
        if not success:
            all_passed = False
        
        # Test get bin alerts
        success, response = self.run_test(
            "Get bin alerts",
            "GET",
            "bins/alerts",
            200
        )
        if not success:
            all_passed = False
        
        return all_passed

    def test_schedule_endpoints(self):
        """Test schedule endpoints"""
        print("\n" + "="*50)
        print("TESTING SCHEDULE ENDPOINTS")
        print("="*50)
        
        all_passed = True
        
        # Test get all schedules
        success, response = self.run_test(
            "Get all schedules",
            "GET",
            "schedules",
            200
        )
        if not success:
            all_passed = False
        
        # Test get schedules by worker
        worker_user = self.demo_users.get('worker')
        if worker_user:
            success, response = self.run_test(
                "Get schedules by worker",
                "GET",
                "schedules",
                200,
                params={"worker_id": worker_user['id']}
            )
            if not success:
                all_passed = False
        
        return all_passed

    def test_driver_endpoints(self):
        """Test driver management endpoints"""
        print("\n" + "="*50)
        print("TESTING DRIVER ENDPOINTS")
        print("="*50)
        
        all_passed = True
        
        # Test get all drivers
        success, response = self.run_test(
            "Get all drivers",
            "GET",
            "drivers",
            200
        )
        
        driver_id = None
        if success and response and len(response) > 0:
            driver_id = response[0]['id']
        else:
            all_passed = False
        
        # Test assign driver
        if driver_id:
            success, response = self.run_test(
                "Assign driver to route",
                "PUT",
                f"drivers/{driver_id}/assign?route_id=test-route-123",
                200
            )
            if not success:
                all_passed = False
        
        return all_passed

    def test_analytics_endpoints(self):
        """Test analytics endpoints"""
        print("\n" + "="*50)
        print("TESTING ANALYTICS ENDPOINTS")
        print("="*50)
        
        success, response = self.run_test(
            "Get analytics overview",
            "GET",
            "analytics/overview",
            200
        )
        
        if success:
            print(f"   Analytics data: {response}")
        
        return success

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting T2T API Testing...")
        print(f"Testing against: {self.api_url}")
        
        # Test in logical order
        tests = [
            ("Demo Data Initialization", self.test_demo_data_initialization),
            ("Authentication", self.test_authentication),
            ("User Endpoints", self.test_user_endpoints),
            ("Waste Report Endpoints", self.test_waste_report_endpoints),
            ("Bin Endpoints", self.test_bin_endpoints),
            ("Schedule Endpoints", self.test_schedule_endpoints),
            ("Driver Endpoints", self.test_driver_endpoints),
            ("Analytics Endpoints", self.test_analytics_endpoints),
        ]
        
        failed_tests = []
        
        for test_name, test_func in tests:
            try:
                if not test_func():
                    failed_tests.append(test_name)
            except Exception as e:
                print(f"❌ {test_name} failed with exception: {str(e)}")
                failed_tests.append(test_name)
        
        # Print final results
        print("\n" + "="*60)
        print("FINAL TEST RESULTS")
        print("="*60)
        print(f"📊 Tests passed: {self.tests_passed}/{self.tests_run}")
        print(f"✅ Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if failed_tests:
            print(f"\n❌ Failed test categories:")
            for test in failed_tests:
                print(f"   - {test}")
        else:
            print(f"\n🎉 All test categories passed!")
        
        return len(failed_tests) == 0

def main():
    tester = T2TAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())