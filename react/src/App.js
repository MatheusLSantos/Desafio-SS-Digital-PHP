import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import VerifyCode from "./components/VerifyCode";

const App = () => {
  // Verifica se o usuário está autenticado
  const isAuthenticated = !!localStorage.getItem("token") && !!localStorage.getItem("email");

  return (
    <Router>
      <Routes>
        {/* Redireciona baseado na autenticação */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/welcome" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default App;
