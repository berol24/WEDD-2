// import React from 'react';
// import { useEffect, useState } from 'react';
// import BlogRight from '../components/BlogRight';
// import NavLink from '../components/NavLink';
// import myImage from '../assets/img/logo.png';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// function ShowInvite() {
//   const { inviteId } = useParams();
//   const [invite, setInvite] = useState([]);
//   const [nom, setNom] = useState('');
//   const [prenom, setPrenom] = useState('');
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_URL;

 

//   const getInvite = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${apiUrl}/api/invites/${inviteId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       withCredentials: true,
//     });

//     const data = response.data.invite || [];
//     console.log('Invité récupéré:', data);
//     return data;
//   } catch (error) {
//     console.error("Erreur lors de la récupération de l'invité:", error);
//     return null;
//   }
// };


//   useEffect(() => {
//     const fetchInvite = async () => {
//       const data = await getInvite();
//       setInvite(data);
//     };

//     fetchInvite();
//   }, [inviteId]);

//   // Récupération du nom de l'utilisateur depuis le localStorage
//   useEffect(() => {
//     const userString = localStorage.getItem('user');
//     if (userString) {
//       const user = JSON.parse(userString);
//       setNom(user.nom);
//       setPrenom(user.prenom);
//     }
//   }, []);

//   // Fonction pour gérer le retour à la page de recherche
//   const handleRetour = () => {
//     navigate('/recherche-invite');
//   };

//   return (
//     <div className="flex h-full w-full">
//       <div className="hidden md:block">
//         <NavLink />
//       </div>
//       <div className="flex-1 bg-[#717171] flex items-center justify-center p-4 md:p-8 mt-4 md:-mt-40">
//         <div className="bg-white shadow-2xl p-6 md:p-10 rounded-2xl w-full max-w-md flex flex-col items-center text-center border border-pink-100">
//           <h1 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-pink-700 tracking-wide">
//             Bienvenue au Mariage de {nom} {prenom}
//           </h1>
//           <h2 className="text-lg md:text-xl font-medium mb-5 text-gray-700">
//             {invite.inviteId}
//           </h2>
//           <img
//             src={`${apiUrl}/uploads/${invite.image}`}
//             alt={invite.nom + ' ' + invite.prenom}
//             className="w-28 h-28 md:w-36 md:h-36 object-cover mb-6 rounded-full shadow-lg border-4 border-pink-100"
//           />
//           <div className="space-y-2">
//             <p className="text-gray-800 text-base md:text-lg font-semibold">
//               {invite.nom} {invite.prenom}
//             </p>
//             <p className="text-pink-700 text-base md:text-lg font-bold">{invite.nomTable}</p>
//           </div>

//           <button
//             onClick={handleRetour}
//             className="mt-6 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Retour à la recherche
//           </button>
//           <div className="mt-6">
//             <svg
//               className="mx-auto w-6 h-6 md:w-8 md:h-8 text-pink-200"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 21s-6-4.35-9-8.28C-1.35 7.73 2.5 3 7.5 3c2.54 0 4.04 1.54 4.5 2.09C12.46 4.54 13.96 3 16.5 3 21.5 3 25.35 7.73 21 12.72 18 16.65 12 21 12 21z" />
//             </svg>
//           </div>
//         </div>
//       </div>
//       <div className="hidden md:block">
//         <BlogRight />
//       </div>
//     </div>
//   );
// }

// export default ShowInvite;




































import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavLink from '../components/NavLink';
import BlogRight from '../components/BlogRight';

function ShowInvite() {
  const { inviteId } = useParams();
  const [invite, setInvite] = useState(null);
  const [error, setError] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

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

  return (
    // <div className="flex h-full w-full">
    //   <div className="hidden md:block">
    //     <NavLink />
    //   </div>

    //   <div className="flex-1 bg-[#717171] flex items-center justify-center p-4 md:p-8 mt-4 md:-mt-40">
    //     <div className="bg-white shadow-2xl p-6 md:p-10 rounded-2xl w-full max-w-md text-center border border-pink-100">

    //       {error ? (
    //         <div className="text-red-600 font-semibold text-lg">{error}</div>
    //       ) : invite ? (
    //                 <div className="bg-white shadow-2xl p-6 md:p-10 rounded-2xl w-full max-w-md flex flex-col items-center text-center border border-pink-100">

    //           <h1 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-pink-700 tracking-wide">
    //             Bienvenue au Mariage de {nom} {prenom}
    //           </h1>
    //           <h2 className="text-lg md:text-xl font-medium mb-5 text-gray-700">
    //             ID : {invite.inviteId}
    //           </h2>
    //           <img
    //             src={`${apiUrl}/uploads/${invite.image}`}
    //             alt={invite.nom + ' ' + invite.prenom}
    //             className="w-28 h-28 md:w-36 md:h-36 object-cover mb-6 rounded-full shadow-lg border-4 border-pink-100"
    //           />
    //           <p className="text-gray-800 text-base md:text-lg font-semibold">
    //             {invite.nom} {invite.prenom}
    //           </p>
    //           <p className="text-pink-700 text-base md:text-lg font-bold">{invite.nomTable}</p>

    //           <button
    //             onClick={handleRetour}
    //             className="mt-6 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //           >
    //             Retour à la recherche
    //           </button>
    //           <div className="mt-6">
    //             <svg
    //               className="mx-auto w-6 h-6 md:w-8 md:h-8 text-pink-200"
    //               fill="currentColor"
    //               viewBox="0 0 24 24"
    //             >
    //               <path d="M12 21s-6-4.35-9-8.28C-1.35 7.73 2.5 3 7.5 3c2.54 0 4.04 1.54 4.5 2.09C12.46 4.54 13.96 3 16.5 3 21.5 3 25.35 7.73 21 12.72 18 16.65 12 21 12 21z" />
    //             </svg>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="text-gray-600">Chargement...</div>
    //       )}
    //     </div>
    //   </div>

    //   <div className="hidden md:block">
    //     <BlogRight />
    //   </div>
    // </div>

    <div className="flex flex-col md:flex-row min-h-screen w-full">
  {/* Menu gauche (desktop uniquement) */}
  <div className="hidden md:block w-1/5">
    <NavLink />
  </div>

  {/* Contenu principal centré */}
  <div className="flex-1 flex items-center justify-center bg-[#717171] p-4 md:p-8">
    <div className="bg-white shadow-2xl p-6 md:p-10 rounded-2xl w-full max-w-md text-center border border-pink-100">
      {error ? (
        <div className="text-red-600 font-semibold text-lg">{error}</div>
      ) : invite ? (
        <>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-pink-700 tracking-wide">
            Bienvenue au Mariage de {nom} {prenom}
          </h1>
          <h2 className="text-lg md:text-xl font-medium mb-5 text-gray-700">
            ID : {invite.inviteId}
          </h2>
          <img
            src={`${apiUrl}/uploads/${invite.image}`}
            alt={invite.nom + ' ' + invite.prenom}
            className="w-28 h-28 md:w-36 md:h-36 object-cover mb-6 rounded-full shadow-lg border-4 border-pink-100"
          />
          <p className="text-gray-800 text-base md:text-lg font-semibold">
            {invite.nom} {invite.prenom}
          </p>
          <p className="text-pink-700 text-base md:text-lg font-bold">{invite.nomTable}</p>
          <button
            onClick={handleRetour}
            className="mt-6 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Retour à la recherche
          </button>
          <div className="mt-6">
            <svg
              className="mx-auto w-6 h-6 md:w-8 md:h-8 text-pink-200"
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

  {/* Blog droit (desktop uniquement) */}
  <div className="hidden md:block w-1/5">
    <BlogRight />
  </div>
</div>

  );
}

export default ShowInvite;
