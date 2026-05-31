import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import handler from './api/generate.js';

const app = express();
app.use(express.json()); // parse JSON bodies

// Route the Gemini proxy
app.post('/api/generate', handler);


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🚀 Express server listening on http://localhost:${PORT}`);
});
