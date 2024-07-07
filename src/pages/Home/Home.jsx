// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../../components/Logout/Logout";
import UserProfile from "../UserProfile/UserProfile";

const Home = ({ handleLogout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Componente para Cerrar Sesion */}
      <UserProfile />
      <Logout handleLogout={handleLogout} />
    </div>
  );
};

export default Home;
