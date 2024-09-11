import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import { FaRobot, FaImage, FaChartBar, FaCheckCircle } from 'react-icons/fa';

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-300 flex flex-col">
        {/* Hero Section */}
        <header className="relative text-center py-20 bg-green-600 text-white overflow-hidden">
          <motion.h1
            className="text-6xl font-extrabold tracking-wide mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Swachhta & LIFE Dashboard
          </motion.h1>
          <motion.p
            className="text-2xl font-light mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Real-time monitoring of cleanliness and green practices in Post Offices.
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            Learn More
          </motion.button>
          <motion.div
            className="absolute bottom-0 left-0 w-full h-32 bg-green-800 rounded-t-[50%] z-[1]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </header>

        {/* Check Cleanliness Section */}
        <section className="text-gray-800 px-8 py-16 bg-white">
          <motion.h2
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Check Cleanliness
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="text-center max-w-lg">
              <FaRobot className="text-6xl text-green-600 mx-auto mb-4" />
              <motion.p
                className="text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Our AI-driven system processes images from cameras to assess cleanliness levels accurately.
              </motion.p>
            </div>
            <div className="text-center max-w-lg">
              <FaImage className="text-6xl text-blue-600 mx-auto mb-4" />
              <motion.p
                className="text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                High-resolution images are analyzed for cleanliness, generating a precise score for each location.
              </motion.p>
            </div>
            <div className="text-center max-w-lg">
              <FaChartBar className="text-6xl text-purple-600 mx-auto mb-4" />
              <motion.p
                className="text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                The collected data is visualized through comprehensive charts and graphs for easy interpretation.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="text-gray-700 px-8 py-16 bg-gray-100">
          <motion.h2
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            What We Do
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delay: 0.4,
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            {/* Card 1 */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6 text-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <FaCheckCircle className="text-4xl text-green-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Real-Time Monitoring</h3>
              <p className="text-sm">
                Our system offers real-time surveillance and cleanliness monitoring to ensure post offices maintain high standards.
              </p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6 text-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <FaRobot className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">AI-Powered Insights</h3>
              <p className="text-sm">
                We use AI-driven image analysis to detect cleanliness deviations and provide actionable insights.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6 text-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <FaChartBar className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Comprehensive Reports</h3>
              <p className="text-sm">
                Generate detailed reports on cleanliness and green practices for every post office in your region.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer Section */}
        <footer className="bg-green-700 text-white text-center py-6">
          <p className="text-lg">&copy; 2024 Swachhta & LIFE Dashboard. All Rights Reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
