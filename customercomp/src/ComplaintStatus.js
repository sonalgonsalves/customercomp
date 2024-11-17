import React, { useState } from "react";

const ComplaintStatus = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, name: "John Doe", complaintType: "Technical", description: "Issue with internet", status: "Pending", date: "2024-09-10" },
    { id: 2, name: "Jane Smith", complaintType: "Billing", description: "Incorrect charge on bill", status: "Resolved", date: "2024-11-09" },
    { id: 3, name: "Joh De", complaintType: "Technical", description: "Issue with internet", status: "Pending", date: "2024-11-10" },
    // Add more complaint data as needed
  ]);

  const [filters, setFilters] = useState({
    status: "",
    sortBy: "date", // Default sort by date
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter complaints based on the status
  const filteredComplaints = complaints.filter(
    (complaint) => !filters.status || complaint.status === filters.status
  );

  // Sort complaints by date or status
  const sortedComplaints = filteredComplaints.sort((a, b) => {
    if (filters.sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Complaint Status</h2>

      <div style={styles.filterContainer}>
        <label>Filter by Status:</label>
        <select name="status" onChange={handleFilterChange} value={filters.status}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div style={styles.filterContainer}>
        <label>Sort by:</label>
        <select name="sortBy" onChange={handleFilterChange} value={filters.sortBy}>
          <option value="date">Date</option>
          <option value="status">Status</option>
        </select>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Complaint Type</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedComplaints.map((complaint) => (
            <tr key={complaint.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{complaint.name}</td>
              <td style={styles.tableCell}>{complaint.complaintType}</td>
              <td style={styles.tableCell}>{complaint.description}</td>
              <td style={styles.tableCell}>{complaint.status}</td>
              <td style={styles.tableCell}>{complaint.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline styles for better presentation
const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "2rem",
  },
  filterContainer: {
    marginBottom: "10px",
    display: "inline-block",
    marginRight: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    padding: "10px",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  tableRow: {
    backgroundColor: "#f9f9f9",
  },
};

export default ComplaintStatus;
