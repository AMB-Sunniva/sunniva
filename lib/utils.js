export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const convertToSubcurrency = (amount, factor = 100) => {
  return Math.round(amount * factor);
};
export default convertToSubcurrency;
