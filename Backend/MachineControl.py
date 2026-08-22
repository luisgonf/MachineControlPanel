import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

valve = 0       # Closed
class ValveUpdate(BaseModel):
    valve: int

machine = 1500  # RPM
class MachineUpdate(BaseModel):
    machine: int

Weather_Map = "https://api.openweathermap.org/data/2.5/weather?"

with open("key.txt", "r") as file:
    Key = file.read().strip()

City = "Monterrey"

url = Weather_Map + "appid=" + Key + "&q=" + City

def kelvin_to_celsius(kelvin):
    return kelvin - 273.15

response = requests.get(url).json()
temp_celsius = kelvin_to_celsius(response['main']['temp'])


@app.get("/api")
def read_root():
    return temp_celsius

@app.get("/valve")
def read_valve():
    return valve

@app.get("/Machine")
def read_machine():
    return machine

@app.post("/ValveUpdate")
def write_valve(input: ValveUpdate):
    global valve
    if input.valve == 0  or input.valve == 1:
        valve = input.valve
    return {"valve": valve}

@app.post("/MachineUpdate")
def write_machine(input: MachineUpdate):
    global machine
    if 0 <= input.machine < 5000:
        machine = input.machine
    return {"Machine": machine}
