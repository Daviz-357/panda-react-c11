import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bank = () => {
  const [bancos, setBancos] = useState([]);

  useEffect(() => {
    const fetchBancos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bancos'); // Reemplaza 'URL_DEL_JSON' con la URL de tu JSON
        setBancos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBancos();
  }, []);

  return (
    <div className="bank-grid">
      {bancos.map(banco => (
        <div key={banco.idBanco} className="bank-item">
          <img src={banco.logo} alt={banco.nombre} />
          <p>{banco.nombre}</p>
        </div>
      ))}
    </div>
  );
};

export default Bank;
