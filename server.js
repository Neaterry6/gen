const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    // Replace RAPHAEL_ENDPOINT with actual endpoint later
    const response = await axios.post('https://raphael.app/api/generate', {
      prompt: prompt
    });

    res.json({ image: response.data.image_url });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log('API running on port 3000')
);
