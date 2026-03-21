# Solar System Explorer

A real-time 3D interactive solar system built with Three.js, React, and FastAPI.
Tracks planets, deep space probes (Voyager 1 & 2, New Horizons), and man-made
objects (Tesla Roadster) using real positional data from NASA's Horizons API.

## Features

- Real-time and historical positions of all 8 planets
- Man-made objects: Voyager 1/2, Tesla Roadster, New Horizons, Parker Solar Probe
- Time travel scrubber — animate the solar system from 1970 to 2050
- Click any object for mission info, distance from Earth, and velocity
- Fully containerized with Docker

## Tech Stack

| Layer | Technology |
|---|---|
| 3D Engine | Three.js + React Three Fiber |
| Frontend | React + Vite |
| Backend | FastAPI (Python) |
| Data | NASA Horizons API, JPL SBDB |
| Database | Supabase (Postgres) |
| Hosting | Vercel (frontend) + Railway (backend) |

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- Docker (optional)

### Run locally

# Clone the repo
git clone https://github.com/your-username/solar-system-explorer.git
cd solar-system-explorer

# Frontend
cd frontend
npm install
npm run dev

# Backend (new terminal)
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

## Environment Variables

Copy `.env.example` to `.env` and fill in your values.

## Project Structure

solar-system-explorer/
├── frontend/        # React + Vite + Three.js
├── backend/         # FastAPI
├── docker-compose.yml
└── .env.example
