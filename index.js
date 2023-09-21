import express from 'express';
import cors from 'cors'; // Import the cors middleware
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8005;

app.use(express.json());

// Enable CORS for all routes using cors middleware
app.use(cors());

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hey, this is my API running 🥳');
});

// Proxy route to your HTTP backend
app.all('/proxy', async (req, res) => {
  const backendUrl = 'http://34.100.170.218:8002'; // Your HTTP backend URL
  const { method, headers, body } = req;

  try {
    const response = await fetch(backendUrl, { method, headers, body });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while proxying the request.' });
  }
});

export default app;
