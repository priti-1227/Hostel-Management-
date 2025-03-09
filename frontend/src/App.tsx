import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.ts";
import { useState } from "react";
import PrivateRoute from "./PrivateRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AdminRoute from "./AdminRoute.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
// import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
           <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
