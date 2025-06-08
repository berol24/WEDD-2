
import { Link } from 'react-router-dom';
import NavLink from './../components/NavLink';
import Table from '../components/Table';
import myImage from '../assets/img/logo.png';
import { useState } from 'react';
import Graphe from '../components/Graphe';
import Bouton from '../components/Bouton';
import tri from '../assets/icons/tri.svg';
import NextMeeting from '../components/NextMeeting';
import BlogRight from '../components/BlogRight';
import { useEffect } from 'react';

function Dashboard() {
 
    const [invitesList, setInvitesList] = useState([]);

const apiUrl = import.meta.env.VITE_API_URL;
    

const invites = async () => {
  try {
    const token = localStorage.getItem("token"); // ou sessionStorage
    const response = await fetch(`${apiUrl}/invites`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include' // si besoin
    });

    if (!response.ok) {
      throw new Error('Erreur réseau');
    }

    const invites = await response.json();
    const data = invites.invites || []; // Assurez-vous que la structure de la réponse est correcte
    console.log('Invités récupérées:', data);
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des Invités:', error);
    return [];
  }
};




useEffect(() => {
  const fetchInvites = async () => {
    const data = await invites(); // <- la fonction définie plus haut
    setInvitesList(data);
  };

  fetchInvites();
}, []);

  return (
    <div className="flex justify-between w-full">
      <NavLink />
      <div>
        <div className="flex justify-between items-center p-4">
          <div>
            Salut <b>Marie Pierre</b>
            <p> Un mariage inoubliable vous attend  🎉​🎉​🎉​🎉​🎉​🎉​🎉​🎉</p>
          </div>

          <Link to="/ajout-invite"><Bouton
            width="w-64"
            bg="bg-[#016CEC]"
            color="text-[#fff]"
            fontSize="text-[18px]"
          > Ajouté un invité
          </Bouton></Link> 
        </div>
        <div className="flex justify-between items-center">
           <NextMeeting />
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
            />
            <button className="text-blue-500 font-bold border border-blue-500 rounded px-4 py-2 w-full sm:w-auto">
              Rechercher
            </button>
          </div>
        </div>
        <Table invites={invitesList} apiUrl={apiUrl} />
        <div className='text-center my-6'>
          <Link to="/ajout-invite"><Bouton
            width="w-64"
            bg="bg-[#016CEC]"
            color="text-[#fff]"
            fontSize="text-[18px]"
          >
            Ajouté un invité
          </Bouton></Link>
        </div>
      </div>
      <BlogRight />
    </div>
  );
}

export default Dashboard;
