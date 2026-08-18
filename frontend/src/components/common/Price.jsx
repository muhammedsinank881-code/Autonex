import React from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency.js";

const Price = ({ amount = 0, className = "" }) => {
  const selectedCurrency = useSelector((state) => state.currency.currency);

  return (
    <span className={className}>
      {formatCurrency(amount, selectedCurrency)}
    </span>
  );
};

export default Price;  
