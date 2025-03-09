import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      };
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
    <Typography variant="h4">Welcome to the Admin Dashboard</Typography>
    <Button
      variant="contained"
      color="secondary"
      sx={{ mt: 2 }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  </Box>
  )
}

export default AdminDashboard
