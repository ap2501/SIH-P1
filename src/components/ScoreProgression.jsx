import React from 'react';
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
  Filler,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ScoreProgression = ({ cameras }) => {
  // Create a map to organize scores and timestamps for each camera
  const camerasMap = {};

  cameras.forEach(camera => {
    if (!camerasMap[camera.camID]) {
      camerasMap[camera.camID] = {
        camID: camera.camID,
        scores: [],
        timestamps: [],
      };
    }
    camerasMap[camera.camID].scores.push(camera.score);
    camerasMap[camera.camID].timestamps.push(camera.timestamp);
  });

  // Extract labels (timestamps) from the first camera in the map
  const labels = Object.values(camerasMap)[0]?.timestamps.map(ts => new Date(ts).toLocaleString());

  // Prepare datasets for each camera
  const datasets = Object.values(camerasMap).map(camera => ({
    label: camera.camID,
    data: camera.scores,
    fill: true,
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`,
    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
    borderWidth: 2,
    tension: 0.4,
  }));

  const data = {
    labels, // Timestamps
    datasets, // Data for each camera
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Score Progression per Camera',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ScoreProgression;
