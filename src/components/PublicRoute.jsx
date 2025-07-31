import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) return null;

  return children;
}

export default PublicRoute;
