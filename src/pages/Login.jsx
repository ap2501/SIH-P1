import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Main from '../DB/Main.json'; // Adjust path if needed
import NavBar from '../components/NavBar';

const Login = () => {
    const [postOfficeID, setPostOfficeID] = useState('');
    const [error, setError] = useState('');
    const [postOffices, setPostOffices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch and set post offices from JSON file
        const fetchPostOffices = async () => {
            // Assuming Main is an array of objects
            setPostOffices(Main);
        };

        fetchPostOffices();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the postOfficeID
        const isValidID = postOffices.some(off => off.postOfficeID === postOfficeID);
    
        if (isValidID) {
            navigate(`/dashboard/${postOfficeID}`);
        } else {
            setError('Invalid PostOfficeID. Please check and try again.');
        }
    };

    // Static image URLs related to cleanliness and environment
    const images = [
        'https://images1.livehindustan.com/uploadimage/library/2023/10/01/16_9/16_9_6/1_OCT_BETT_1110959_1696182792_1696182792.JPG', // Cleanliness image
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4h_MjhXQK9fTgLSEZU78WYk2TqpobI3Wwyg&s', // Green Energy image
        'https://resize.indiatvnews.com/en/resize/oldbucket/1200_-/politicsnational/IndiaTv90aae6_PM-starts-his-o20518.jpg', // Sustainable community
    ];

    // Continuous movement animation for images
    const moveUpDown = {
        animate: {
            y: [0, -20, 0],
            transition: {
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <>
            <NavBar/>
            <div className="min-h-screen flex relative">
            {/* Left Segment: Login Form */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-500 to-yellow-400 flex items-center justify-center p-8 relative z-10">
                <motion.div
                    className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <h1 className="text-4xl font-extrabold text-center mb-6 text-green-800">
                        Access Cleanliness Data
                    </h1>
                    <p className="text-center text-gray-700 mb-8 font-medium">
                        Enter your PostOfficeID to get started.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="postOfficeID" className="block text-sm font-semibold text-gray-800">
                                PostOfficeID
                            </label>
                            <input
                                type="text"
                                id="postOfficeID"
                                value={postOfficeID}
                                onChange={(e) => setPostOfficeID(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                placeholder="Enter PostOfficeID"
                            />
                        </div>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition-all duration-300"
                        >
                            Access Data
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Curved Effect */}
            <svg className="absolute inset-0 z-10" viewBox="0 0 1440 320">
                <path
                    fill="currentColor"
                    fillOpacity="0.3"
                    d="M0,128L30,144C60,160,120,192,180,192C240,192,300,160,360,133.3C420,107,480,96,540,122.7C600,149,660,203,720,213.3C780,224,840,192,900,160C960,128,1020,96,1080,101.3C1140,107,1200,149,1260,160C1320,171,1380,149,1410,138.7L1440,128V0H1410C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0H0V128Z"
                ></path>
            </svg>

            {/* Right Segment: Info with Animated Images */}
            <div className="hidden lg:flex w-1/2 bg-yellow-100 items-center justify-center p-12 relative z-10">
                <div className="relative overflow-hidden rounded-lg backdrop-blur-sm bg-white/30 p-6">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h2 className="text-5xl font-extrabold text-green-800 mb-6">
                            Swachhta and LIFE
                        </h2>
                        <p className="text-lg text-gray-800 leading-relaxed">
                            <span className="block font-bold text-green-600">
                                "Clean environment is the foundation for a better life."
                            </span>
                            <br />
                            Join us in creating a cleaner and greener world, starting with our post offices.
                        </p>
                    </motion.div>
                </div>

                {/* Animated Rounded Image Spreads */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className={`absolute w-40 h-40 rounded-full overflow-hidden shadow-lg ${
                                index === 0
                                ? 'top-10 right-12'
                                : index === 1
                                ? 'top-40 left-20'
                                : 'bottom-10 right-20'
                            }`}
                            variants={moveUpDown}
                            animate="animate"
                            whileHover={{ scale: 1.1 }}
                        >
                            <img
                                src={image}
                                alt={`Cleanliness and Green Practice ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decor: Subtle Decor */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-yellow-200 opacity-90 z-0"></div>
        </div>
        </>
    );
};

export default Login;
