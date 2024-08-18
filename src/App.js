import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserSelection from './Components/Login/Login.jsx';
import LandingPage from './Components/LandingPage.jsx';
import Gallery from './Components/Gallery.jsx';
import ThankYouPage from './Components/ThankYou.jsx';
import { AuthProvider } from './Components/context/AuthContext.js';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/landing" element={<ProtectedRoute element={<LandingPage />} />} />
          <Route path="/gallery" element={<ProtectedRoute element={<Gallery />} />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          {/* Redirect to home if route not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
