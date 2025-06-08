import React from 'react'
import { useState } from 'react'
import home from '../assets/icons/home.svg'
import edit from '../assets/icons/edit.svg'
import invite from '../assets/icons/invite.svg'
import reunion from '../assets/icons/reunion.svg'
import help from '../assets/img/help.svg'
import search from '../assets/icons/search.png'
import { Link } from 'react-router-dom'
import Image from './Image'
function NavLink() {
  const [activeLink, setActiveLink] = useState('dashboard')

  return (
    <div className="w-64 flex flex-col gap-4 border border-gray-300">
      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'dashboard' ? 'opacity-50' : ''}`}>
        <span className="text-gray-900 mr-6">
          <img src={home} alt="home" className={activeLink === 'dashboard' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
        <Link to="/dashboard" className={`font-semibold ${activeLink === 'dashboard' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('dashboard')}>
          Dashboard
        </Link>
      </div>

      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'reunions' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6">
          <img src={reunion} alt="reunion" className={activeLink === 'reunions' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
        <Link to='/liste-reunions'  className={`${activeLink === 'reunions' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('reunions')}>
          Réunions
        </Link>
      </div>

      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'invite' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6">
          <img src={invite} alt="invite" className={activeLink === 'invite' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
         {/* <Link to="/ajout-invite" onClick={() => setActiveLink('invite'); setShowPopupAjoutInvite(true)} className={`${activeLink === 'invite' ? 'text-gray-900' : 'text-gray-700'}`} >
          Ajouter un invité
        </Link> */}
        <Link  to="/ajout-invite" className={`${activeLink === 'invite' ? 'text-gray-900' : 'text-gray-700'}`}
>
  Ajouter un invité
</Link>

      </div>

      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'profil' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6">
          <img src={edit} alt="profil" className={activeLink === 'profil' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
        <Link to="/profile-page" className={`${activeLink === 'profil' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('profil')}>
          Profil
        </Link>
      </div>

      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'recherche-invite' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6 w-10 h-10">
          <img src={search} alt="recherche-invite" className={activeLink === 'recherche-invite' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
        <Link to="/recherche-invite" className={`${activeLink === 'recherche-invite' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('recherche-invite')}>
          Recherche invité
        </Link>
      </div>


<div className={`flex m-8 items-center gap-4 ${activeLink !== 'recherche-invite' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6 w-10 h-10">
          {/* <img src={search} alt="recherche-invite" className={activeLink === 'recherche-invite' ? 'text-gray-900' : 'text-gray-500'} /> */}
        </span>
        <Link to="/login-page" className={`${activeLink === 'login-page' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('login-page')}>
          Connexion
        </Link>
      </div>

      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'recherche-invite' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6 w-10 h-10">
          {/* <img src={search} alt="recherche-invite" className={activeLink === 'recherche-invite' ? 'text-gray-900' : 'text-gray-500'} /> */}
        </span>
        <Link to="/register-page" className={`${activeLink === 'register-page' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('register-page')}>
          Inscription
        </Link>
      </div>

      <div className='d-flex flex-col m-8 items-center'>
        <Image src={help} className=" w-56" />
        <a href="/help-page" className=' underline underline-offset-8 '>Avez vous besoin d'aide ?</a>
      </div>

    </div>
  )
}

export default NavLink