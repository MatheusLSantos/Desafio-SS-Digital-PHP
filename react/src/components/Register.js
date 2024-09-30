import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/register`, {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessage(response.data.message);
      // Passar o email para a próxima tela
      navigate("/verify-code", { state: { email } });
    } catch (error) {
      setError(error.response?.data.message || "Erro ao registrar");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>Registro</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirmar Senha"
            type="password"
            fullWidth
            margin="normal"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Registrar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;