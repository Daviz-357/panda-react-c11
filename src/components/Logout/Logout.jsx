import React from "react";

const Logout = ({ handleLogout }) => {
  return (
    <div>
      <h2>¿Seguro que quieres cerrar sesión?</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Logout;
