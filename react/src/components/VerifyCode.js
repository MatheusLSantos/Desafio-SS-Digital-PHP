import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";

const VerifyCode = () => {
  const [activation_code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/activate`, { email, activation_code });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data.message || "Erro ao confirmar código");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>Confirme o Código</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Código"
            fullWidth
            margin="normal"
            value={activation_code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Verificar Código
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default VerifyCode;