import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Countdown() {

      const [formData, setFormData] = useState({ dateMariage: '' });   
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
      const apiUrl = import.meta.env.VITE_API_URL;

      useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    
        return () => clearTimeout(timer);
      });


      const getUser = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${apiUrl}/api/profil`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.user || {};
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des infos utilisateur :',
        error,
      );
      return {};
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    };
    fetchUser();
  }, []);
    
      function calculateTimeLeft() {
        // Vous pouvez remplacer cette date par la date du mariage
        const weddingDate = new Date(formData.dateMariage);
        const now = new Date();
        const difference = weddingDate - now;
    
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
            heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            secondes: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      }
    
      const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval]) {
          return null;
        }
    
        return (
          <div key={interval} className="flex flex-col items-center mx-2">
            <motion.span 
              className="text-xl md:text-2xl font-bold text-blue-700"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={timeLeft[interval]}
            >
              {timeLeft[interval]}
            </motion.span>
            <span className="text-xs text-blue-900 capitalize">{interval}</span>
          </div>
        );
      });
  return (
    <div>
        {Object.keys(timeLeft).length ? (
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {timerComponents}
          </motion.div>
        ) : (
          <motion.div 
            className="text-xl font-bold text-pink-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Le grand jour est arrivé !
          </motion.div>
        )}
    </div>
  )
}

export default Countdown