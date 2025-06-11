import { Link } from 'react-router-dom';
import NavLink from './../components/NavLink';
import Table from '../components/Table';
import myImage from '../assets/img/logo.png';
import { useState, useEffect } from 'react';
import Graphe from '../components/Graphe';
import Bouton from '../components/Bouton';
import tri from '../assets/icons/tri.svg';
import NextMeeting from '../components/NextMeeting';
import BlogRight from '../components/BlogRight';
import ModifierInvite from './ModifierInvite';

function Dashboard() {
    const [invitesList, setInvitesList] = useState([]);
    const [reunionsList, setReunionsList] = useState([]);
    const [filteredInvites, setFilteredInvites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [nom, setNom] = useState('');
     const [prenom, setPrenom] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
    
     const apiUrl = import.meta.env.VITE_API_URL;
    
// States à ajouter tout en haut du composant Dashboard
const [showPopupUpdateInvite, setShowPopupUpdateInvite] = useState(false);
const [selectedInvite, setSelectedInvite] = useState(null);
const [inviteToDelete, setInviteToDelete] = useState(null);
const [showConfirmDelete, setShowConfirmDelete] = useState(false);


    // gestions des invités
    const invites = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${apiUrl}/invites`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erreur réseau');
            }

            const invites = await response.json();
            const data = invites.invites || [];
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
            const token = localStorage.getItem("token");
            const response = await fetch(`${apiUrl}/reunions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erreur réseau');
            }

            const reunions = await response.json();
            const data = reunions.reunions || [];
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
      }, []);

    useEffect(() => {
        const fetchReunions = async () => {
            const data = await reunions();
            setReunionsList(data);
        };
        fetchReunions();
    }, []);

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
        const filtered = invitesList.filter(reunion =>
            reunion.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reunion.prenom.toLowerCase().includes(searchTerm.toLowerCase())||
            reunion.nomTable.toLowerCase().includes(searchTerm.toLowerCase())||
            reunion.telephone.toLowerCase().includes(searchTerm.toLowerCase())||
            reunion.inviteId.toLowerCase().includes(searchTerm.toLowerCase())
            
        );
        setFilteredInvites(filtered);
    };



    ///////////////////////////////
      const handleDeleteInvite = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/delete-invite/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        await fetchInvites(); // Recharge la liste après suppression
        setSuccessMessage('Invité supprimée avec succès');
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

    return (<>
        <div className="flex justify-between w-full">
            <NavLink />
            <div>
                <div className="flex justify-between items-center p-4">
                    <div>
                        Salut <b>{nom + " " + prenom}</b>
                        <p>Un mariage inoubliable vous attend  🎉​🎉​🎉​🎉​🎉​🎉​🎉​🎉</p>
                    </div>
                    <Link to="/ajout-invite">
                        <Bouton
                            width="w-64"
                            bg="bg-[#016CEC]"
                            color="text-[#fff]"
                            fontSize="text-[18px]"
                        >
                            Ajouté un invité
                        </Bouton>
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <NextMeeting lastMeeting={reunionsList} />
                    <Graphe invites={invitesList} />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 mt-8">
                    <button className="p-2 mb-4 sm:mb-0">
                        <img src={tri} alt="Trier" className="w-6 h-6" />
                    </button>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <input
                            type="text"
                            className="border border-gray-200 rounded px-4 py-2 w-full sm:w-auto"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <button 
                            className="text-blue-500 font-bold border border-blue-500 rounded px-4 py-2 w-full sm:w-auto"
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
                {/* <Table handleDeleteInvite={handleDeleteInvite} invites={filteredInvites} apiUrl={apiUrl} /> */}
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

                <div className='text-center my-6'>
                    <Link to="/ajout-invite">
                        <Bouton
                            width="w-64"
                            bg="bg-[#016CEC]"
                            color="text-[#fff]"
                            fontSize="text-[18px]"
                        >
                            Ajouté un invité
                        </Bouton>
                    </Link>
                </div>
            </div>
            <BlogRight />
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
      <p className="mb-6">
        Es-tu sûr de vouloir supprimer cet invité ?
      </p>
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
