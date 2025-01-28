function formatPrice(amount, currencySymbol = "€") {
  return (
    Number(amount).toFixed(2).toString().replace(".", ",") +
    " " +
    currencySymbol
  );
}

export default formatPrice;
