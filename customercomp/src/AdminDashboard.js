import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(""); // Complaint filter state
  const [selectedStatus, setSelectedStatus] = useState(""); // Status filter state

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/complaints");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []); // Empty array ensures this runs only once when the component mounts

  const handleComplaintFilterChange = (event) => {
    setSelectedComplaint(event.target.value); // Update complaint filter state
  };

  const handleStatusFilterChange = (event) => {
    setSelectedStatus(event.target.value); // Update status filter state
  };
    
  const handleStatusChange = async (id, newStatus) => {
    console.log(`Changing status for complaint with ID: ${id} to ${newStatus}`);
    
    try {
      const response = await axios.post("http://localhost:5000/api/complaints/updateStatus", {
        id, 
        status: newStatus,
      });
  
      // Log the updated complaint to confirm the response
      console.log(response.data);
  
      // Update the frontend with the new status
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === response.data._id 
            ? { ...complaint, status: response.data.status } 
            : complaint
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  // Filter complaints based on selected complaint and status
  const filteredComplaints = complaints.filter((complaint) => {
    return (
      (selectedComplaint ? complaint.complaintType.toLowerCase().includes(selectedComplaint.toLowerCase()) : true) &&
      (selectedStatus ? complaint.status === selectedStatus : true)
    );
  });

  const handleLogout = () => {
    navigate("/logout"); // Navigate to the logout route
  };

  return (
    <Box p={3} height="100vh">
      <Typography variant="h4" gutterBottom>
        ADMIN DASHBOARD
      </Typography>
      {/* Button aligned to the right */}
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
      <br />
      <br />
      <Grid container spacing={8} align="center">
        {/* Complaint Filter Dropdown */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Filter by Complaints
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Complaint</InputLabel>
              <Select value={selectedComplaint} onChange={handleComplaintFilterChange} label="Complaint">
                <MenuItem value="">All Complaints</MenuItem>
                <MenuItem value="Billing">Billing</MenuItem>
                <MenuItem value="Service">Service</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Status Filter Dropdown */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Sort by Status
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={selectedStatus} onChange={handleStatusFilterChange} label="Status">
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
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Complaint Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Change Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow
                    key={complaint._id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                    }}
                  >
                    <TableCell align="center">{complaint.name}</TableCell>
                    <TableCell align="center">{complaint.complaintType}</TableCell>
                    <TableCell align="center">{complaint.description}</TableCell>
                    <TableCell align="center">{complaint.status}</TableCell>
                    <TableCell align="center">
                      {new Date(complaint.date).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={complaint.status} // Ensure the value is properly bound
                          onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                          label="Status"
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
