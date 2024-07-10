import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Discount.css";
import Nav from "../Nav/Nav";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BiUser } from "react-icons/bi";
import { BiCreditCard } from "react-icons/bi";
import DiscountDetail from "../DiscountDetail/DiscountDetail";
import BankFilter from "../BankFilter/BankFilter";
import LoginModal from "../LoginModal/LoginModal"; // Importa el componente del modal de login

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const fetchDiscounts = useCallback(async (pageNumber, bankId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/descuentos?pagina=${pageNumber}&tamano=10${
          bankId ? `&bancoId=${bankId}` : ""
        }`
      );
      const { content, totalPages } = response.data;

      setDiscounts((prevDiscounts) => {
        const existingIds = new Set(
          prevDiscounts.map((discount) => discount.id)
        );
        const newDiscounts = content.filter(
          (discount) => !existingIds.has(discount.id)
        );
        return [...prevDiscounts, ...newDiscounts];
      });

      setHasMore(pageNumber < totalPages - 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }, []);

  const fetchBancos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/bancos");
      setBancos(response.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  useEffect(() => {
    fetchBancos();
  }, []);

  useEffect(() => {
    setDiscounts([]);
    setPage(0);
    fetchDiscounts(0, selectedBank);
  }, [selectedBank, fetchDiscounts]);

  useEffect(() => {
    fetchDiscounts(page, selectedBank);
  }, [page, selectedBank, fetchDiscounts]);

  const loadMoreDiscounts = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10 &&
        !loading &&
        hasMore
      ) {
        loadMoreDiscounts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    const results = discounts.filter((discount) =>
      discount.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, discounts]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const filteredDiscounts = discounts.filter((discount) =>
    selectedCategory ? discount.categoria.includes(selectedCategory) : true
  );

  const displayedDiscounts = searchTerm ? searchResults : filteredDiscounts;

  const handleDiscountItemClick = (discount) => {
    setSelectedDiscount(discount);
  };

  const handleCloseDetail = () => {
    setSelectedDiscount(null);
  };

  return (
    <div className="discount-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar descuentos..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BiUser className="user-icon" onClick={() => setShowLoginModal(true)} />
      </div>

      <Nav />

      <BankFilter
        bancos={bancos}
        selectedBank={selectedBank}
        onBankChange={handleBankChange}
      />

      <div className="discount-list">
        {displayedDiscounts.map((discount) => (
          <div
            key={discount.id}
            className="discount-item"
            style={{
              backgroundImage: `url(${discount.portada_url})`,
            }}
            onClick={() => handleDiscountItemClick(discount)}
          >
            <div className="discount-logos">
              <LazyLoadImage
                src={discount.logo_url}
                alt="Logo"
                className="discount-logo"
                effect="blur"
              />
              <LazyLoadImage
                src={discount.banco.logo}
                alt="Banco Logo"
                className="bank-logo"
                effect="blur"
              />
            </div>
            <div className="discount-details">
              <h2>{discount.nombre}</h2>
              <p>
                <BiCreditCard /> {discount.opciones_pago}
              </p>
              <p>{discount.banco.nombre}</p>
            </div>
          </div>
        ))}
        {loading && <p>Cargando más descuentos...</p>}
        {!hasMore && <p>No hay más descuentos para mostrar.</p>}
      </div>

      {selectedDiscount && (
        <DiscountDetail
          discount={selectedDiscount}
          onClose={handleCloseDetail}
        />
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default Discount;
