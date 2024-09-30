import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box } from "@mui/material";

const Welcome = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    
    // Redirecione para a tela de login
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Bem-vindo(a), {email}</Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary" style={{ marginTop: "20px" }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Welcome;