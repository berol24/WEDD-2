import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavLink from './../components/NavLink';
import Table from '../components/Table';
import { useState, useEffect } from 'react';
import Graphe from '../components/Graphe';
import Bouton from '../components/Bouton';
import tri from '../assets/icons/tri.svg';
import NextMeeting from '../components/NextMeeting';
import BlogRight from '../components/BlogRight';
import ModifierInvite from './ModifierInvite';
import logo from "../assets/img/logo.png"


import axios from 'axios';
function Dashboard() {
  const [invitesList, setInvitesList] = useState([]);
  const [reunionsList, setReunionsList] = useState([]);
  const [filteredInvites, setFilteredInvites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;
 // States à ajouter tout en haut du composant Dashboard
  const [showPopupUpdateInvite, setShowPopupUpdateInvite] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState(null);
  const [inviteToDelete, setInviteToDelete] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);


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

 
  // gestion des invités

  const invites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/invites`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const data = response.data.invites || [];
      console.log('Invités récupérées:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des Invités:', error);
      return [];
    }
  };

  // gestion des réunions

  const reunions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/reunions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const data = response.data.reunions || [];
      console.log('Réunions récupérées:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réunions:', error);
      return [];
    }
  };



  // Définir en haut du composant
  const fetchInvites = async () => {
    const data = await invites();
    setInvitesList(data);
    setFilteredInvites(data);
  };

  // Lancer une fois au chargement
  useEffect(() => {
    fetchInvites();
  }, [location.pathname]);

  
  useEffect(() => {
    const fetchReunions = async () => {
      const data = await reunions();
      setReunionsList(data);
    };
    fetchReunions();
  }, [location.pathname]);




  // Récupération du nom de l'utilisateur depuis le localStorage
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setNom(user.nom);
      setPrenom(user.prenom);
    }
  }, []);

  const handleSearch = () => {
    const filtered = invitesList.filter(
      (reunion) =>
        reunion.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reunion.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reunion.nomTable.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reunion.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reunion.inviteId.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredInvites(filtered);
  };

// Fonction pour supprimer un invité

  const handleDeleteInvite = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${apiUrl}/api/delete-invite/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    });

    await fetchInvites(); // Recharge la liste après suppression
    setSuccessMessage('Invité supprimée avec succès');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);

  } catch (err) {
    console.error(err);
    alert('Erreur suppression');
  }
};

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
      
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
            <div className="text-center md:text-left mb-4 md:mb-0">
              Salut <b>{nom + ' ' + prenom}</b>
              <p>Un mariage inoubliable vous attend 🎉​🎉​🎉​🎉​🎉​🎉​🎉​🎉</p>
            </div>
            <Link to="/ajout-invite" className="w-full md:w-auto">
              <Bouton
                width="w-full md:w-64"
                bg="bg-[#016CEC]"
                color="text-[#fff]"
                fontSize="text-[18px]"
              >
                Ajouté un invité
              </Bouton>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-4">
            <NextMeeting lastMeeting={reunionsList} className="w-full md:w-1/2" />
            <Graphe invites={invitesList} className="w-full md:w-1/2" />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 mt-8 p-4 gap-4">
            <button className="p-2">
              <img src={tri} alt="Trier" className="w-6 h-6" />
            </button>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <input
                type="text"
                className="border border-gray-200 rounded px-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="text-blue-500 font-bold border border-blue-500 rounded px-4 py-2 w-full md:w-auto"
                onClick={handleSearch}
              >
                Rechercher
              </button>
            </div>
          </div>
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
              {successMessage}
            </div>
          )}
          <div className="p-4">
            <Table
              handleDeleteInvite={(id) => {
                setInviteToDelete(id);
                setShowConfirmDelete(true);
              }}
              invites={filteredInvites}
              apiUrl={apiUrl}
              onEditInvite={(invite) => {
                setSelectedInvite(invite);
                setShowPopupUpdateInvite(true);
              }}
            />
          </div>

          <div className="text-center my-6 p-4">
            <Link to="/ajout-invite" className="w-full md:w-auto inline-block">
              <Bouton
                width="w-full md:w-64"
                bg="bg-[#016CEC]"
                color="text-[#fff]"
                fontSize="text-[18px]"
              >
                Ajouté un invité
              </Bouton>
            </Link>
          </div>
        </div>
          {/* ---- BLOGRIGHT (droite, desktop seulement) ---- */}
      <div className="hidden md:block md:w-64">
        <BlogRight />
      </div>
    </div>

      {showPopupUpdateInvite && selectedInvite && (
        <ModifierInvite
          invite={selectedInvite}
          onClose={() => {
            setShowPopupUpdateInvite(false);
            setSelectedInvite(null);
            fetchInvites(); // pour rafraîchir les données après modification
          }}
        />
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p className="mb-6">Es-tu sûr de vouloir supprimer cet invité ?</p>
            <div className="flex justify-around">
              <button
                onClick={() => {
                  handleDeleteInvite(inviteToDelete);
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

export default Dashboard;
