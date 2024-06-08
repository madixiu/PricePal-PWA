export function formatTime(isoString) {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}


export function formatTimeFarsiDigit(isoString) {
  const date = new Date(isoString);
  const options = {
    hour12: false, // 24-hour format
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    numberingSystem: 'arab' // Use Arabic-Indic digits, which are the same as Persian digits
  };

  // Persian ("fa") locale
  return date.toLocaleString('fa-IR', options);
}