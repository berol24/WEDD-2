import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import NavLink from '../components/NavLink';
import BlogRight from '../components/BlogRight';
import logo from "../assets/img/logo.png"
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Informations() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [isPasswordSuccess, setIsPasswordSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateMariage: '',
    lieuMariage: '',
    couleurSite: '',
    themeMariage: '',
    newPassword: '',
    confirmPassword: '',
  });

  const apiUrl = import.meta.env.VITE_API_URL;

const handleEditClick = async () => {
  if (!isEditing) {
    setIsEditing(true);
  } else {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${apiUrl}/api/profil`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedUser = response.data;

      setFormData((prev) => ({
        ...prev,
        ...updatedUser.user,
      }));
      setIsEditing(false);
      setIsEditSuccess('Profil mis à jour avec succès');
      window.location.reload(); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  }
};



const handleEditPasswordClick = async () => {
  if (!isEditingPassword) {
    setIsEditingPassword(true);
  } else {
    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      alert('Tous les champs sont requis.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${apiUrl}/api/profil-password`,
        {
          newPassword,
          confirmNewPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data;

      setIsPasswordSuccess(result.message || 'Mot de passe mis à jour avec succès');
      setIsEditingPassword(false);
      setFormData((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error);
      alert(error.response?.data?.message || 'Erreur serveur inconnue');
    }
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



const getUser = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${apiUrl}/api/profil`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('User data fetched:', response.data.user);
    
    return response.data.user || {};
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des infos utilisateur :',
      error
    );
    return {};
  }
};

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (isEditSuccess) {
      const timer = setTimeout(() => {
        setIsEditSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isEditSuccess]);

  useEffect(() => {
    if (isPasswordSuccess) {
      const timer = setTimeout(() => {
        setIsPasswordSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPasswordSuccess]);


const handleLogout = async () => {
    try {
      // Supprimer le token (localStorage ou sessionStorage selon ton app)
      localStorage.removeItem('token');

      // Appel de l'API de déconnexion (pas strictement nécessaire, mais bon pour les logs côté serveur)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Redirection vers la page de connexion
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert("Erreur lors de la déconnexion");
    }
  }

  return (
  <div className="flex flex-col md:flex-row min-h-screen">

    {/* Mobile Navigation */}
  <div className="hidden md:block md:w-64">
          <NavLink />
        </div>

        {/* ---- MOBILE HEADER + NAVIGATION ---- */}
        <header className="bg-gray-100 text-white w-full p-4 flex justify-between items-center md:hidden">
          <img src={logo} className="h-16 rounded-full" alt="logo-wedd" />
          <button
            className="py-2 px-4 rounded-md bg-blue-700 hover:bg-blue-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
          ☰
          </button>
        </header>

        {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav 
            className="bg-gray-200 text-dark flex flex-col gap-4 p-4 w-full md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Dashboard</Link>
            <Link to="/liste-reunions" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Réunions</Link>
            <Link to="/ajout-invite" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Ajouter un invité</Link>
            <Link to="/recherche-invite" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Recherche invité</Link>
            <Link to="/profil" onClick={() => setMenuOpen(false)} className="hover:text-blue-200 transition-colors">Profil</Link>
            <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="text-red-700 hover:text-red-700 text-left transition-colors">
              Déconnexion
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
      

      <div className="flex flex-col items-center  min-h-screen max-w-4xl mx-auto py-4 px-4 mt-20">
        <h1 className="text-2xl font-bold mb-6">
          Mes informations personnelles
        </h1>

        {isEditSuccess && (
          <div
            className="w-full text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">Profil modifié avec succès!</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
            <label>Nom</label>
            <Input
              width="w-full"
              type="text"
              name="nom"
              placeholder="Votre nom"
              required={true}
              value={formData.nom}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <label>Prénom</label>
            <Input
              width="w-full"
              type="text"
              name="prenom"
              placeholder="Votre prénom"
              required={true}
              value={formData.prenom}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
            <label>Email</label>
            <Input
              width="w-full"
              type="email"
              name="email"
              placeholder="Votre email"
              required={true}
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <label>Numéro de téléphone</label>
            <Input
              width="w-full"
              type="tel"
              name="telephone"
              placeholder="Votre numéro de téléphone"
              required={true}
              value={formData.telephone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
            <label>Date de mariage</label>
            <Input
              width="w-full"
              type="date"
              name="dateMariage"
              required={true}
              value={
                formData.dateMariage
                  ? new Date(formData.dateMariage).toISOString().split('T')[0]
                  : ''
              }
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <label>Lieu de mariage</label>
            <Input
              width="w-full"
              type="text"
              name="lieuMariage"
              placeholder="Lieu du mariage"
              required={true}
              value={formData.lieuMariage}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full mb-4">
          <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
            <label>Couleur du site</label>
            <Input
              width="w-full"
              type="color"
              name="couleurSite"
              required={true}
              value={formData.couleurSite}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <label>Thème du mariage</label>
            <Input
              width="w-full"
              type="text"
              name="themeMariage"
              placeholder="Thème du mariage"
              required={true}
              value={formData.themeMariage}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="mt-4 w-full">
          <div className="flex justify-center">
            <button
              onClick={handleEditClick}
              className={`${isEditing ? 'bg-[#11B141] hover:bg-[#0E9E39]' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded w-64`}
            >
              {isEditing ? 'Enregistrer' : 'Modifier mon profil'}
            </button>
          </div>

          <div className="mt-4">
            {isPasswordSuccess && (
              <div
                className="w-full text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">
                  Mot de passe modifié avec succès!
                </span>
              </div>
            )}
            <div className="flex flex-col md:flex-row w-full mb-4">
              <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
                <label>Nouveau mot de passe</label>
                <div className="relative">
                  <Input
                    width="w-full"
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    placeholder="*****"
                    required={true}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    disabled={!isEditingPassword}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <label>Confirmer le mot de passe</label>
                <div className="relative">
                  <Input
                    width="w-full"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="*****"
                    required={true}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={!isEditingPassword}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleEditPasswordClick}
                className={`${isEditingPassword ? 'bg-[#11B141] hover:bg-[#0E9E39]' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded w-64`}
              >
                {isEditingPassword
                  ? 'Enregistrer mot de passe'
                  : 'Modifier mon mot de passe'}
              </button>
            </div>
          </div>
        </div>
      </div>
  {/* ---- BLOGRIGHT (droite, desktop seulement) ---- */}
      <div className="hidden md:block md:w-80">
        <BlogRight />
      </div>    </div>
  );
}

export default Informations;
