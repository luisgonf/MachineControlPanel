# Machine Control Panel

Full-stack monitoring panel with:
- Valve control 
- Machine control
- Temperature monitoring

The backend is built with Python using FastAPI. Temperature is obtained with OpenWeatherMap, which requires an API key. (https://openweathermap.org/) The frontend is created with React using Vite, in it the temperature is updated every 5 seconds and you can control the Valve and Machine.

## Prerequisites

- Python 3.11+
- uv
- Node.js / npm
- OpenWeatherMap API key

## Setup

1. Create a key.txt file and insert the API key. Use key.example.txt as a template

## Starting the Backend

2. From the project root, in the terminal run: 

```bash
uv sync
uv run fastapi dev ./Backend/MachineControl.py --port 8001
```

The backend will run on: http://127.0.0.1:8001

## Starting the Frontend

3. On a new terminal: 

```bash
cd Frontend
npm install
npm run dev
```

The front end will run on: http://localhost:5173

## Valve Control:

The valve only accepts 1 (Open) or 0 (Closed)

## Machine Control:

The machine only accepts a maximum of 4999 RPM

