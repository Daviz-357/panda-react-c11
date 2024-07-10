import React, { useRef } from "react";
import { Paper, ClickAwayListener } from "@mui/material";
import "./DiscountDetail.css"; // Estilo específico para el detalle

const DiscountDetail = ({ discount, onClose }) => {
  const paperRef = useRef(null);

  const handleClickAway = (event) => {
    if (paperRef.current && !paperRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleGoToDiscount = () => {
    // Verificar que discount y discount.banco estén definidos
    if (!discount || !discount.banco) {
      console.error("Datos de descuento incompletos:", discount);
      return;
    }

    const { id } = discount.banco;
    const { slug } = discount;

    let url = "";

    switch (id) {
      case 1:
        url = `https://www.bci.cl/beneficios/beneficios/${slug}`;
        break;
      case 2:
        url = `https://banco.bice.cl/personas/beneficios/${slug}`;
        break;
      case 3:
        url = `https://banco.santander.cl/beneficios/promociones/${slug}`;
        break;
      case 4:
        url = `https://www.tapp.cl/beneficios/tarjeta-tapp/${slug}`;
        break;
      default:
        console.error(`URL no definida para el banco con idBanco ${idBanco}`);
        break;
    }

    if (url) {
      window.open(url, "_blank"); // Abre en una nueva pestaña
      onClose(); // Cierra el detalle del descuento después de redirigir
    } else {
      console.error(`URL no definida para el banco con idBanco ${idBanco}`);
      // Manejar caso donde el idBanco no tiene URL definida
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper ref={paperRef} className="mui-paper">
        <div className="detail-container">
          <div className="detail-content">
            <h2>{discount.nombre}</h2>
            <div className="detail-logo">
              <img src={discount.logo_url} alt="Logo" />
            </div>
            <p>{discount.descripcion}</p>
            <div className="detail-payment">
              <h3>Opciones de Pago</h3>
              <p>{discount.opciones_pago}</p>
            </div>
            <div className="detail-bank">
              <h3>Banco: {discount.banco.nombre}</h3>
              <img src={discount.banco.logo} alt="Banco Logo" />
            </div>
            <div className="detail-vigencia">
              <p>{discount.vigencia}</p>
            </div>
          </div>
          <div className="detail-actions">
            <button className="go-to-discount" onClick={handleGoToDiscount}>
              Ir a Descuento
            </button>
            <button className="close-button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </Paper>
    </ClickAwayListener>
  );
};

export default DiscountDetail;
