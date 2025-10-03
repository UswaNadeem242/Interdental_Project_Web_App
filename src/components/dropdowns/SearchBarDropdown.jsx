import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBarDropdown = ({
  products,
  categoryId,
  searchQuery,
  setSearchDropdown,
}) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryId
      ? product.categoryId === categoryId
      : true;

    const matchesSearchQuery = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearchQuery;
  });

  const handleProductSelection = (productId) => {
    setSearchDropdown(false);
    navigate(`/product/${productId}`);
  };

  return (
    <div
      ref={dropdownRef}
      className="w-[533px] h-auto rounded-[8px] py-[8px] px-[16px] space-y-[8px] bg-white"
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <p
            key={product.id}
            onClick={() => handleProductSelection(product.id)}
            className="font-poppins font-normal text-[14px] leading-[21px] text-primaryText cursor-pointer"
          >
            {product.name}
          </p>
        ))
      ) : (
        <p className="font-poppins font-normal text-[14px] leading-[21px] text-primaryText">
          Nothing to see here! Try a different search or category.
        </p>
      )}
    </div>
  );
};

export default SearchBarDropdown;
