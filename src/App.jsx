import React from 'react';
import { SimulationProvider } from './context/SimulationContext';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import Visualizer from './components/Visualizer';

function App() {
  return (
    <SimulationProvider>
      <div className="container">
        <header>
          <h1 className="gradient-text">NovaDisk</h1>
          <p>Advanced Disk Scheduling Algorithm Simulator</p>
        </header>
        
        <main className="main-grid">
          <aside>
            <InputPanel />
          </aside>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <ResultsPanel />
            <Visualizer />
          </section>
        </main>
      </div>
    </SimulationProvider>
  );
}

export default App;
