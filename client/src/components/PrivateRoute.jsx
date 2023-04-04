import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userProfile = localStorage.getItem("profile");
    setUser(userProfile);
  }, []);

  return user ? console.log(user): <Navigate to="/login" />;
};

export default PrivateRoute;
