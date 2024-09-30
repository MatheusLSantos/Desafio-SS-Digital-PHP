import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", user.email);
      // Redireciona para a página de boas-vindas
      navigate("/welcome", { state: { user } });
    } catch (error) {
      setError(error.response?.data.message || "Erro ao fazer login");
    }
  };

  const handleRegister = () => navigate("/register");

  return (
    <Container maxWidth="xs">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>Login</Typography>
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
          {error && <Alert severity="error">{error}</Alert>}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Entrar
          </Button>
        </form>
        <Button onClick={handleRegister} fullWidth style={{ marginTop: "16px" }}>
          Registrar
        </Button>
      </Box>
    </Container>
  );
};

export default Login;