import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const Notifications = () => {
  const { postOfficeID } = useParams();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postOfficeID) {
      // Redirect to homepage if no postOfficeID
      navigate('/');
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch('/src/DB/Notifications.json');
        const result = await response.json();
        const data = result.find(item => item.postOfficeID === postOfficeID);
        if (data) {
          setNotifications(data.notifications);
        } else {
          setNotifications([]); // No notifications for this postOfficeID
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [postOfficeID, navigate]);

  if (loading) {
    return <div className="text-center p-4">Loading notifications, please wait...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Notifications</h1>
      </header>
      <div className="max-w-3xl mx-auto space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0">
                {notification.startsWith('Alert') ? (
                  <FaExclamationTriangle className="text-red-500 text-2xl" />
                ) : (
                  <FaCheckCircle className="text-green-500 text-2xl" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{notification}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-600">No new notifications.</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
