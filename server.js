import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Generate image endpoint (mocked)
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

  try {
    // Mock image URL based on prompt using Unsplash random image API
    const imageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(prompt)}`;

    res.json({ image: imageUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image generation failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
