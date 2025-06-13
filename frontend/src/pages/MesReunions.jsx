import React, { useEffect, useState } from 'react';
import AjoutReunion from './AjoutReunion'; // chemin à ajuster si nécessaire
import deleteIcon from '../assets/icons/deleteIcon.svg';
import edit from '../assets/icons/edit.svg';
import tri from '../assets/icons/tri.svg';
import ModifierReunion from './ModifierReunion';
import NavLink from '../components/NavLink';
import BlogRight from '../components/BlogRight';


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

  const apiUrl = import.meta.env.VITE_API_URL;

  const reunions = async () => {
    try {
      const token = localStorage.getItem('token'); // ou sessionStorage
      const response = await fetch(`${apiUrl}/api/reunions`, {
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
      const data = reunions.reunions || [];
      console.log('Réunions récupérées:', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réunions:', error);
      return [];
    }
  };

  // Définir en haut du composant
  const fetchReunions = async () => {
    const data = await reunions();
    setReunionsList(data);
    setFilteredReunions(data);
  };

  // Lancer une fois au chargement
  useEffect(() => {
    fetchReunions();
  }, []);

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
      const res = await fetch(`${apiUrl}/api/delete-reunion/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
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

  return (
    <>
      <div className="flex w-full min-h-screen">
        <NavLink />
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
        <BlogRight />
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
