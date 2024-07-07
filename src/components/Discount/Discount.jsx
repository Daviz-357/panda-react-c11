import { useState, useEffect } from 'react';
import Card from "../Cards/CardsDiscount"
import axios from 'axios';



const Discount = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/descuentos'); // Reemplaza 'URL_DEL_JSON' con la URL de tu API JSON
        setDiscounts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDiscounts();
  }, []);

  return (
    <div className="discount-list">
      {discounts.map(discount => (
        <div key={discount.id} className="discount-item">
        <Card discount={discount} />
        </div>
      ))}
    </div>
  );
};

export default Discount;
