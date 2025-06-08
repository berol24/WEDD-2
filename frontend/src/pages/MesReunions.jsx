  import React, { useEffect , useState } from 'react';
  import AjoutReunion from './AjoutReunion'; // chemin à ajuster si nécessaire
  import deleteIcon from '../assets/icons/deleteIcon.svg';
  import edit from '../assets/icons/edit.svg';
  import tri from '../assets/icons/tri.svg';
  import ModifierReunion from './ModifierReunion';
  import NavLink from '../components/NavLink';
import BlogRight from '../components/BlogRight';

  function MesReunions() {
    const [reunionsList, setReunionsList] = useState([]);
    const [showPopupAjoutReunion, setShowPopupAjoutReunion] = useState(false);
    const [showPopupUpdateReunion, setShowPopupUpdateReunion] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    

const reunions = async () => {
  try {
    const token = localStorage.getItem("token"); // ou sessionStorage
    const response = await fetch(`${apiUrl}/reunions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include' // si besoin
    });

    if (!response.ok) {
      throw new Error('Erreur réseau');
    }

    const reunions = await response.json();
    const data = reunions.reunions || []; // Assurez-vous que la structure de la réponse est correcte
    console.log('Réunions récupérées:', data);
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des réunions:', error);
    return [];
  }
};

useEffect(() => {
  const fetchReunions = async () => {
    const data = await reunions(); // <- la fonction définie plus haut
    setReunionsList(data);
  };

  fetchReunions();
}, []);

    return (   
     <div className='flex w-full min-h-screen'> 
          <NavLink/>
      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mt-10 sm:mt-20 mb-10 sm:mb-20 text-center">
          Gestion des différentes réunions
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 mt-8">
          <button className="p-2 mb-4 sm:mb-0">
            <img src={tri} alt="Trier" className="w-6 h-6" />
          </button>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input type="text" className="border border-gray-200 rounded px-4 py-2 w-full sm:w-auto" />
            <button className="text-blue-500 font-bold border border-blue-500 rounded px-4 py-2 w-full sm:w-auto">
              Rechercher
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
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
              {reunionsList && reunionsList.length > 0 ? (
                reunionsList.map((reunion) => (
                  <tr key={reunion._id}>
                    <td className="px-4 py-2 border-b text-center">{reunion.titre}</td>
                    <td className="px-4 py-2 border-b text-center">{new Date(reunion.dateHeure).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border-b text-center">{new Date(reunion.dateHeure).toLocaleTimeString()}</td>
                    <td className="px-4 py-2 border-b text-center">{reunion.lieu}</td> 
                    <td className="px-4 py-2 border-b text-center">
                      <button onClick={() => setShowPopupUpdateReunion(true)} className="px-2">
                        <img src={edit} alt="Editer" className="w-5 h-5" />
                      </button>
                      <button className="px-2">
                        <img src={deleteIcon} alt="Supprimer" className="w-5 h-5" />
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
        </div>        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowPopupAjoutReunion(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter une réunion
          </button>
        </div>

        {showPopupAjoutReunion && <AjoutReunion onClose={() => setShowPopupAjoutReunion(false)} />}
    
        {showPopupUpdateReunion && <ModifierReunion onClose={() => setShowPopupUpdateReunion(false)} />}

      </div> 
        <BlogRight/>
      </div>
    );
  }

  export default MesReunions;
