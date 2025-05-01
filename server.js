import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Generate image endpoint
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

  try {
    const response = await axios.post('http://127.0.0.1:7860/sdapi/v1/txt2img', {
      prompt: prompt,
      steps: 25
    });

    const imageBase64 = response.data.images[0];
    res.json({ image: `data:image/png;base64,${imageBase64}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image generation failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
