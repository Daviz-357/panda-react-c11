import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginModal.css"; // Asegúrate de tener estilos para el modal
import logoImage from "../../assets/logo1.png";

const LoginModal = ({ onClose }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false); // Estado para mostrar la alerta de registro exitoso

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn === "true") {
          const savedUser = JSON.parse(localStorage.getItem("user"));
          if (savedUser) {
            setUser(savedUser);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    checkLoggedIn();
  }, []);

  const toggleLogin = () => {
    setIsRegistering(!isRegistering);
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleLoginOrRegister = async (event) => {
    event.preventDefault();

    const credentials = {
      nombre: nombre,
      correo: email,
      contrasena: password,
    };

    try {
      let response;
      if (isRegistering) {
        response = await axios.post(
          "http://localhost:8080/auth/register",
          credentials
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/auth/login",
          credentials
        );
      }

      if (response.status === 200 || response.status === 201) {
        setError(null);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);

        if (isRegistering) {
          setNombre(response.data.nombre); // Guardar el nombre en el estado
          setShowWelcomeAlert(true); // Mostrar la alerta de registro exitoso
        } else {
          alert(`¡Bienvenid@, ${response.data.nombre}!`);
        }

        onClose(); // Cerrar el modal después de un inicio de sesión exitoso
      } else {
        throw new Error("Error al iniciar sesión o registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(
        `Error al ${
          isRegistering ? "registrar usuario" : "iniciar sesión"
        }. Verifica tus credenciales.`
      );
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <img
          src={logoImage}
          alt="Logo de Panda Descuentos"
          className="logo-image"
        />
        <button onClick={onClose} className="close-button">
          X
        </button>{" "}
        <br />
        <br />
        <br />
        <h2>{isRegistering ? "Registrate" : "Inicia sesión"}</h2>
        <form onSubmit={handleLoginOrRegister} className="form-container">
          {error && <div className="error-message">{error}</div>}

          {isRegistering && (
            <div className="input-container">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                className="input-field"
                required
              />
            </div>
          )}

          <div className="input-container">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="input-field"
              required
            />
          </div>

          <div className="input-container">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {isRegistering ? "Continuar" : "Continuar"}
          </button>

          <div className="toggle-container">
            <span>
              {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}{" "}
            </span>
            <button
              type="button"
              onClick={toggleLogin}
              className="toggle-button"
            >
              {isRegistering ? "Iniciar sesión" : "Regístrate"}
            </button>
          </div>
        </form>
      </div>
      {showWelcomeAlert && (
        <div className="welcome-alert">
          <p>Registro exitoso para {nombre}.</p>
          <button onClick={() => setShowWelcomeAlert(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
