import React, { useState } from 'react';
import close from "../assets/icons/close-circle.svg"
function AjoutReunion({ onClose }) {
  const [titre, setTitre] = useState('Titre réunion');
  const [lieu, setLieu] = useState('Lieu');
  const [date, setDate] = useState('2015-10-01');

  return ( 
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
    <div className="relative p-8 bg-white rounded-lg shadow-md text-center w-[350px]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <img className='w-8 h-8' src={close} alt="close-circle" />
        </button>

        <h2 className="text-black mb-5 font-bold text-lg">Ajouter une réunion</h2>

        <div className="flex flex-col gap-4 mb-6">
          <input 
            type="text" 
            placeholder={titre}
            className="w-full p-2 text-base border border-[#C6C6C6] rounded-2xl"
          />
          <input 
            type="date" 
            defaultValue={date}
            className="w-full p-2 text-base border border-[#C6C6C6] rounded-2xl"
          />
          <input 
            type="text" 
            placeholder={lieu}
            className="w-full p-2 text-base border border-[#C6C6C6] rounded-2xl"
          />
        </div>

        <button className="bg-[#0066cc] font-bold text-white px-8 py-2 rounded cursor-pointer text-base w-full">
          ENREGISTRER
        </button>
      </div>
    </div>
     
        
  );
}

export default AjoutReunion;
