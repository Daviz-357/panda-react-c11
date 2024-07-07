import React from "react";
import "./styles.css";


function CardsDiscount({ discount }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-template">
          <div className="card-template-template">
            <img
              src={discount.portada_url}
              alt={discount.nombre}
              className="discount-image"
            />
          </div>
          <div className="card-template-logo">
            <img
              src={discount.banco.logo}
              alt={discount.banco.nombre}
              className="bank-logo"
            />
            <img
              src={discount.logo_url}
              alt={discount.logo_url}
              className="bank-logo_url"
            />
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="discount-details">
          <h3>{discount.nombre}</h3>
          <p>
            {/* <span>IMAGE-CARD</span> */}
            <span>{discount.opciones_pago}</span>
          </p>
          <div className="bank-details">
            <p>Banco: {discount.banco.nombre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsDiscount;
