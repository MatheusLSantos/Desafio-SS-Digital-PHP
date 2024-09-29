import React from "react";
import { useLocation } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const user = location.state?.user || {};

  return (
    <div>
      <h2>Bem-vindo(a), {user.email}</h2>
    </div>
  );
};

export default Welcome;
