import React, { useState } from "react";
import "./Nav.css"; // Estilos CSS para el menú de navegación
import logo from "../../assets/logo.png";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <img src={logo} alt="logo-Panda" className="logo" />
        <h3>Panda Descuentos</h3>
      </div>
      <div
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="icon"></div>
        <div className="icon"></div>
        <div className="icon"></div>

      </div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavItem title="Salud y Bienestar">
          <SubcategoryItem title="Centros Médicos Estéticos" />
          <SubcategoryItem title="Clínicas Dentales" />
          <SubcategoryItem title="Farmacias y Perfumería" />
          <SubcategoryItem title="Veterinarias" />
        </NavItem>

        <NavItem title="Sabores">
          <SubcategoryItem title="Restaurantes" />
          <SubcategoryItem title="Vinos y Licores" />
          <SubcategoryItem title="Gourmet y Delicatessen" />
          <SubcategoryItem title="Comida Saludable" />
        </NavItem>

        <NavItem title="Hogar y Tecnología">
          <SubcategoryItem title="Muebles y Decoración" />
          <SubcategoryItem title="Tecnología" />
          <SubcategoryItem title="Hogar Verde" />
        </NavItem>

        <NavItem title="Otros Servicios">
          <SubcategoryItem title="Automotriz" />
          <SubcategoryItem title="Centros Educativos" />
          <SubcategoryItem title="Soluciones para PYMES" />
        </NavItem>

        <NavItem title="Viajes y Panoramas">
          <SubcategoryItem title="Rent-a-car y Transfer" />
          <SubcategoryItem title="Entretención y Tiempo Libre" />
        </NavItem>
      </ul>
    </nav>
  );
};

const NavItem = ({ title, children }) => {
  return (
    <li className="nav-item">
      <a href="#">{title}</a>
      <ul className="submenu">{children}</ul>
    </li>
  );
};

const SubcategoryItem = ({ title }) => {
  return (
    <li className="subcategory-item">
      <a href="#">{title}</a>
    </li>
  );
};

export default Nav;
