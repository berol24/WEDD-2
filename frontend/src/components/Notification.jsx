import React, { useEffect, useState } from 'react';
import alarm from '../assets/icons/alarm.svg';

function Notification() {
  const [reunionsList, setReunionsList] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const reunions = async () => {
    try {
      const token = localStorage.getItem('token'); // ou sessionStorage
      const response = await fetch(`${apiUrl}/reunions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // si besoin
      });

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const reunions = await response.json();
      const data = reunions.reunions || []; // Assurez-vous que la structure de la réponse est correcte
      console.log('Réunions récupérées:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réunions:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchReunions = async () => {
      const data = await reunions(); // <- la fonction définie plus haut
      setReunionsList(data);
    };

    fetchReunions();
  }, []);
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto  w-[300px]  ">
        {reunionsList &&
          reunionsList.map((reunion) => (
            <a
              href="#"
              className="flex justify-between items-center gap-4 border-2 border-gray-300 p-4 rounded-lg w-[300px]"
            >
              <img src={alarm} alt="alarm-icon" className="flex-shrink-0" />
              <div className="flex flex-col flex-grow min-w-0">
                <p className="font-bold break-words">{reunion.titre}</p>
                <p>{new Date(reunion.dateHeure).toLocaleDateString()}</p>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
export default Notification;
