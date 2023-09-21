import { json } from 'micro'; // Import the micro framework for serverless functions
import { send } from 'micro'; // Import the micro framework for serverless functions
import { createError } from 'micro'; // Import the micro framework for serverless functions
import fetch from 'node-fetch';

const cors = require('micro-cors')(); // Enable CORS using micro-cors middleware

const handler = async (req, res) => {
  const { method, headers } = req;
  const backendUrl = 'http://34.100.170.218:8002'; // Your HTTP backend URL

  if (req.url === '/') {
    // Handle root URL
    send(res, 200, 'Hey, this is my API running 🥳');
  } else if (req.url === '/proxy') {
    // Handle proxy route to your HTTP backend
    try {
      const body = await json(req);
      const response = await fetch(backendUrl, { method, headers, body });
      const data = await response.json();
      send(res, response.status, data);
    } catch (error) {
      console.error(error);
      send(res, 500, { error: 'An error occurred while proxying the request.' });
    }
  } else {
    // Handle other routes or 404
    send(res, 404, 'Not Found');
  }
};

module.exports = cors(handler);
