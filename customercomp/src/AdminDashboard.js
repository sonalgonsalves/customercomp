import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([
    { id: 1, text: "Complaint About Service", status: "Pending", changes: "" },
    { id: 2, text: "Late Delivery", status: "Resolved", changes: "Updated to Resolved" },
    { id: 3, text: "Product Quality Issue", status: "Pending", changes: "" },
  ]);
  const [selectedComplaint, setSelectedComplaint] = useState("");  // Complaint filter state
  const [selectedStatus, setSelectedStatus] = useState("");  // Status filter state

  const handleComplaintFilterChange = (event) => {
    setSelectedComplaint(event.target.value);  // Update complaint filter state
  };

  const handleStatusFilterChange = (event) => {
    setSelectedStatus(event.target.value);  // Update status filter state
  };

  const handleStatusChange = (id, newStatus) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === id
          ? { ...complaint, status: newStatus, changes: `Status changed to ${newStatus}` }
          : complaint
      )
    );
  };

  // Filter complaints based on selected complaint and status
  const filteredComplaints = complaints.filter(complaint => {
    return (
      (selectedComplaint ? complaint.text.toLowerCase().includes(selectedComplaint.toLowerCase()) : true) &&
      (selectedStatus ? complaint.status === selectedStatus : true)
    );
  });

  const handleLogout = () => {
    navigate("/logout");  // Corrected: navigate to the logout route
  };

  return (
    <Box p={3} height="100vh">
      <Typography variant="h4" gutterBottom>
        ADMIN DASHBOARD
      </Typography>
      {/* Button aligned to the right */}
      <Button variant="contained" color="primary" onClick={handleLogout} sx={{
          position: 'absolute', 
          top: 20, 
          right: 20}}>
          LOGOUT
        </Button>
        <br />
      <br />
      <Grid container spacing={8} align="center">
        {/* Complaint Filter Dropdown */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Filter by Complaints
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Complaint</InputLabel>
              <Select
                value={selectedComplaint}
                onChange={handleComplaintFilterChange}
                label="Complaint"
              >
                <MenuItem value="">All Complaints</MenuItem>
                <MenuItem value="service">Complaint about service</MenuItem>
                <MenuItem value="delivery">Late delivery</MenuItem>
                <MenuItem value="quality">Product quality issue</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Status Filter Dropdown */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Sort by Status
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                onChange={handleStatusFilterChange}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Table to display Complaints */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">COMPLAINTS</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">CHANGES</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    <TableCell align="center">{complaint.text}</TableCell>
                    <TableCell align="center">{complaint.status}</TableCell>
                    <TableCell align="center">{complaint.changes}</TableCell>
                    <TableCell align="center">
                      <FormControl>
                        <Select
                          value={complaint.status}
                          onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Resolved">Resolved</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
