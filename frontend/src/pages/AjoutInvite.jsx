import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLink from '../components/NavLink';
import BlogRight from '../components/BlogRight';

function AjoutInvite({ onClose }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [nomTable, setNomTable] = useState('');
  const [status, setStatus] = useState('A');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmitInvite = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('telephone', telephone);
      formData.append('nomTable', nomTable);
      formData.append('status', status);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch(`${apiUrl}/api/invite`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Invité ajouté avec succès:', data);
        navigate('/dashboard');
        window.location.reload();
        if (onClose) onClose();
      } else {
        console.error('Erreur lors de l’ajout de l’invité:', data.message);
      }
    } catch (error) {
      console.error('Erreur réseau ou autre:', error);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <NavLink />

      <div className="flex-1 bg-[#717171] flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmitInvite}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-black">
            Ajouter un invité
          </h2>

          <div className="flex flex-col gap-6 mb-8">
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
              required
            />
            <input
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
              required
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
              required
            />
            <input
              type="text"
              placeholder="Nom de la table"
              value={nomTable}
              onChange={(e) => setNomTable(e.target.value)}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
              required
            >
              <option value="A">A</option>
              <option value="P">P</option>
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#11B141] font-bold text-white px-8 py-3 rounded-2xl border-none cursor-pointer text-base hover:bg-[#0d9235] transition-colors"
          >
            SAUVEGARDER
          </button>
        </form>
      </div>

      <BlogRight />
    </div>
  );
}

export default AjoutInvite;
