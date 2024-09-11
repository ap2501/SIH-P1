import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ cameras }) => {
  // Extracting camera IDs and scores for the graph
  const labels = cameras.map(camera => camera.camID); // X-axis labels (Camera IDs)
  const scores = cameras.map(camera => camera.score); // Y-axis data (Camera scores)

  const data = {
    labels, // Camera IDs as labels
    datasets: [
      {
        label: 'Camera Scores Comparison', // Legend label
        data: scores, // Data for the bars (Camera scores)
        backgroundColor: scores.map(score =>
          score < 40 ? 'rgba(255, 99, 132, 0.8)' : score < 80 ? 'rgba(255, 206, 86, 0.8)' : 'rgba(75, 192, 192, 0.8)'
        ),
        borderColor: scores.map(score =>
          score < 40 ? 'rgba(255, 99, 132, 1)' : score < 80 ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 2,
        borderRadius: 10, // Rounded bars
        barThickness: 40, // Adjust bar thickness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable the default aspect ratio
    aspectRatio: 0.5, // Adjust this value to make the graph taller
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Comparison of Camera Scores',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#333',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Y-axis score limit
        ticks: {
          stepSize: 20,
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '500px' }}> {/* Manually control the height */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
