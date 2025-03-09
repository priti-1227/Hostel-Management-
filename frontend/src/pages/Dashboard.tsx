import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4">Welcome to the Dashboard</Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
