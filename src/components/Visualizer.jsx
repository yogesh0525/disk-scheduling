import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Visualizer = () => {
  const { results } = useSimulation();
  const [activeAlgo, setActiveAlgo] = useState('FCFS');

  if (!results) return null;

  const algorithms = ['FCFS', 'SSTF', 'SCAN', 'CSCAN', 'LOOK', 'CLOOK'];
  const dataSequence = results[activeAlgo].sequence;

  const chartData = {
    labels: dataSequence.map((_, index) => `Step ${index}`),
    datasets: [
      {
        label: `${activeAlgo} Track Sequence`,
        data: dataSequence,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        pointBackgroundColor: '#38bdf8',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#38bdf8',
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
        tension: 0.1, // Slight curve or set 0 for straight lines
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: {
          family: "'Outfit', sans-serif",
          size: 14,
        },
        bodyFont: {
          family: "'JetBrains Mono', monospace",
          size: 14,
        },
        padding: 12,
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
        callbacks: {
          label: (context) => `Track: ${context.parsed.y}`,
        }
      },
    },
    scales: {
      y: {
        reverse: true, // Typically cylinder 0 is top or bottom, we show 0 at top or bottom? Let's keep 0 at bottom
        min: 0,
        max: results.max,
        title: {
          display: true,
          text: 'Cylinder Track Number',
          color: '#94a3b8',
          font: {
            family: "'Outfit', sans-serif",
            size: 14,
            weight: '600'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: "'JetBrains Mono', monospace",
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Service Order',
          color: '#94a3b8',
          font: {
            family: "'Outfit', sans-serif",
            size: 14,
            weight: '600'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: "'Outfit', sans-serif",
          }
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="glass-panel chart-container">
      <div className="chart-header-controls">
        <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Algorithm Visualizer</h3>
        <div className="algo-selector">
          {algorithms.map(algo => (
            <button
              key={algo}
              className={`algo-pill ${activeAlgo === algo ? 'active' : ''}`}
              onClick={() => setActiveAlgo(algo)}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ position: 'relative', height: '450px', width: '100%' }}>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default Visualizer;
