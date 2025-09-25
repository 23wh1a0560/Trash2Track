const API_URL = "http://localhost:5000/api";

// Fetch all reports for a user (get request)
export const fetchReports = async (uid) => {
  try {
    const response = await fetch(`${API_URL}/reports/user/${uid}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
};

// Add a new report (post request)
export const addReport = async (uid, title, description) => {
  const reportData = { uid, title, description };
  try {
    const response = await fetch(`${API_URL}/reports/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding report:", error);
  }
};
