# Riya Portfolio

This project is a Vite + React frontend with an Express server for production hosting and secure Gemini API access.

## Why this setup

- Frontend is static and built to `dist/`.
- Backend serves `dist/` and exposes `/api/gemini`.
- `GEMINI_API_KEY` stays server-side only.

## Local development

Prerequisites:
- Node.js 20+

Steps:
1. Install dependencies:
   `npm install`
2. Copy env template and set your key:
   `copy .env.example .env.local`
3. Frontend dev server:
   `npm run dev`
4. Optional backend run (for `/api/gemini` testing):
   `npm run dev:server`

Frontend runs on `http://localhost:3000`.
Backend runs on `http://localhost:8080` (or `PORT`).

## Production run

1. Build frontend:
   `npm run build`
2. Start server:
   `npm start`

## API endpoint

- `POST /api/gemini`
- JSON body:
  `{ "prompt": "Your prompt here", "model": "gemini-2.0-flash" }`
- Response:
  `{ "text": "..." }`

## Deploy to the internet (single service)

Use a Node host like Render, Railway, or Fly.io.

Service settings:
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variables:
  - `GEMINI_API_KEY=...`
  - `PORT` (usually injected by host)

This serves the website and backend API from one public URL.

### Render blueprint

This repo includes `render.yaml`, so on Render you can use "New + -> Blueprint" and deploy directly.
Set `GEMINI_API_KEY` in the Render dashboard after the service is created.
