export const currencyFormat = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(value);
};

export const calculateTotalToPay = (quantity, months) => {
  let total;

  // Mientras mayor es la cantidad, menor es el interes
  if (quantity < 5000) {
    total = quantity * 1.5;
  } else if (quantity >= 5000 && quantity < 10000) {
    total = quantity * 1.4;
  } else if (quantity >= 10000 && quantity < 15000) {
    total = quantity * 1.3;
  } else {
    total = quantity * 1.2;
  }

  // Mayor plazo: Mayor interes
  if (months === 6) {
    total *= 1.1;
  } else if (months === 12) {
    total *= 1.2;
  } else {
    total *= 1.3;
  }

  return total;
};
