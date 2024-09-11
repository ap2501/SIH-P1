import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { BsFillCameraFill } from 'react-icons/bs';

const getLocationName = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const location = response.data.address;
    return location ? `${location.city || location.town || location.village}, ${location.country}` : 'Unknown Location';
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'Unknown Location';
  }
};

const Card = ({ camID, image, score, geolocation, timestamp }) => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      const locationName = await getLocationName(geolocation.lat, geolocation.long);
      setLocation(locationName);
    };

    fetchLocation();
  }, [geolocation.lat, geolocation.long]);

  // Conditional styling for the card when score is below 40
  const isLowScore = score < 40;
  const cardBackground = isLowScore
    ? 'bg-red-50' // Very light red background
    : 'bg-gradient-to-br from-white via-gray-100 to-gray-200';

  const scoreTextColor = isLowScore ? 'text-red-600' : 'text-green-600';

  return (
    <motion.div
      className={`${cardBackground} shadow-xl rounded-lg overflow-hidden max-w-sm mx-auto mb-6 transition-transform transform hover:scale-105`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <img
          src={image}
          alt={`Camera ${camID}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black opacity-50 text-white text-center py-2">
          <p className="text-lg font-bold">Camera ID: {camID}</p>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <FaStar className={`${scoreTextColor} text-3xl`} />
          <h2 className="text-2xl font-semibold text-gray-800">
          Score: <span className={`font-bold ${scoreTextColor}`}>{score}</span>
          </h2>
        </div>
        {isLowScore && (
          <p className="text-red-600 text-center font-bold animate-pulse">Needs Attention</p>
        )}
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-gray-600 text-xl" />
          <p className="text-sm text-gray-600">
            Location: <span className="font-medium text-gray-800">{location}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="text-gray-600 text-xl" />
          <p className="text-sm text-gray-600">
            Timestamp: <span className="font-medium text-gray-800">{new Date(timestamp).toLocaleString()}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
