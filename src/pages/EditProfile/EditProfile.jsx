import React, { useState, useEffect } from "react";
import axios from "axios";
import './EditProfile.css';

const EditProfile = ({ handleLogout }) => {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

//   Almacena Los datos en Local Storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = {
      id: user.id,
      nombre,
      correo,
      contrasena: password || user.contrasena,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/usuarios/${user.id}`,
        updatedUser
      );

      if (response.status === 200) {
        setSuccessMessage("Perfil actualizado correctamente.");
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        throw new Error("Error al actualizar perfil.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("Error al actualizar perfil. Inténtalo de nuevo más tarde.");
    }
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="editar-perfil-container">
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Editar Perfil</h2>
        <div className="input-container">
          <label className="label">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            className="input-field"
            required
          />
        </div>

        <div className="input-container">
          <label className="label">Correo electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={handleCorreoChange}
            className="input-field"
            required
          />
        </div>

        <div className="input-container">
          <label className="label">Nueva Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-button">
          Actualizar Perfil
        </button>
      </form>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default EditProfile;
