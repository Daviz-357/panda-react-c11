import React from "react";
import PropTypes from "prop-types";
import "./BankFilter.css"; // Importa el archivo CSS

const BankFilter = ({ bancos = [], selectedBank, onBankChange }) => {
  return (
    <div className="bank-filter">
      <label htmlFor="bank-select">Selecciona un banco:</label>
      <select id="bank-select" value={selectedBank} onChange={onBankChange}>
        <option value="">Todos los bancos</option>
        {bancos.length > 0 ? (
          bancos.map((banco) => (
            <option key={banco.id} value={banco.id}>
              {banco.nombre}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No hay bancos disponibles
          </option>
        )}
      </select>
    </div>
  );
};

BankFilter.propTypes = {
  bancos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ),
  selectedBank: PropTypes.string.isRequired,
  onBankChange: PropTypes.func.isRequired,
};

export default BankFilter;
