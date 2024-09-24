import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  // Assurez-vous que BrowserRouter est bien importé
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
/* 
import { data1 } from './data/candidats.js';
import { data2 } from './data/emploi.js';
import { data3 } from './data/employers.js';
import { data4 } from './data/locations.js';

const allData = [data1, data2, data3, data4];

async function sendData() {
  try {
    const response = await fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Data saved:', result);
  } catch (error) {
    console.error('Error sending data:', error);
  }
}

sendData();*/