import React from "react";
import { Link } from "react-router-dom";
import EditProfile from "../EditProfile/EditProfile";
import Bank from "../../components/Bank/Bank";
import Discount from "../../components/Discount/Discount";

const UserProfile = ({ user, handleLogout }) => {
  const { id, nombre, correo } = user;

  return (
    <Main>
      <h2>UserProfile</h2>
      <p>Bienvenido, {user.nombre}!</p>
      <p>Correo electrónico: {user.correo}</p>
      {/* Otros detalles del usuario */}
      <Link to="/edit-profile">
        <button>Editar perfil</button>
      </Link>
      {/* <EditProfile user={user} handleLogout={handleLogout} /> */}
      <button onClick={handleLogout}>Cerrar sesión</button>
      <h2>Lista de Bancos</h2>
      <Bank />
      <h3>Lista de Descuentos </h3>
      <Discount />
    </Main>
  );
};

export default UserProfile;
