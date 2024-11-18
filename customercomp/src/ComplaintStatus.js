import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box,Typography,Button } from '@mui/material';
import "./ComplaintStatus.css"; // Import CSS file for styling]
import { useNavigate } from "react-router-dom";

const ComplaintStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    sortBy: "date", // Default sort by date
  });
  const navigate = useNavigate();

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
  const handleLogout = () => {
    navigate("/logout"); // Navigate to the logout route
  };
  const ChangePage = () => {
    navigate("/complaint"); 
  };

  return (
    <Box p={3} height="80vh">
    <Typography variant="h4" gutterBottom>
      CUSTOMER DASHBOARD
    </Typography>
    <div>
    <Button
        variant="outlined"
        color="primary"
        onClick={ChangePage}
        sx={{
          position: "absolute",
          top: 20,
          right: 150,
        }}
      >
        RAISE COMPLAINT
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        LOGOUT
      </Button>
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
    </div>
    </Box>
  );

};

export default ComplaintStatus;
