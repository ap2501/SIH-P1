import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ cameras }) => {
  // Extracting camera IDs and scores for the chart
  const labels = cameras.map(camera => camera.camID);
  const scores = cameras.map(camera => camera.score);

  const data = {
    labels, // Camera IDs as labels
    datasets: [
      {
        label: 'Contribution of Each Camera to Cleanliness Score',
        data: scores, // Data for the pie chart (Camera scores)
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ], // Different colors for each slice
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ], // Border colors for 3D-like effect
        borderWidth: 2,
        hoverOffset: 10, // Creates a slight pop-out effect on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable the default aspect ratio
    aspectRatio: 1, // Adjust the ratio to make the pie chart more circular
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Shows score percentage on hover
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.1)', // Slight shadow effect to simulate 3D
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '400px' }}>
      <h2 className="text-center font-bold text-lg mb-4">Camera Cleanliness Score Distribution</h2> {/* Added Heading */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
