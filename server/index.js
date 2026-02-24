import path from 'node:path';
import {fileURLToPath} from 'node:url';

import dotenv from 'dotenv';
import express from 'express';
import {GoogleGenAI} from '@google/genai';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '..', 'dist');
const port = Number(process.env.PORT || 8080);

app.use(express.json({limit: '1mb'}));

app.get('/api/health', (_req, res) => {
  res.json({ok: true});
});

app.post('/api/gemini', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({error: 'Server is missing GEMINI_API_KEY'});
    return;
  }

  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
  const model = typeof req.body?.model === 'string' ? req.body.model : 'gemini-2.0-flash';

  if (!prompt) {
    res.status(400).json({error: 'prompt is required'});
    return;
  }

  try {
    const ai = new GoogleGenAI({apiKey});
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    res.json({text: response.text ?? ''});
  } catch (error) {
    console.error('Gemini request failed:', error);
    res.status(502).json({error: 'Gemini request failed'});
  }
});

app.use(express.static(distPath));

app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
