const axios = require('axios');


const getIP = async () => {
  try {
    const response = await axios.get('http://www.geoplugin.net/json.gp');
    console.log('Ihre IP-Adresse ist:', response.data.geoplugin_request);
  } catch (error) {
    console.error('Fehler beim Abrufen der IP-Adresse:', error);
  }
};

getIP()