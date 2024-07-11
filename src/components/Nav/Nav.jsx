import React, { useState } from "react";
import "./Nav.css";
import logo from "../../assets/logo1.png";
import { BiUser } from "react-icons/bi";

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
        <NavItem title="Salud y Bienestar" icon="💊">
          <SubcategoryItem title="Centros Médicos Estéticos" />
          <SubcategoryItem title="Clínicas Dentales" />
          <SubcategoryItem title="Farmacias y Perfumería" />
          <SubcategoryItem title="Veterinarias" />
        </NavItem>

        <NavItem title="Sabores" icon="🍴">
          <SubcategoryItem title="Restaurantes" />
          <SubcategoryItem title="Vinos y Licores" />
          <SubcategoryItem title="Gourmet y Delicatessen" />
          <SubcategoryItem title="Comida Saludable" />
        </NavItem>

        <NavItem title="Hogar y Tecnología" icon="🏠">
          <SubcategoryItem title="Muebles y Decoración" />
          <SubcategoryItem title="Tecnología" />
          <SubcategoryItem title="Hogar Verde" />
        </NavItem>

        <NavItem title="Otros Servicios" icon="⚙️">
          <SubcategoryItem title="Automotriz" />
          <SubcategoryItem title="Centros Educativos" />
          <SubcategoryItem title="Soluciones para PYMES" />
        </NavItem>

        <NavItem title="Viajes y Panoramas" icon="✈️">
          <SubcategoryItem title="Rent-a-car y Transfer" />
          <SubcategoryItem title="Entretención y Tiempo Libre" />
        </NavItem>
      </ul>
    </nav>
  );
};

// Componente para un elemento del menú
const NavItem = ({ title, icon, children }) => {
  return (
    <li className="nav-item">
      <button className="nav-button">
        <span className="nav-icon">{icon}</span>
        <span>{title}</span>
      </button>
      <ul className="submenu">{children}</ul>
    </li>
  );
};

// Componente para una subcategoría dentro de una categoría
const SubcategoryItem = ({ title }) => {
  return (
    <li className="subcategory-item">
      <a href="#">{title}</a>
    </li>
  );
};

export default Nav;
