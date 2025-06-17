import React, { useEffect, useState } from 'react';
import axios from 'axios';
function ModifierInvite({ invite, onClose }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [nomTable, setNomTable] = useState('');
  const [status, setStatus] = useState('P');
  const [image, setImage] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (invite) {
      setNom(invite.nom || '');
      setPrenom(invite.prenom || '');
      setTelephone(invite.telephone || '');
      setNomTable(invite.nomTable || '');
      setStatus(invite.status || 'P');
    }
  }, [invite]);

 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('telephone', telephone);
    formData.append('nomTable', nomTable);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    const response = await axios.put(`${apiUrl}/api/edit-invite/${invite._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      onClose(); // Ferme la popup si succès
    } else {
      alert('Erreur lors de la modification');
    }
  } catch (error) {
    console.error('Erreur modification:', error);
    alert('Erreur lors de la modification');
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="p-8 bg-white rounded-lg shadow-md text-center w-[340px]">
        <h2 className="text-black mb-5 font-bold text-lg">Modifier l'invité</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            className="p-2 text-center border border-gray-300 rounded-2xl"
          />
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prénom"
            className="p-2 text-center border border-gray-300 rounded-2xl"
          />
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="Téléphone"
            className="p-2 text-center border border-gray-300 rounded-2xl"
          />
          <input
            type="text"
            value={nomTable}
            onChange={(e) => setNomTable(e.target.value)}
            placeholder="Nom de la table"
            className="p-2 text-center border border-gray-300 rounded-2xl"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 text-center border border-gray-300 rounded-2xl"
          >
            <option value="P">P</option>
            <option value="A">A</option>
          </select>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 text-center border border-gray-300 rounded-2xl"
          />

          <button
            type="submit"
            className="bg-green-600 text-white font-bold px-6 py-2 rounded-2xl"
          >
            SAUVEGARDER
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black px-6 py-2 rounded-2xl mt-2"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModifierInvite;
