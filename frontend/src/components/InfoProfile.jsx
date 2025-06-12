import React, { useEffect, useState } from 'react';
import Image from './Image';
import emoji from '../assets/img/emoji.svg';
import Bouton from './Bouton';
import { Link } from 'react-router-dom';

function InfoProfile() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    

 // Récupération du nom de l'utilisateur depuis le localStorage
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setNom(user.nom);
            setPrenom(user.prenom);
        }
    }, []);

  return (
    <div className="max-w-[300px] border-2 border-black-700 ">
      <div className="max-w-[100px] border-2 border-black-700 rounded-full p-2 d-flex items-center justify-center text-center m-auto">
        <Image src={emoji} className="w-20 h-20 rounded-full" />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold">{nom + " " + prenom}</h1>
        <Link to="/profil" className='mt-4'>
          <Bouton  width="w-20" height="h-16" bg="bg-[#016CEC]" color="text-[#fff]"  >Profile</Bouton>
        </Link>      </div>
    </div>
  );
}

export default InfoProfile;
