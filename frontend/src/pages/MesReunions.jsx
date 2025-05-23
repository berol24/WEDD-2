import React, { useState } from 'react';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import edit from '../assets/icons/edit.svg';
import tri from '../assets/icons/tri.svg';
function MesReunions() {

const [reunions, setReunions] = useState([
  { id: 1, titre_reunion: 'Réunion 1', date: '2023-10-01', heure: '10:00', lieu: 'Salle A' },
  { id: 2, titre_reunion: 'Réunion 2', date: '2023-10-02', heure: '11:00', lieu: 'Salle B' },
  { id: 3, titre_reunion: 'Réunion 3', date: '2023-10-03', heure: '12:00', lieu: 'Salle C' },
  { id: 4, titre_reunion: 'Réunion 4', date: '2023-10-01', heure: '13:00', lieu: 'Salle E' },
  { id: 5, titre_reunion: 'Réunion 5', date: '2023-10-02', heure: '14:00', lieu: 'Salle F' },
  { id: 6, titre_reunion: 'Réunion 6', date: '2023-10-03', heure: '15:00', lieu: 'Salle G' },])


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mt-10 sm:mt-20 mb-10 sm:mb-20 text-center">Gestion des différentes réunions</h1>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 mt-8">
          <button className="p-2 mb-4 sm:mb-0"> 
              <img src={tri} alt="" className="w-6 h-6" /> 
          </button>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <input type="text" className="border border-gray-200 rounded px-4 py-2 w-full sm:w-auto" />
              <button className="text-blue-500 font-bold border border-blue-500 rounded px-4 py-2 w-full sm:w-auto">Rechercher</button>
          </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full"> 
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">TITRE REUNION</th>
              <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">DATE</th>
              <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">HEURE</th>
              <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">LIEU</th>
              <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
          {
              reunions.map((reunion) => (
                <tr key={reunion.id}>
                  <td className="px-2 sm:px-4 py-2 border-b border-black text-center text-sm sm:text-base">{reunion.titre_reunion}</td>
                  <td className="px-2 sm:px-4 py-2 border-b border-black text-center text-sm sm:text-base">{reunion.date}</td>
                  <td className="px-2 sm:px-4 py-2 border-b border-black text-center text-sm sm:text-base">{reunion.heure}</td>
                  <td className="px-2 sm:px-4 py-2 border-b border-black text-center text-sm sm:text-base">{reunion.lieu}</td>
                  <td className="px-2 sm:px-4 py-2 border-b border-black text-center">
                    <button className="px-2 sm:px-4 py-2 rounded text-center"><img src={edit} className="w-5 h-5 inline"/></button>
                    <button className="rounded"><img src={deleteIcon} className="w-5 h-5 inline"/></button>
                  </td>
                </tr>
              ))
          }
          </tbody>
        </table>
      </div>
       <div className="flex justify-center mt-6">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Ajouter une réunion
        </button>
      </div>
    </div>
  );
}

export default MesReunions;




