import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserSelection = () => {
  const [user, setUser] = useState('');
  const [code, setCode] = useState('');
  const [emojiState, setEmojiState] = useState('neutral'); // neutral, happy, or angry
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleLogin = () => {
    let folderPath = '';

    if (user === 'Pari' && code === '27082006') {
      folderPath = 'Pari';
      setEmojiState('happy');
      login(); // Set the user as authenticated
    } else if (user === 'Manya' && code === '24012006') {
      folderPath = 'Manya';
      setEmojiState('happy');
      login(); // Set the user as authenticated
    } else {
      setEmojiState('angry');
      alert('Invalid user or code');
      return;
    }

    // Navigate to LandingPage after successful login and pass folderPath and user via state
    navigate('/landing', { state: { folderPath, user } });
  };

  const getEmoji = () => {
    switch (emojiState) {
      case 'happy':
        return '😊';
      case 'angry':
        return '😡';
      default:
        return '😐';
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Select User</h1>
      <input
        type="text"
        placeholder="Enter User (Pari/Manya)"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="mb-4 p-2 text-gray-800 rounded"
      />
      <input
        type="password"
        placeholder="Enter Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mb-4 p-2 text-gray-800 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
      <div className="mt-4 text-6xl">
        {getEmoji()}
      </div>
    </div>
  );
};

export default UserSelection;
