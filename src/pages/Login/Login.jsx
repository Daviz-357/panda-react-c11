import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../Home/Home";
import UserProfile from "../UserProfile/UserProfile";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

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
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleLoginOrRegister = async (event) => {
    event.preventDefault();

    const credentials = {
      correo: email,
      contrasena: password,
    };

    try {
      let response;
      if (isRegistering) {
        response = await axios.post(
          "http://localhost:8080/api/usuarios/register",
          credentials
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/api/usuarios/login",
          credentials
        );
      }

      if (response.status === 200 || response.status === 201) {
        setError(null);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
      } else {
        throw new Error("Error al iniciar sesión o registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(`Error al ${isRegistering ? 'registrar usuario' : 'iniciar sesión'}. Verifica tus credenciales.`);
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      {isLoggedIn ? (
        <UserProfile user={user} handleLogout={handleLogout} />
      ) : (
        <form onSubmit={handleLoginOrRegister} className="form-container">
          {error && <div className="error-message">{error}</div>}

          <h2 className="form-title">{isRegistering ? 'Registro' : 'Login'}</h2>
          <div className="input-container">
            <label className="label">Correo electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="input-field"
              required
            />
          </div>

          <div className="input-container">
            <label className="label">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {isRegistering ? 'Registrate' : 'Iniciar sesión'}
          </button>

          <div className="toggle-container">
            <span>{isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta?'} </span>
            <button type="button" onClick={toggleLogin} className="toggle-button">
              {isRegistering ? 'Iniciar sesión' : 'Registrate'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
