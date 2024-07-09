import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login"; // Importa tu componente Login
import Home from "./pages/Home/Home"; // Importa tu componente Dashboard
import UserProfile from "./pages/UserProfile/UserProfile";
import EditProfile from "./pages/EditProfile/EditProfile"; // Importa tu componente Register

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Ruta para el login */}
        <Route
          path="/"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />} // Redirige a '/' si no está autenticado
        />

        {/* <Route path="/register" element={<Register />} /> */}

        {/* <Route path="/profile" Component={UserProfile} />

        <Route path="/edit-profile" Component={EditProfile} /> */}
      </Routes>
    </HashRouter>
  );
};

export default App;
