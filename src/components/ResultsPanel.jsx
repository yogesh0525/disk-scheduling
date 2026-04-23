import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { HardDrive } from 'lucide-react';

const ResultsPanel = () => {
  const { results } = useSimulation();

  if (!results) {
    return (
      <div className="empty-state">
        <HardDrive size={64} />
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Ready to Simulate</h3>
          <p>Configure parameters and click "Run Simulation" to generate interactive algorithms data.</p>
        </div>
      </div>
    );
  }

  const algorithms = ['FCFS', 'SSTF', 'SCAN', 'CSCAN', 'LOOK', 'CLOOK'];

  return (
    <div className="dashboard">
      <h2 style={{ fontSize: '1.8rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <span className="gradient-text">Simulation Results</span>
      </h2>
      
      <div className="results-grid">
        {algorithms.map((algo) => (
          <div key={algo} className="algo-card glass-panel">
            <div className="algo-header">
              <h3>{algo}</h3>
              <div className="seek-time-badge">
                Seek Time: {results[algo].seekTime}
              </div>
            </div>
            
            <div style={{ marginTop: '0.5rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Head Movement Route:
              </p>
              <div className="sequence-box">
                {results[algo].sequence.join(' → ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPanel;
