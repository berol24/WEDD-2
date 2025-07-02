  import React, { useEffect, useState } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import axios from 'axios';
  import NavLink from '../components/NavLink';
  import BlogRight from '../components/BlogRight';
  import { useLocation } from 'react-router-dom';
  import Salle from '../components/Salle';

  function ShowInvite() {
  
    const location = useLocation();
    const state = location.state;
    const message = state?.message || null;
    const color = state?.color || "green";
    const [invite, setInvite] = useState(state?.invite || null);
    const [error, setError] = useState('');
    const { inviteId } = useParams();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;



    //  Récupération de l'invité
    const getInvite = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/invites/${inviteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        const data = response.data.invite || null;
        setInvite(data);
      
      } catch (error) {
        console.error("Erreur lors de la récupération de l'invité:", error);
        if (error.response?.status === 403) {
          setError("⛔ Accès refusé : ce QR Code n'appartient pas à votre compte.");
        } else if (error.response?.status === 401) {
          setError("🔐 Veuillez vous connecter pour accéder à cette page.");
        } else {
          setError("❌ Une erreur est survenue.");
        }
      }
    };

    useEffect(() => {
      getInvite();
    }, [inviteId]);

    useEffect(() => {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setNom(user.nom);
        setPrenom(user.prenom);
      }
    }, []);

    const handleRetour = () => {
      navigate('/recherche-invite');
    };



  //////////////////////////////////////////

  const [clignoter, setClignoter] = useState(false);
  const [showSalle, setShowSalle] = useState(false);

     
    const nomsTables = [
     "Tulipe", "Lys", "Orchidée", "Matthieu",  "Jasmin", "Violette", "Iris", "Camélia",
      "Dahlia", "Magnolia", "Lavande", "Glycine", "Hortensia", "Azalée", "Fuchsia", "Anémone", "Bleuet",
      "Rose", "Lilas", "Marguerite", "Pensée", "Chrysanthème","Pivoine", "Jonquille", "Muguet", "Œillet", "Jacinthe",
      "Tournesol", "Gerbera", "Pétunia"
    ];

    // Fonction pour déclencher le clignotement
    const handleVoirTable = () => {
      setClignoter(true);
      setShowSalle(true);
    };

    // Callback pour arrêter le clignotement après animation
    const handleClignotementFini = () => {
      setClignoter(false);
    };



    return (
      <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#717171]">
        {/* Menu gauche */}
        <div className="hidden md:block w-1/5">
          <NavLink />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="bg-white shadow-2xl p-6 md:p-10 rounded-2xl w-full max-w-md text-center border border-pink-100">
            {error ? (
              <div className="text-red-600 font-semibold text-lg">{error}</div>
            ) : invite ? (
              <>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 text-pink-700 tracking-wide">
                  Bienvenue au Mariage de {nom} {prenom}
                </h1>

                <h2 className="text-base sm:text-lg md:text-xl font-medium mb-5 text-gray-700">
                  ID : {invite.inviteId}
                </h2>

                <img
                  src={`${apiUrl}/uploads/${invite.image}`}
                  alt={invite.nom + ' ' + invite.prenom}
                  className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover mb-6 rounded-full shadow-lg border-4 border-pink-100"
                />

                <p className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold">
                  {invite.nom} {invite.prenom}
                </p>
                <p className="text-pink-700 text-sm sm:text-base md:text-lg font-bold">
                  {invite.nomTable}
                </p>

      {message && (
    <div className="mt-4">
      <p className={`font-semibold text-sm sm:text-base md:text-lg ${color === "red" ? "text-red-600" : "text-green-600"}`}>
        {message}
      </p>
    </div>
  )}

            {invite?.nomTable && (
              <button
                onClick={handleVoirTable}
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
              >
                Voir Table
              </button>
            )}

        {showSalle && (
          <Salle
            nbTables={30}
            nbInvitesParTable={10}
            nomsTables={nomsTables}
            tableAClignoter={invite?.nomTable}
            clignoter={clignoter}
            onClignotementFini={handleClignotementFini}
          />
        )}


                <button
                  onClick={handleRetour}
                  className="mt-6 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Retour à la recherche
                </button>

                <div className="mt-6">
                  <svg
                    className="mx-auto w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21s-6-4.35-9-8.28C-1.35 7.73 2.5 3 7.5 3c2.54 0 4.04 1.54 4.5 2.09C12.46 4.54 13.96 3 16.5 3 21.5 3 25.35 7.73 21 12.72 18 16.65 12 21 12 21z" />
                  </svg>
                </div>
              </>
            ) : (
              <div className="text-gray-600">Chargement...</div>
            )}
          </div>
        </div>

        {/* Blog droit */}
        <div className="hidden md:block w-1/5">
          <BlogRight />
        </div>
      </div>
    );
  }

  export default ShowInvite;
