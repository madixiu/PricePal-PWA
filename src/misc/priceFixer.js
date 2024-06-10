export function formatPrice(price) {
  return price.toLocaleString(undefined, {
    // minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function FarsiDigitPrice(price) {
  return price.toLocaleString('fa-IR')
}

export function ChangeColor(change) {
  if (change === 'positive') {
    return 'HomePage.changeUp';
  }
  else if (change === 'negative') {
    return 'red';
  }
  else {
    return 'black';
  }
}