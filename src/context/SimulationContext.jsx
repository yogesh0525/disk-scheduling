import React, { createContext, useState, useContext } from 'react';
import { simulateAlgorithms } from '../utils/algorithms';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
  const [inputs, setInputs] = useState({
    queueSize: 8,
    requests: '98, 183, 37, 122, 14, 124, 65, 67',
    initialHead: 53,
    maxTrack: 199,
    direction: 'Towards max'
  });

  const [results, setResults] = useState(null);

  const runSimulation = () => {
    try {
      const parsedRequests = inputs.requests
        .split(',')
        .map(n => parseInt(n.trim(), 10))
        .filter(n => !isNaN(n));
      const head = parseInt(inputs.initialHead, 10);
      const max = parseInt(inputs.maxTrack, 10);
      
      if (isNaN(head) || isNaN(max) || parsedRequests.length === 0) {
        alert("Please ensure valid inputs.");
        return;
      }

      const simResults = simulateAlgorithms(parsedRequests, head, max, inputs.direction);
      setResults({ ...simResults, originalRequests: parsedRequests, head, max });
    } catch (error) {
      console.error(error);
      alert("Error parsing inputs.");
    }
  };

  return (
    <SimulationContext.Provider value={{ inputs, setInputs, runSimulation, results }}>
      {children}
    </SimulationContext.Provider>
  );
};
