import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Settings2, Play } from 'lucide-react';

const InputPanel = () => {
  const { inputs, setInputs, runSimulation } = useSimulation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="input-section glass-panel">
      <h2>
        <Settings2 size={24} className="text-accent" />
        <span className="gradient-text">Configuration</span>
      </h2>

      <div className="input-group">
        <label>Disk Requests (Comma Separated)</label>
        <input 
          type="text" 
          name="requests" 
          value={inputs.requests} 
          onChange={handleChange} 
          placeholder="e.g. 98, 183, 37, 122, 14..."
        />
      </div>

      <div className="input-group">
        <label>Initial Head Position</label>
        <input 
          type="number" 
          name="initialHead" 
          value={inputs.initialHead} 
          onChange={handleChange} 
          placeholder="e.g. 53"
        />
      </div>

      <div className="input-group">
        <label>Maximum Track Size (Total Cylinders - 1)</label>
        <input 
          type="number" 
          name="maxTrack" 
          value={inputs.maxTrack} 
          onChange={handleChange} 
          placeholder="e.g. 199"
        />
      </div>

      <div className="input-group">
        <label>Direction (SCAN/LOOK variants)</label>
        <select name="direction" value={inputs.direction} onChange={handleChange}>
          <option value="Towards max">Towards Max (Right)</option>
          <option value="Towards 0">Towards 0 (Left)</option>
        </select>
      </div>

      <button className="btn-primary" onClick={runSimulation}>
        <Play size={20} />
        Run Simulation
      </button>
    </div>
  );
};

export default InputPanel;
