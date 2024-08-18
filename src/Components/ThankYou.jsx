import React from 'react';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="p-8 bg-white rounded-lg shadow-lg text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">You are the Best!</h1>
        <p className="text-lg text-gray-600">Thank you for being with me!</p>
        <p className="text-md text-gray-600">From <span className='font-bold text-blue-600'>Om</span> and <span className='font-bold text-blue-600'>Nishant</span></p>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
