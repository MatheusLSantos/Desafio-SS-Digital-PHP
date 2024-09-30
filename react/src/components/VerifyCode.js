import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [activation_code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state; // Pegando o email da tela anterior

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/activate`, { email, activation_code }); // Enviando email e código
      setMessage(response.data.message);

      // Redirecionar para a tela de login após sucesso
      navigate("/login");
    } catch (error) {
      setError(error.response?.data.message || "Erro ao confirmar código");
    }
  };

  return (
    <div>
      <h2>Confirme o Código</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Código</label>
          <input
            type="text"
            value={activation_code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <button type="submit">Verificar Código</button>
      </form>
    </div>
  );
};

export default VerifyCode;
