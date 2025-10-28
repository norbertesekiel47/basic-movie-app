# Movie App Mongo Server

Minimal Express + Mongoose API to replace Appwrite usage.

## Endpoints

- `GET /health` → `{ ok: true }`
- `POST /api/search-stats` → increment or create a record for a searched movie  
  Body:
  ```json
  {
    "searchTerm": "batman",
    "movie": { "id": 414906, "title": "The Batman", "poster_path": "/path.jpg" }
  }
  ```
- `GET /api/search-stats/trending?limit=5` → returns most-searched movies

## Setup

```bash
cd movie-app-mongo-server
cp .env.example .env   # edit MONGODB_URI
npm install
npm run dev
```
