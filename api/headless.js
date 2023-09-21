// api/proxy.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const backendUrl = 'http://34.100.170.218:8002'; // Your HTTP backend URL
  const { method, headers, body } = req;

  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );

  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch(backendUrl, { method, headers, body });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while proxying the request.' });
  }
};
