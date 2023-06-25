import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <Box minHeight="100vh" style={{ marginTop: "100px", textAlign: "center" }}>
      <Typography
        variant="h5"
        color="primary"
        fontFamily="Poppins"
        fontWeight="medium"
        textAlign="center"
      >
        {`Redirecting you in ${count} seconds`}
      </Typography>
    </Box>
  );
};

export default LoadingToRedirect;
