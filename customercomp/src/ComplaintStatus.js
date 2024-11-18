import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ComplaintStatus.css"; // Import CSS file for styling

const ComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    sortBy: "date", // Default sort by date
  });

  useEffect(() => {
    // Fetch complaints from backend
    axios
      .get("http://localhost:5000/api/complaints") // Replace with your actual endpoint
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter and sort logic...
  const filteredComplaints = complaints.filter(
    (complaint) => !filters.status || complaint.status === filters.status
  );

  const sortedComplaints = filteredComplaints.sort((a, b) => {
    if (filters.sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  return (
    <div className="complaint-status-container">
      <h2>Complaint Status</h2>
      <div className="filters">
        <label>Filter by Status:</label>
        <select name="status" onChange={handleFilterChange} value={filters.status}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
        <label>Sort by:</label>
        <select name="sortBy" onChange={handleFilterChange} value={filters.sortBy}>
          <option value="date">Date</option>
          <option value="status">Status</option>
        </select>
      </div>
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Complaint Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedComplaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.name}</td>
              <td>{complaint.complaintType}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>{new Date(complaint.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintStatus;
