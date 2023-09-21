// api/proxy.js
const fetch = require('node-fetch');
const { send, json } = require('micro');
const cors = require('micro-cors')();

module.exports = cors(async (req, res) => {
  const backendUrl = 'http://34.100.170.218:8002'; // Your HTTP backend URL
  const { method, headers, body } = req;

  try {
    const response = await fetch(backendUrl, { method, headers, body });
    const data = await response.json();
    send(res, response.status, data);
  } catch (error) {
    console.error(error);
    send(res, 500, { error: 'An error occurred while proxying the request.' });
  }
});
