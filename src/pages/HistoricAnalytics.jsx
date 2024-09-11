import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { FaChartBar, FaCalendarDay, FaTachometerAlt } from 'react-icons/fa'; // Using consistent icons
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PieChart from '../components/PieChart';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HistoricAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const cameraScores = data[0]?.history[0]?.cameras || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/DB/HistoricData.json');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading data, please wait...</div>;
  }

  // Prepare data for multiple graphs
  const sortedHistory = data[0]?.history?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Historic Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Loop over the data to create multiple charts */}
        {sortedHistory?.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <FaCalendarDay className="text-gray-500" />
                <span className="text-lg">{new Date(entry.updatedAt).toLocaleDateString()} - {new Date(entry.updatedAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaTachometerAlt className="text-green-500" />
                <span className="text-lg font-semibold">Overall Score: {entry.overallScore}</span>
              </div>
            </div>
            
            {/* Render a Bar Graph comparing scores for multiple cameras */}
            
            <BarGraph cameras={entry.cameras} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// BarGraph Component for Multiple Cameras
const BarGraph = ({ cameras }) => {
  const data = {
    labels: cameras.map(cam => cam.camID), // Labels will be the camera IDs
    datasets: [
      {
        label: 'Camera Scores',
        data: cameras.map(cam => cam.score), // Data points for each camera
        backgroundColor: cameras.map(cam =>
          cam.score < 40 ? 'rgba(255, 99, 132, 0.8)' : cam.score < 80 ? 'rgba(255, 206, 86, 0.8)' : 'rgba(75, 192, 192, 0.8)'
        ),
        borderColor: cameras.map(cam =>
          cam.score < 40 ? 'rgba(255, 99, 132, 1)' : cam.score < 80 ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
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
        text: 'Camera Score Comparison',
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
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HistoricAnalytics;
