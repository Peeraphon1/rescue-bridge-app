
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // Redirect to role selection page
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);
  
  return null;
};

export default Index;
