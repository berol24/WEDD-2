import React from 'react'
import { useNavigate } from 'react-router-dom';

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
    <div>
    Bienvenue xscdvbfngbdbgf
      <div className="flex flex-col md:flex-row h-screen">
          {/* Ajouter le bouton de déconnexion */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Déconnexion
          </button></div>
    </div>
  )
}

export default Dashboard
