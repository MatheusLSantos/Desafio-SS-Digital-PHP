import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      // Sucesso no login
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      // Redireciona para a página de boas-vindas
      navigate("/welcome", { state: { user } });
    } catch (error) {
      setError(error.response?.data.message || "Erro ao fazer login");
    }
  };

  const handleRegister = () => {
    // Navega para a tela de registro
    navigate("/register");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Login;
