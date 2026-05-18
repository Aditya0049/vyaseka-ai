// Simple plain Express server — no external keys needed to start
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'vyaseka-api', time: new Date().toISOString() });
});

// Mock transcription endpoint (swap for real Whisper call when you have an OpenAI key)
app.post('/api/transcribe', (req, res) => {
  const { filename } = req.body as { filename?: string };

  const MOCK_LINES = [
    "[00:00:00] Welcome. Today we'll be walking through the quarterly roadmap and key product initiatives.",
    "[00:00:08] Our focus areas remain: user growth, international expansion, and AI-powered features.",
    "[00:00:17] Transcription accuracy is currently at 97.3% across twelve supported languages.",
    "[00:00:25] We expect to onboard our first enterprise client by end of Q3.",
    "[00:00:33] The engineering team has completed the Whisper integration and is moving to speaker detection.",
    "[00:00:41] Marketing will launch the creator campaign next Tuesday across Instagram and LinkedIn.",
  ];

  res.json({
    text: MOCK_LINES.join('\n'),
    duration: 187,
    language: 'English (India)',
    freeMinutesLeft: 4,
    timestamps: MOCK_LINES.map((line, i) => ({
      start: i * 8, end: (i + 1) * 8,
      text: line.replace(/\[\d{2}:\d{2}:\d{2}\] /, ''),
    })),
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🦾  Vyaseka API running at http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
