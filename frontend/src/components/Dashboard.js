import React, { useState, useEffect } from "react";
import { fetchReports } from "../services/api"; // API to fetch reports

const Dashboard = ({ uid }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports when component is mounted or uid changes
    const loadReports = async () => {
      const data = await fetchReports(uid);
      setReports(data);
    };
    loadReports();
  }, [uid]);  // Re-fetch reports when uid changes

  return (
    <div>
      <h1>Your Reports</h1>
      <ul>
        {reports.length === 0 ? (
          <li>No reports found.</li>
        ) : (
          reports.map((report) => (
            <li key={report.id}>
              {report.title} - {report.status}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
