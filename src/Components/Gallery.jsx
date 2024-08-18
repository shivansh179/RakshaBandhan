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
  const [currentIndex, setCurrentIndex] = useState(null); // Current index set to null initially
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
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log("Autoplay was prevented. Waiting for user interaction to play audio.");
        }
      };

      playAudio(); 
    }
  }, [songUrl]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  const handleProceedFurther = () => {
    navigate('/thankyou', { state: { folderPath } });
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
      
      {currentIndex !== null ? (
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

          <button
            onClick={() => setCurrentIndex(null)}
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Gallery
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imagesData.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      )}

      <button
        onClick={handleProceedFurther}
        className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        Proceed Further
      </button>

      {songUrl && (
        <audio ref={audioRef} src={songUrl} loop autoPlay /> 
      )}
    </div>
  );
};

export default Gallery;
