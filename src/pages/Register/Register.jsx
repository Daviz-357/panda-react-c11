// src/components/SignUp.js
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuarios/register",
        {
          nombre,
          correo,
          contrasena,
        }
      );

      if (response.status === 200) {
        // Verifica el código de estado HTTP
        const responseData = response.data;

        // Verifica si el usuario se registró correctamente
        if (responseData.id) {
          // O cualquier propiedad que confirme el éxito del registro
          setMessage("Sign up successful. Please log in.");
          setNombre(''); // Limpiar el campo de nombre
          setCorreo(''); // Limpiar el campo de correo
          setContrasena(''); // Limpiar el campo de contraseña
        } else {
          setMessage("Sign up failed. Please try again.");
        }
      } else {
        setMessage("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Name:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="correo">Email:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contrasena">Password:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/">Iniciar sesión aquí</Link></p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
