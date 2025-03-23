  // import React, { useEffect, useState } from 'react';
  // import image_couple from '../assets/img/image_couple.jpg';
  // import logo from '../assets/img/logo.png';
  // import Input from '../components/Input';
  // import Image from '../components/Image';
  // import Title from '../components/Title';
  // import { useNavigate } from 'react-router-dom';


 

  // function Connexion() {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [error, setError] = useState('');
  //   const navigate = useNavigate();


  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError('');
  
  //     const token = localStorage.getItem('token'); // Récupérer le token existant s'il y en a un
  //    console.log(token);
  //     try {
  //       const response = await fetch('http://localhost:5000/login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           email,
  //           password,
  //           token, // Si le token existe déjà, l'envoyer avec la requête
  //         }),
  //       });
  
  //       const data = await response.json();
  
  //       if (response.ok) {
  //         if (data.token) {
  //           // Calculer l'expiration du token (par exemple 10 secondes après la connexion)
  //           const expiration = new Date().getTime() + (10 * 1000); // Remplacer '10' par la durée de ton choix (en secondes)
  
  //           // Stocker le token et l'utilisateur dans le localStorage
  //           localStorage.setItem('token', data.token);
  //           localStorage.setItem('tokenExpiration', expiration.toString()); // Enregistrer l'expiration
  //           localStorage.setItem('user', JSON.stringify(data.user));
  
  //           // Rediriger vers la page d'accueil ou dashboard
  //           navigate('/dashboard');
  //         }
  //       } else {
  //         // Afficher l'erreur envoyée par le backend
  //         setError(data.message || 'Identifiants incorrects');
  //       }
  //     } catch (err) {
  //       setError('Une erreur est survenue lors de la connexion');
  //     }
  //   };
  
  //   return (
  //     <div className="flex flex-col md:flex-row h-screen">
  //       <div className="w-full md:w-1/2 h-96 md:h-full">
  //         <Image
  //           src={image_couple}
  //           alt="image_couple"
  //           className="w-full h-full object-cover"
  //         />
  //       </div>
  //       <div className="flex w-full md:w-1/2 flex-col justify-center px-4 md:px-6 py-8 md:py-12 lg:px-8">
  //         <div className="mx-auto w-full max-w-sm text-center">
  //           <Image
  //             alt="Logo"
  //             src={logo}
  //             className="mx-auto h-40 md:h-60 w-auto"
  //           />
  //           <Title
  //             fontWeight="font-bold"
  //             fontSize="text-2xl"
  //             className="mt-6 md:mt-10 text-center  md:text-2xl  tracking-tight text-gray-900"
  //           >
  //             CONNEXION AU COMPTE
  //           </Title>
  //         </div>

  //         <div className="mt-8 md:mt-10 mx-auto w-full max-w-sm">
        
  //           {error && <div className="text-red-500 text-center mb-4 p-2 bg-red-100 rounded-md">{error}</div>}
  //           <form onSubmit={handleSubmit} className="space-y-6">
  //             <Input
  //               width="w-full"
  //               type="email"
  //               name="email"
  //               placeholder="Email"
  //               required={true}
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //             />

  //             <div>
  //               <Input
  //                 width="w-full"
  //                 type="password"
  //                 name="password"
  //                 placeholder="Mot de passe"
  //                 required={true}
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />

  //               <div className="mt-3 flex justify-end">
  //                 <div className="text-sm">
  //                   <a
  //                     href="#"
  //                     className="font-semibold text-[#016CEC] hover:underline underline-offset-8"
  //                   >
  //                     Mot de passe oublié?
  //                   </a>
  //                 </div>
  //               </div>
  //             </div>

  //             <div>
  //               <button
  //                 type="submit"
  //                 className="flex w-full justify-center rounded-md bg-[#016CEC] px-3 py-1.5 text-sm font-semibold text-white opacity-90 shadow-xs hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  //               >
  //                 Se connecter
  //               </button>
  //             </div>
  //           </form>

  //           <p className="mt-8 md:mt-10 text-center text-sm text-black">
  //             Vous n'avez pas de compte ?
  //             <a
  //               href="/register-page"
  //               className="font-semibold ml-1 text-[#016CEC] opacity-80 hover:opacity-100"
  //             >
  //               Créer un compte
  //             </a>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // export default Connexion;





  import React, { useEffect, useState } from 'react';
import image_couple from '../assets/img/image_couple.jpg';
import logo from '../assets/img/logo.png';
import Input from '../components/Input';
import Image from '../components/Image';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const expiration = new Date().getTime() + data.expiresIn;
  
        localStorage.setItem('token', data.token);
        localStorage.setItem('tokenExpiration', expiration.toString());
        localStorage.setItem('user', JSON.stringify(data.user));
  
        navigate('/dashboard');
  
        // Optionnel : Définir un timer pour déconnecter l'utilisateur après expiration
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          localStorage.removeItem('user');
          navigate('/login-page');
        }, data.expiresIn);
      } else {
        setError(data.message || 'Identifiants incorrects');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 h-96 md:h-full">
        <Image
          src={image_couple}
          alt="image_couple"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex w-full md:w-1/2 flex-col justify-center px-4 md:px-6 py-8 md:py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm text-center">
          <Image
            alt="Logo"
            src={logo}
            className="mx-auto h-40 md:h-60 w-auto"
          />
          <Title
            fontWeight="font-bold"
            fontSize="text-2xl"
            className="mt-6 md:mt-10 text-center  md:text-2xl  tracking-tight text-gray-900"
          >
            CONNEXION AU COMPTE
          </Title>
        </div>

        <div className="mt-8 md:mt-10 mx-auto w-full max-w-sm">
          {error && <div className="text-red-500 text-center mb-4 p-2 bg-red-100 rounded-md">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              width="w-full"
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <Input
                width="w-full"
                type="password"
                name="password"
                placeholder="Mot de passe"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="mt-3 flex justify-end">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-[#016CEC] hover:underline underline-offset-8"
                  >
                    Mot de passe oublié?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#016CEC] px-3 py-1.5 text-sm font-semibold text-white opacity-90 shadow-xs hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter
              </button>
            </div>
          </form>

          <p className="mt-8 md:mt-10 text-center text-sm text-black">
            Vous n'avez pas de compte ?
            <a
              href="/register-page"
              className="font-semibold ml-1 text-[#016CEC] opacity-80 hover:opacity-100"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
