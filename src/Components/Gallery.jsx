import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from '../firebaseconfig';  

const Gallery = () => {
  const location = useLocation();
  const { folderPath } = location.state || {};
  const [imagesData, setImagesData] = useState([]);
  const [quotesData, setQuotesData] = useState([]);
  const [songUrl, setSongUrl] = useState(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); 
  const audioRef = useRef(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageRef = ref(storage, `${folderPath}/`);
        const result = await listAll(storageRef);
        const urls = await Promise.all(result.items.map(item => getDownloadURL(item)));
  
        const preloadedImages = urls.map((url, index) => ({
          src: url,
          alt: `Memory ${index + 1}`
        }));
  
        setImagesData(preloadedImages);
      } catch (error) {
        console.error("Error fetching images from Firebase Storage:", error);
      }
    };

    const fetchQuotes = async () => {
      try {
        const response = await fetch(`/quotes/${folderPath.toLowerCase()}.json`);
        const data = await response.json();
        setQuotesData(data);
      } catch (error) {
        console.error("Error fetching quotes data:", error);
      }
    };

    const fetchSong = async () => {
      try {
        const songRef = ref(storage, `Song/Meri Behna(PagalWorld.com.sb).mp3`);
        const url = await getDownloadURL(songRef);
        setSongUrl(url); 
      } catch (error) {
        console.error("Error fetching song from Firebase Storage:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchImages(),
          fetchQuotes(),
          fetchSong(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (folderPath) {
      fetchData();
    } else {
      setLoading(false); 
    }
  }, [folderPath]);

  useEffect(() => {
    if (songUrl && audioRef.current) {
      // Attempt to play the audio
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log("Autoplay was prevented. Waiting for user interaction to play audio.");
        }
      };

      playAudio(); // Try to play immediately
    }
  }, [songUrl]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < imagesData.length - 1 ? prevIndex + 1 : prevIndex));
  };

  if (loading) {
    return <p>Please wait for some time....</p>;
  }

  if (imagesData.length === 0 || quotesData.length === 0) {
    return <p>No images or quotes found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-gray-800 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-8 text-white">Our Memories</h2>
      
      <div className="relative w-full max-w-2xl">
        <motion.div
          className="overflow-hidden rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={imagesData[currentIndex].src}
            alt={imagesData[currentIndex].alt}
            className="w-full h-96 object-contain rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-800"
          />
          <p className="p-4 text-center text-lg bg-gray-900 text-white rounded-b-lg">
            {quotesData[currentIndex]?.text} - <em>{quotesData[currentIndex]?.author}</em>
          </p>
        </motion.div>

        {currentIndex < imagesData.length - 1 ? (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full bg-gray-700 text-white p-3 rounded-full hover:bg-gray-500"
              style={{ zIndex: 10 }}
            >
              &#8592;
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full bg-gray-700 text-white p-2 rounded-full hover:bg-gray-500"
              style={{ zIndex: 10 }}
            >
              &#8594;
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/thankyou', { state: { folderPath } })}
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Proceed Further
          </button>
        )}
      </div>

      {songUrl && (
        <audio ref={audioRef} src={songUrl} loop autoPlay /> 
      )}
    </div>
  );
};

export default Gallery;
