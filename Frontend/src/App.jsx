import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [temperature, setTemperature] = useState(null)
  const [valve, setValve] = useState('')
  const [valve_read, setValve_read] = useState('')
  const [machine, setMachine] = useState('')
  const [machineRead, setMachineRead] = useState('')

  const handleValveChange = (event) => {
    setValve(event.target.value);
  };

  const handleMachineChange = (event) => {
    setMachine(event.target.value);
  };

  async function getValve() {
    const response = await fetch("http://127.0.0.1:8001/valve")
    const valve_read = await response.json()
    setValve_read(valve_read)
  }
  
  useEffect(() => {
    getValve()
  }, [])

  const handleValveSubmit = async () => {

    const valveValue = Number(valve);

    await fetch("http://127.0.0.1:8001/ValveUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        valve: valveValue
      })
    })
    await getValve()
  }

  async function getMachine() {
    const response = await fetch("http://127.0.0.1:8001/Machine")
    const machineRead = await response.json()
    setMachineRead(machineRead)
  }
  
  useEffect(() => {
    getMachine()
  }, [])

  const handleMachineSubmit = async () => {

    const MachineValue = Number(machine);

    await fetch("http://127.0.0.1:8001/MachineUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        machine: MachineValue
      })
    })
    await getMachine()
  }

  useEffect(() => {
    async function getTemperature() {
      const response = await fetch("http://127.0.0.1:8001/api")
      const temperature = await response.json()
      setTemperature(temperature)
    }
  
    getTemperature()

    const interval = setInterval(getTemperature, 5000)

    return () => clearInterval(interval)
    
  }, [])

  return (
    <>
      <section id="center">
        <div>
          <h1>Control Panel</h1>
          <p>
            Current temperature is: {temperature !== null && temperature.toFixed(2)} °C
          </p>
        </div>
      </section>
      <div className="ticks"></div>
      <section id="next-steps">
        <div id="docs">
          <h2>Valve Control</h2>
              <p>  
              Current valve status is: {valve_read} {valve_read === 0 ? "(Closed)" : "(Open)"}
              </p>
              <p><strong>Input Preview:</strong> {valve}</p> 
              <input
              className='control-input' 
              type="text" 
              value={valve} 
              onChange={handleValveChange} 
              placeholder="Type valve value..." 
              />
              <button
              className='control-button' 
              onClick={handleValveSubmit}>
              Update Valve
              </button>
        </div>
        <div id="social">
          <h2>Machine Control</h2>
              <p>
              Current Machine speed is: {machineRead} RPM
              </p>
              <p><strong>Input Preview:</strong> {machine}</p> 
              <input
              className='control-input' 
              type="text" 
              value={machine} 
              onChange={handleMachineChange} 
              placeholder="Type desired machine state hereÑ" 
              />
              <button
              className='control-button' 
              onClick={handleMachineSubmit}
              >
              Update Machine Speed
              </button>
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
