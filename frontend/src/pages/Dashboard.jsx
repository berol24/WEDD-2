import { Link } from 'react-router-dom';
import NavLink from './../components/NavLink';
import Table from '../components/Table';
import myImage from '../assets/img/logo.png';
import { useState, useEffect } from 'react';
import Graphe from '../components/Graphe';
import Bouton from '../components/Bouton';
import tri from '../assets/icons/tri.svg';
import NextMeeting from '../components/NextMeeting';
import BlogRight from '../components/BlogRight';

function Dashboard() {
    const [invitesList, setInvitesList] = useState([]);
    const [reunionsList, setReunionsList] = useState([]);
    const [filteredInvites, setFilteredInvites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [nom, setNom] = useState('');
     const [prenom, setPrenom] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;
    
    // gestions des invités
    const invites = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${apiUrl}/invites`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erreur réseau');
            }

            const invites = await response.json();
            const data = invites.invites || [];
            console.log('Invités récupérées:', data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des Invités:', error);
            return [];
        }
    };

    // gestion des réunions 
    const reunions = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${apiUrl}/reunions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erreur réseau');
            }

            const reunions = await response.json();
            const data = reunions.reunions || [];
            console.log('Réunions récupérées:', data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des réunions:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchInvites = async () => {
            const data = await invites();
            setInvitesList(data);
            setFilteredInvites(data);
        };
        fetchInvites();
    }, []);

    useEffect(() => {
        const fetchReunions = async () => {
            const data = await reunions();
            setReunionsList(data);
        };
        fetchReunions();
    }, []);

    // Récupération du nom de l'utilisateur depuis le localStorage
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setNom(user.nom);
            setPrenom(user.prenom);
        }
    }, []);

    const handleSearch = () => {
        const filtered = invitesList.filter(reunion =>
            reunion.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reunion.prenom.toLowerCase().includes(searchTerm.toLowerCase())||
            reunion.nomTable.toLowerCase().includes(searchTerm.toLowerCase())||
            reunion.telephone.toLowerCase().includes(searchTerm.toLowerCase())||
            reunion.inviteId.toLowerCase().includes(searchTerm.toLowerCase())
            
        );
        setFilteredInvites(filtered);
    };

    return (
        <div className="flex justify-between w-full">
            <NavLink />
            <div>
                <div className="flex justify-between items-center p-4">
                    <div>
                        Salut <b>{nom + " " + prenom}</b>
                        <p>Un mariage inoubliable vous attend  🎉​🎉​🎉​🎉​🎉​🎉​🎉​🎉</p>
                    </div>
                    <Link to="/ajout-invite">
                        <Bouton
                            width="w-64"
                            bg="bg-[#016CEC]"
                            color="text-[#fff]"
                            fontSize="text-[18px]"
                        >
                            Ajouté un invité
                        </Bouton>
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <NextMeeting lastMeeting={reunionsList} />
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
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <button 
                            className="text-blue-500 font-bold border border-blue-500 rounded px-4 py-2 w-full sm:w-auto"
                            onClick={handleSearch}
                        >
                            Rechercher
                        </button>
                    </div>
                </div>
                <Table invites={filteredInvites} apiUrl={apiUrl} />
                <div className='text-center my-6'>
                    <Link to="/ajout-invite">
                        <Bouton
                            width="w-64"
                            bg="bg-[#016CEC]"
                            color="text-[#fff]"
                            fontSize="text-[18px]"
                        >
                            Ajouté un invité
                        </Bouton>
                    </Link>
                </div>
            </div>
            <BlogRight />
        </div>
    );
}

export default Dashboard;
