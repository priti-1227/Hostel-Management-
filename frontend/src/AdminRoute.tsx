import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
  
    if (!token || role !== "admin") {
      return <Navigate to="/unauthorized" />;
    }
  
    return children;
};

export default AdminRoute;
