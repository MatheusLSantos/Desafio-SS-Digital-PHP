import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || {};

  const handleLogout = () => {
    // Remova o token do localStorage ou qualquer outro estado que você use para autenticação
    localStorage.removeItem("token");
    
    // Redirecione para a tela de login
    navigate("/login");
  };

  return (
    <div>
      <h2>Bem-vindo(a), {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
