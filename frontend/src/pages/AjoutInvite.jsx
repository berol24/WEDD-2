import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavLink from '../components/NavLink';
import BlogRight from '../components/BlogRight';
import logo from "../assets/img/logo.png"
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

function AjoutInvite({ onClose }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [nomTable, setNomTable] = useState('');
  const [titre, setTitre] = useState('');
  const [status, setStatus] = useState('A');
  const [image, setImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

const handleLogout = async () => {
    try {
      // Supprimer le token (localStorage ou sessionStorage selon ton app)
      localStorage.removeItem('token');

      // Appel de l'API de déconnexion (pas strictement nécessaire, mais bon pour les logs côté serveur)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Redirection vers la page de connexion
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert("Erreur lors de la déconnexion");
    }
  }

  const handleSubmitInvite = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('telephone', telephone);
    formData.append('nomTable', nomTable);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    const token = localStorage.getItem('token');

    const response = await axios.post(`${apiUrl}/api/invite`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });

    //console.log('Invité ajouté avec succès:', response.data);
    navigate('/dashboard');
    
    if (onClose) onClose();

  } catch (error) {
    if (error.response) {
      console.error('Erreur lors de l’ajout de l’invité:', error.response.data.message);
    } else {
      console.error('Erreur réseau ou autre:', error.message);
    }
  }

};

  return (
  
<div className="flex flex-col md:flex-row min-h-screen">
      
        <div className="hidden md:block md:w-64">
          <NavLink />
        </div>

        {/* ---- MOBILE HEADER + NAVIGATION ---- */}
        <header className="bg-gray-100 text-white w-full p-4 flex justify-between items-center md:hidden">
          <img src={logo} className="h-16 rounded-full" alt="logo-wedd" />
          <button
            className="py-2 px-4 rounded-md bg-blue-700 hover:bg-blue-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
          ☰
          </button>
        </header>

        {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav 
            className="bg-gray-200 text-dark flex flex-col gap-4 p-4 w-full md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Dashboard</Link>
            <Link to="/liste-reunions" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Réunions</Link>
            <Link to="/ajout-invite" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Ajouter un invité</Link>
            <Link to="/recherche-invite" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Recherche invité</Link>
            <Link to="/profil" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Profil</Link>
            <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="text-red-700 hover:text-red-700 text-left transition-colors">
              Déconnexion
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="flex-1 bg-[#FAFAFA] flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmitInvite}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-black">
            Ajouter un invité
          </h2>

          <div className="flex flex-col gap-6 mb-8">
            <select
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
              >
                <option value="">Sélectionnez une civilité</option>
                <option value="M">M.</option>
                <option value="Mme">Mme</option>
                <option value="Mlle">Mlle</option>
                <option value="couple">M. & Mme</option>
            </select>

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

      {/* ---- BLOGRIGHT (droite, desktop seulement) ---- */}
      <div className="hidden md:block md:w-80">
        <BlogRight />
      </div>
    </div>
  );
}

export default AjoutInvite;
