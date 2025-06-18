import React, { useEffect, useState } from 'react';
import AjoutReunion from './AjoutReunion'; // chemin à ajuster si nécessaire
import deleteIcon from '../assets/icons/deleteIcon.svg';
import edit from '../assets/icons/edit.svg';
import tri from '../assets/icons/tri.svg';
import ModifierReunion from './ModifierReunion';
import NavLink from '../components/NavLink';
import BlogRight from '../components/BlogRight';
import logo from "../assets/img/logo.png"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function MesReunions() {
  const [reunionsList, setReunionsList] = useState([]);
  const [filteredReunions, setFilteredReunions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopupAjoutReunion, setShowPopupAjoutReunion] = useState(false);
  const [showPopupUpdateReunion, setShowPopupUpdateReunion] = useState(false);
  const [selectedReunion, setSelectedReunion] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [reunionToDelete, setReunionToDelete] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const apiUrl = import.meta.env.VITE_API_URL;

  // Définir en haut du composant
  
  const reunions = async () => {
  try {
    const token = localStorage.getItem('token'); // ou sessionStorage

    const response = await axios.get(`${apiUrl}/api/reunions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true, // équivalent de credentials: 'include'
    });

    const data = response.data.reunions || [];
    console.log('Réunions récupérées:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réunions:', error);
    return [];
  }
};

    const fetchReunions = async () => {
      const data = await reunions();
      setReunionsList(data);
      setFilteredReunions(data);
    };
    // Lancer une fois au chargement
    useEffect(() => {
      fetchReunions();
    }, [location.pathname]);





  // Fonction pour gérer la recherche

  const handleSearch = () => {
    const filtered = reunionsList.filter(
      (reunion) =>
        reunion.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reunion.lieu.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredReunions(filtered);
  };




const handleDeleteReunion = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`${apiUrl}/api/delete-reunion/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      await fetchReunions(); // Recharge la liste après suppression
      setSuccessMessage('Réunion supprimée avec succès');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } else {
      alert('Erreur suppression');
    }
  } catch (err) {
    console.error(err);
    alert('Erreur suppression');
  }
};


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
      navigate('/login-page');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert("Erreur lors de la déconnexion");
    }
  }


  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
      
        <div className="hidden md:block md:w-64">
        <NavLink />
      </div>

      {/* ---- MOBILE HEADER + NAVIGATION ---- */}
      <div className="bg-gray-800 text-white w-full p-4 flex justify-between items-center md:hidden">
<h1 className="text-xl font-bold size-12"><img src={logo} className='w-max' alt="logo-wedd" /></h1>        <button
          className="bg-gray-700 px-3 py-1 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <nav className="bg-gray-800 text-white flex flex-col gap-3 p-4 w-full md:hidden">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Dashboard</Link>
          <Link to="/liste-reunions" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Réunions</Link>
          <Link to="/ajout-invite" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Ajouter un invité</Link>
          <Link to="/recherche-invite" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Recherche invité</Link>
          <Link to="/profil" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Profil</Link>
          <Link onClick={() =>{ setMenuOpen(false); handleLogout()}} className="text-red-400 hover:text-red-300">Déconnexion</Link>
          
        </nav>
      )}
        <div className="flex-1 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold mt-10 sm:mt-20 mb-10 sm:mb-20 text-center">
            Gestion des différentes réunions
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 mt-8">
            <button className="p-2 mb-4 sm:mb-0">
              <img src={tri} alt="Trier" className="w-6 h-6" />
            </button>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <input
                type="text"
                className="border border-gray-200 rounded px-4 py-2 w-full sm:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par titre"
              />
              <button
                className="text-blue-500 font-bold border border-blue-500 rounded px-4 py-2 w-full sm:w-auto"
                onClick={handleSearch}
              >
                Rechercher
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
                {successMessage}
              </div>
            )}
            <table className="table-auto w-full">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2">TITRE REUNION</th>
                  <th className="px-4 py-2">DATE</th>
                  <th className="px-4 py-2">HEURE</th>
                  <th className="px-4 py-2">LIEU</th>
                  <th className="px-4 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredReunions && filteredReunions.length > 0 ? (
                  filteredReunions.map((reunion) => (
                    <tr key={reunion._id}>
                      <td className="px-4 py-2 border-b text-center">
                        {reunion.titre}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {new Date(reunion.dateHeure).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {new Date(reunion.dateHeure).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        {reunion.lieu}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        <button
                          onClick={() => {
                            setSelectedReunion(reunion);
                            setShowPopupUpdateReunion(true);
                          }}
                          className="px-2"
                        >
                          <img src={edit} alt="Editer" className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => {
                            setReunionToDelete(reunion._id);
                            setShowConfirmDelete(true);
                          }}
                          className="px-2"
                        >
                          <img
                            src={deleteIcon}
                            alt="Supprimer"
                            className="w-5 h-5"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 border-b text-center">
                      Aucune réunion trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowPopupAjoutReunion(true)}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter une réunion
            </button>
          </div>
          {showPopupAjoutReunion && (
            <AjoutReunion onClose={() => setShowPopupAjoutReunion(false)} />
          )}
          {showPopupUpdateReunion && selectedReunion && (
            <ModifierReunion
              reunion={selectedReunion}
              onClose={() => {
                setShowPopupUpdateReunion(false);
                setSelectedReunion(null);
              }}
            />
          )}
        </div>
        {/* ---- BLOGRIGHT (droite, desktop seulement) ---- */}
      <div className="hidden md:block md:w-64">
        <BlogRight />
      </div>
    </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p className="mb-6">
              Es-tu sûr de vouloir supprimer cette réunion ?
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  handleDeleteReunion(reunionToDelete);
                  setShowConfirmDelete(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Oui, supprimer
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MesReunions;