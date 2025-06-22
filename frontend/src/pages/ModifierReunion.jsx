// import React, { useEffect, useState } from 'react';
// import close from '../assets/icons/close-circle.svg';
// import axios from 'axios';
// function ModifierReunion({ onClose, reunion }) {
//   const [titre, setTitre] = useState('');
//   const [lieu, setLieu] = useState('');
//   const [date, setDate] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const reunionId = reunion._id;


// const toLocalDateTimeInputValue = (dateString) => {
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = (`0${date.getMonth() + 1}`).slice(-2); // mois = 0-indexé
//   const day = (`0${date.getDate()}`).slice(-2);
//   const hours = (`0${date.getHours()}`).slice(-2);
//   const minutes = (`0${date.getMinutes()}`).slice(-2);
//   return `${year}-${month}-${day}T${hours}:${minutes}`;
// };


//   useEffect(() => {
//     if (reunion) {
//       setTitre(reunion.titre || '');
//       setLieu(reunion.lieu || '');
//       setDate(toLocalDateTimeInputValue(reunion.dateHeure));
//     }
//   }, [reunion]);

 

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const token = localStorage.getItem('token');

//     await axios.put(
//       `${apiUrl}/api/edit-reunion/${reunionId}`,
//       {
//         titre,
//         lieu,
//         dateHeure: date,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     setSuccessMessage('Réunion modifiée avec succès');
//     setTimeout(() => {
//       setSuccessMessage('');
//       onClose(); // Fermer la modale après succès
//     }, 2000);
//      window.location.reload(); // Recharger la page pour mettre à jour la liste des réunions
//   } catch (err) {
//     console.error(err);
//     alert('Erreur lors de la modification');
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="p-8 bg-white rounded-lg shadow-md text-center relative">
//         <button onClick={onClose} className="absolute top-2 right-2">
//           <img className="w-6 h-6" src={close} alt="close-circle" />
//         </button>
//         <h2 className="text-black mb-5 font-bold text-lg">
//           Modifier une réunion
//         </h2>
//         {successMessage && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
//             {successMessage}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="text"
//             value={titre}
//             onChange={(e) => setTitre(e.target.value)}
//             required
//             className="w-[300px] p-2 border border-[#C6C6C6] rounded-2xl"
//           />
//           <input
//             type="datetime-local"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//             className="w-[300px] p-2 border border-[#C6C6C6] rounded-2xl"
//           />
//           <input
//             type="text"
//             value={lieu}
//             onChange={(e) => setLieu(e.target.value)}
//             required
//             className="w-[300px] p-2 border border-[#C6C6C6] rounded-2xl"
//           />
//           <button
//             type="submit"
//             className="bg-[#0066cc] font-bold text-white px-8 py-2 rounded text-base mt-2"
//           >
//             ENREGISTRER
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ModifierReunion;











import React, { useEffect, useState } from 'react';
import close from '../assets/icons/close-circle.svg';
import axios from 'axios';

function ModifierReunion({ onClose, reunion }) {
  const [titre, setTitre] = useState('');
  const [lieu, setLieu] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const reunionId = reunion._id;

  // 🔧 Convertit une date ISO en string compatible avec input datetime-local
  const toLocalDateTimeInputValue = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const hours = (`0${date.getHours()}`).slice(-2);
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // 🔧 Convertit la string datetime-local en objet Date en heure locale
  const convertToLocalDate = (datetimeStr) => {
    const [datePart, timePart] = datetimeStr.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute);
  };

  useEffect(() => {
    if (reunion) {
      setTitre(reunion.titre || '');
      setLieu(reunion.lieu || '');
      setDate(toLocalDateTimeInputValue(reunion.dateHeure));
    }
  }, [reunion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const localDate = convertToLocalDate(date); // 👈 convertit en heure locale

      await axios.put(
        `${apiUrl}/api/edit-reunion/${reunionId}`,
        {
          titre,
          lieu,
          dateHeure: localDate.toISOString(), // 👈 converti en UTC proprement
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMessage('Réunion modifiée avec succès');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
        window.location.reload();
      }, 2000);

    } catch (err) {
      console.error(err);
      alert('Erreur lors de la modification');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="p-8 bg-white rounded-lg shadow-md text-center relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <img className="w-6 h-6" src={close} alt="close-circle" />
        </button>
        <h2 className="text-black mb-5 font-bold text-lg">
          Modifier une réunion
        </h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            className="w-[300px] p-2 border border-[#C6C6C6] rounded-2xl"
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-[300px] p-2 border border-[#C6C6C6] rounded-2xl"
          />
          <input
            type="text"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
            required
            className="w-[300px] p-2 border border-[#C6C6C6] rounded-2xl"
          />
          <button
            type="submit"
            className="bg-[#0066cc] font-bold text-white px-8 py-2 rounded text-base mt-2"
          >
            ENREGISTRER
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModifierReunion;
