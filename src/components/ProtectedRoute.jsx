import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? <Layout>{children}</Layout> : null;
}

export default ProtectedRoute;
