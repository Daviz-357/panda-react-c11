import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import EditProfile from "./pages/EditProfile/EditProfile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Ruta por defecto */}
        <Route
          path="/"
          element={
            <Home isLoggedIn={isLoggedIn} onLoginSuccess={handleLoginSuccess} />
          }
        />

        {/* Rutas protegidas */}
        {isLoggedIn && (
          <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </>
        )}

        {/* Ruta de ejemplo para manejar el cierre de sesión */}
        {isLoggedIn && (
          <Route
            path="/logout"
            element={<Navigate to="/" />}
            onClick={handleLogout}
          />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;
