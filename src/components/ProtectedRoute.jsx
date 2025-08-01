import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const isAdminRoute = location.pathname.startsWith("/admin");
      const isAdmin = user?.isAdmin;

      if (isAdminRoute && !isAdmin) {
        navigate("/");
      }
    }
  }, [user, navigate, location.pathname]);

  return user ? <Layout>{children}</Layout> : null;
}

export default ProtectedRoute;
