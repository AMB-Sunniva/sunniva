import { useFirestore } from "@/app/context/FirestoreContext";

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

export const findMatchingPriceField = (
  prices,
  productName,
  lumber,
  attachedOrStandAlone
) => {
  const selectedOptionsString =
    productName === "Just Solar"
      ? productName
      : `${lumber} Lumber - ${attachedOrStandAlone}`;
  const priceList = prices.find((price) => price.id === productName);

  return priceList[selectedOptionsString] || null;
};
