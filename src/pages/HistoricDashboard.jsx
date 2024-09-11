import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import BarGraph from '../components/BarGraph'; // Ensure BarGraph is updated to handle multiple cameras
import { FaCalendarDay, FaTachometerAlt } from 'react-icons/fa';
import PieChart from '../components/PieChart';
import ScoreProgression from '../components/ScoreProgression';

const HistoricDashboard = () => {
  const { postOfficeID } = useParams(); // Get the postOfficeID from the route params
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [data, setData] = useState(null); // Initialize data as null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the JSON file
    const fetchData = async () => {
      try {
        const response = await fetch('/src/DB/HistoricData.json');
        const result = await response.json();
        
        // Filter the result based on the postOfficeID
        const postOfficeData = result.find(item => item.postOfficeID === postOfficeID);
        setData(postOfficeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postOfficeID]); // Re-fetch data when postOfficeID changes

  if (loading) {
    return <div className="text-center p-4">Loading data, please wait...</div>;
  }

  if (!data) {
    return <div className="text-center p-4">No data available for this post office.</div>;
  }

  // Sort data by updatedAt date in descending order (latest first)
  const sortedHistory = data.history.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="space-y-4">
      {sortedHistory.map((entry, index) => (
        <CollapsibleSection
          key={index}
          index={index}
          overallScore={entry.overallScore}
          updatedAt={entry.updatedAt}
          expanded={expandedIndex === index}
          onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
        >
          {/* Pass the cameras array to BarGraph */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><BarGraph cameras={entry.cameras} /></div>
            
            {/* You can add more chart components here */}
            <div><PieChart cameras={entry.cameras} /></div>
            
          </div> 
        </CollapsibleSection>
      ))}
    </div>
  );
};

const CollapsibleSection = ({ index, overallScore, updatedAt, expanded, onToggle, children }) => {
  return (
    <div className="relative max-w-4xl mx-auto"> {/* Increase the max width */}
      <div className="bg-white bg-opacity-80 backdrop-blur-md border rounded-lg shadow-lg overflow-hidden transition-all duration-300">
        <button
          onClick={onToggle}
          className="w-full p-4 bg-gray-100 text-left font-medium focus:outline-none flex items-center justify-between hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <FaCalendarDay className="text-gray-500" />
            <span>{new Date(updatedAt).toLocaleDateString()} - {new Date(updatedAt).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTachometerAlt className="text-green-500" />
            <span>Overall Score: {overallScore}</span>
          </div>
        </button>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="p-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HistoricDashboard;
