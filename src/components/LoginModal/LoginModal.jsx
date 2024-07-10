// LoginModal.js
import React from "react";
import "./LoginModal.css"; // Asegúrate de tener estilos para el modal

const LoginModal = ({ onClose }) => {
  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <form>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Contraseña:
            <input type="password" name="password" required />
          </label>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
