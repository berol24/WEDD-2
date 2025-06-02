import React from 'react'
import {  useNavigate } from 'react-router-dom';
import NavLink from './../components/NavLink';
import Notification from '../components/Notification';

function Dashboard() {
    const navigate = useNavigate();
      const handleLogout = () => {
        // Supprimer le token et les données utilisateur du localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Rediriger vers la page de connexion
        navigate('/login-page');
      };
  return (
      <div className='flex'> 
        <NavLink/>
        <div className="flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto py-4 px-4">
          
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
         
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia est beatae similique odio voluptatem doloribus harum quo. Alias illum reprehenderit sapiente fugit autem amet, quidem, enim nam minus non ipsam!
      
        </div>
        
        <Notification/>
        </div>
  )
}

export default Dashboard
