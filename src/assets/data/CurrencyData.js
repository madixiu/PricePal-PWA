
const fs = require('fs');

const url = 'https://admin.alanchand.com/api/arz';
const payload = { lang: "en" };

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile('data.json', jsonData, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Successfully wrote file: data.json');
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
