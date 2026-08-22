# Machine Control Panel

Full-stack monitoring panel with:
- Valve control 
- Machine control
- Temperature monitoring

The backend is built with Python using FastAPI. Temperature is obtained with OpenWeatherMap, which requires an API key. (https://openweathermap.org/) The frontend is created with React using Vite, in it the temperature is updated every 5 seconds and you can control the Valve and Machine.

## Setup

1. Create a key.txt file and insert the API key. Use key.example.txt as a template

## Starting the Backend

2. On the terminal run: uv run fastapi dev ./Backend/MachineControl.py

The backend will run on: http://127.0.0.1:8001

## Starting the Frontend

3. On a new terminal: 

cd Frontend
npm run dev

The front end will run on: http://localhost:5173

## Valve Control:

The valve only accepts 1 (Open) or 0 (Closed)

## Machine Control:

The machine only accepts a maximum of 5000 RPM

