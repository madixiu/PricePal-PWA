export function formatTime(isoString) {
  const date = new Date(isoString.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  // const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}


export function formatTimeFarsiDigit(isoString) {
  const date = new Date(isoString.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

  const options = {
    hour12: false, // 24-hour format
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    numberingSystem: 'arabext' // Use Arabic-Indic digits, which are the same as Persian digits
  };
  // console.log(date);
  // Persian ("fa") locale
  return date.toLocaleString('fa-IR', options);
}
export const sortDataArray = (dataArray) => {
  const sortOrder = {"try": 0, "usd": 1,"eur": 2,"gbp": 3, "cad": 4,"aud": 5,"chf":6};
  
  return dataArray.sort((a, b) => {
    // Sort based on the `slug` property
    const slugA = a.slug;
    const slugB = b.slug;

    // Compare slugA and slugB based on their order in the sortOrder object
    if (sortOrder[slugA] < sortOrder[slugB]) {
      return -1;
    } else if (sortOrder[slugA] > sortOrder[slugB]) {
      return 1;
    } else {
      return 0;
    }
  });
};