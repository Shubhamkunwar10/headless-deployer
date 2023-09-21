// api/proxy.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const backendUrl = 'http://34.100.170.218:8002';
  const { method, headers, body } = req;

  try {
    const response = await fetch(backendUrl, { method, headers, body });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while proxying the request.' });
  }
};
