import React from 'react'
import { useEffect, useState } from 'react';
import BlogRight from '../components/BlogRight'
import NavLink from '../components/NavLink'
import myImage from '../assets/img/logo.png';
import { useNavigate, useParams } from 'react-router-dom';
function ShowInvite() {
    const { inviteId } = useParams();
    const [invite, setInvite] = useState([]);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL ;

    const getInvite = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${apiUrl}/invites/${inviteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erreur réseau');
            }

            const invite = await response.json();
            const data = invite.invite || [];
            console.log('Invité récupéré:', data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'invité:', error);
            return null;
        }
    };
 
   
 useEffect(() => {
            const fetchInvite = async () => {
                const data = await getInvite();
                setInvite(data);
            };
            
            fetchInvite();
        }, [inviteId]);
    
 // Récupération du nom de l'utilisateur depuis le localStorage
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setNom(user.nom);
            setPrenom(user.prenom);
        }
    }, []);

    // Fonction pour gérer le retour à la page de recherche
    const handleRetour = () => {
    navigate('/recherche-invite'); 
  };

  return (
      <div className="flex h-full w-full">
      <NavLink />
   <div className="flex-1 bg-[#717171] flex items-center justify-center p-8 -mt-40">
      <div className="bg-white shadow-2xl p-10 rounded-2xl w-full max-w-md flex flex-col items-center text-center border border-pink-100">
        <h1 className="text-3xl font-serif font-bold mb-3 text-pink-700 tracking-wide">
          Bienvenue au Mariage de {nom} {prenom}
        </h1>
        <h2 className="text-xl font-medium mb-5 text-gray-700">{invite.inviteId}</h2>
        <img
          src={`${apiUrl}/uploads/${invite.image}`}
          alt={invite.nom + ' ' + invite.prenom}
          className="w-36 h-36 object-cover mb-6 rounded-full shadow-lg border-4 border-pink-100"
        />
        <div className="space-y-2">
          <p className="text-gray-800 text-lg font-semibold">
            {invite.nom} {invite.prenom}
          </p>
          <p className="text-pink-700 text-lg font-bold">{invite.nomTable}</p>
        </div>
      
        <button
          onClick={handleRetour}
          className="mt-6 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Retour à la recherche
        </button>
        {/* Optionnel : motif floral ou icône de cœur en bas */}
        <div className="mt-6">
          <svg
            className="mx-auto w-8 h-8 text-pink-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21s-6-4.35-9-8.28C-1.35 7.73 2.5 3 7.5 3c2.54 0 4.04 1.54 4.5 2.09C12.46 4.54 13.96 3 16.5 3 21.5 3 25.35 7.73 21 12.72 18 16.65 12 21 12 21z" />
          </svg>
        </div>
      </div>
    </div>
      <BlogRight/>
    </div>
  )
}

export default ShowInvite
