
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

function Dashboard() {
  const mesInvites = [
    {
      id: 1,
      image: myImage,
      inviteId: 456987,
      nom: 'Amina',
      prenom: 'Daniel',
      telephone: '612589635',
      nomTable: 'Matthieu',
      status: 'A',
    },
    {
      id: 2,
      image: myImage,
      inviteId: 456988,
      nom: 'Jean',
      prenom: 'Paul',
      telephone: '612589636',
      nomTable: 'Marc',
      status: 'A',
    },
    {
      id: 3,
      image: myImage,
      inviteId: 456989,
      nom: 'Sophie',
      prenom: 'Laurent',
      telephone: '612589637',
      nomTable: 'Luc',
      status: 'P',
    },
    {
      id: 4,
      image: myImage,
      inviteId: 456990,
      nom: 'Karim',
      prenom: 'Nadia',
      telephone: '612589638',
      nomTable: 'Jean',
      status: 'A',
    },
    {
      id: 5,
      image: myImage,
      inviteId: 456991,
      nom: 'Fatima',
      prenom: 'Omar',
      telephone: '612589639',
      nomTable: 'Pierre',
      status: 'P',
    },
    {
      id: 6,
      image: myImage,
      inviteId: 456992,
      nom: 'Elise',
      prenom: 'David',
      telephone: '612589640',
      nomTable: 'Jacques',
      status: 'A',
    },
    {
      id: 7,
      image: myImage,
      inviteId: 456993,
      nom: 'Lucie',
      prenom: 'Bernard',
      telephone: '612589641',
      nomTable: 'Thomas',
      status: 'P',
    },
    {
      id: 8,
      image: myImage,
      inviteId: 456994,
      nom: 'Bruno',
      prenom: 'Claire',
      telephone: '612589642',
      nomTable: 'Philippe',
      status: 'A',
    },
    {
      id: 9,
      image: myImage,
      inviteId: 456995,
      nom: 'Nora',
      prenom: 'Samuel',
      telephone: '612589643',
      nomTable: 'André',
      status: 'P',
    },
    {
      id: 10,
      image: myImage,
      inviteId: 456996,
      nom: 'Julie',
      prenom: 'Martin',
      telephone: '612589644',
      nomTable: 'Simon',
      status: 'A',
    },
  ];
  const [invites, setInvites] = useState(mesInvites);

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
           <Graphe invites={invites} setInvites={setInvites} />
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
        <Table invites={invites} setInvites={setInvites} />
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
