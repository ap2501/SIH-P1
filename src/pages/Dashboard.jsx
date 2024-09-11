import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams, useNavigate, Navigate } from "react-router-dom";
import Card from "../components/Card/Card";
import { motion } from "framer-motion";
import SpinnerScore from "../components/SpinnerScore";
import axios from "axios";
import NavBar from "../components/NavBar";
import Notifications from "./Notifications"; // Import Notifications component

const Dashboard = () => {
  const { postOfficeID } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [overallScore, setOverallScore] = useState(0);
  const [activeTab, setActiveTab] = useState("latest");
  const navigate = useNavigate();

  useEffect(() => {
    if (!postOfficeID) {
      // Redirect if postOfficeID is not found
      return <Navigate to="/" />;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("/src/DB/Main.json"); // Adjust the path to your Main.json file
        const allData = response.data;

        // Filter data by PostOfficeID
        const filteredData = allData.find(
          (item) => item.postOfficeID === postOfficeID
        );

        if (filteredData) {
          setData(filteredData.cameras);
          setOverallScore(filteredData.overallScore);
        } else {
          // Optionally handle the case where no data is found for the given postOfficeID
          console.error("PostOfficeID not found in data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [postOfficeID]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "historic") {
      navigate(`/dashboard/${postOfficeID}/historic_data`);
    }
    if (tab === "latest") {
      navigate(`/dashboard/${postOfficeID}`);
    }
    if (tab === "notifications") {
      navigate(`/dashboard/${postOfficeID}/notifications`);
    }
  };

  const isLatestData = location.pathname.endsWith(`/${postOfficeID}`);
  const isHistoricData = location.pathname.endsWith("/historic_data");
  const isNotifications = location.pathname.endsWith("/notifications");

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen p-6 bg-gray-50 overflow-hidden">
        {/* Curvilinear Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-yellow-200 opacity-80 z-0"></div>
        <svg
          className="absolute inset-x-0 bottom-0 z-0 transform rotate-180"
          viewBox="0 0 1440 320"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path
            fillOpacity="1"
            d="M0,256L48,234.7C96,213,192,171,288,154.7C384,139,480,149,576,176C672,203,768,245,864,229.3C960,213,1056,139,1152,112C1248,85,1344,107,1392,117.3L1440,128V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0V256Z"
          ></path>
        </svg>

        {/* Hero Section */}
        <section className="relative z-10 py-16 text-center">
          <h1 className="text-5xl font-extrabold text-green-900 mb-6">
            The Overall Score for Your{" "}
            <span className="text-yellow-500">Postal Region</span> is
          </h1>
          <SpinnerScore score={overallScore} />
          <p className="text-lg font-medium text-gray-700">
            Stay updated with the cleanliness and green practices!
          </p>
        </section>

        {/* Sub-navbar / Focus Bar */}
        <div className="relative z-10 mt-8 flex justify-center">
          <div className="bg-white bg-opacity-80 rounded-full shadow-lg px-6 py-2 flex space-x-8 items-center">
            <button
              onClick={() => handleTabChange("latest")}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === "latest"
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-green-900 hover:bg-green-100"
              }`}
            >
              Latest Data
            </button>
            <button
              onClick={() => handleTabChange("historic")}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === "historic"
                  ? "bg-yellow-500 text-white"
                  : "bg-transparent text-yellow-900 hover:bg-yellow-100"
              }`}
            >
              Historic Data
            </button>
            <button
              onClick={() => handleTabChange("notifications")}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === "notifications"
                  ? "bg-red-500 text-white"
                  : "bg-transparent text-red-900 hover:bg-red-100"
              }`}
            >
              Notifications
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        <div className="relative z-10 mt-16">
          {isLatestData && (
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {data.map((item) => (
                <motion.div
                  key={item.camID}
                  className="transition-transform transform hover:scale-105"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    camID={item.camID}
                    image={item.image}
                    score={item.score}
                    geolocation={item.geolocation}
                    timestamp={item.timestamp}
                  />
                </motion.div>
              ))}
            </main>
          )}

          {isHistoricData && <Outlet context={{ overallScore }} />}

          {isNotifications && <Notifications postOfficeID={postOfficeID} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
