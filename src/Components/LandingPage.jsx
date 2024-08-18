  import React from 'react';
  import { motion } from 'framer-motion';
  import { useLocation, useNavigate } from 'react-router-dom';

  const LandingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, folderPath } = location.state || {}; 

    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-6">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold mb-4 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {`Happy Rakshabandhan, ${user}`}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-2xl font-light mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          "May this Rakshabandhan bring you joy, love, and countless beautiful memories."
        </motion.p>
      

        <motion.img
          src="/Images/rakhi.jpg" // Replace with your image URL
          alt="Rakshabandhan Celebration"
          className="rounded-full shadow-lg w-48 h-48 sm:w-64 sm:h-64 mb-8"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.p
          className="text-lg sm:text-2xl font-light mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Nothing is more precious than the time we've shared together. Let's relive some of those cherished moments,      </motion.p>
        <motion.button
          onClick={() => navigate('/gallery', { state: { folderPath } })}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Memories
        </motion.button>
      </div>
    );
  };

  export default LandingPage;
