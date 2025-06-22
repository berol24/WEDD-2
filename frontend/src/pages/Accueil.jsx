import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhoneAlt ,FaWhatsapp} from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

function Accueil() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <Link to="/">
            <img src={logo} alt="logo" className="h-32 w-32 sm:h-32 sm:w-32 rounded-full" />
          </Link>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <Link
            to="/login-page"
            className="text-sm sm:text-base text-gray-600 hover:text-[#016CEC] font-medium transition border border-[#016CEC] px-3 sm:px-4 py-2 rounded-lg"
          >
            Connexion
          </Link>
          <Link
            to="/register-page"
            className="text-sm sm:text-base bg-[#016CEC] hover:bg-[#0156c4] text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition"
          >
            Inscription
          </Link>
        </div>
      </header>

      <main
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center text-center px-4 sm:px-6 py-12 sm:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.8))`,
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#016CEC] mb-4 sm:mb-6">
          Plateforme de gestion de mariage
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mb-6 sm:mb-10 px-2">
          Générez des billets numériques personnalisés en PDF avec QR code unique, suivez les présences en temps réel et organisez facilement le plan de salle.
        </p>
      </main>

      <section className="bg-white py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 text-center">
          <div className="p-4">
            <FiCheckCircle className="mx-auto text-3xl sm:text-4xl text-gray-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Billets numériques dynamiques</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Chaque invité reçoit un billet PDF contenant son nom, statut et numéro de table.
            </p>
          </div>
          <div className="p-4">
            <FiCheckCircle className="mx-auto text-3xl sm:text-4xl text-gray-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">QR Code unique et scan rapide</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Gagnez du temps à l'entrée grâce à un scan de présence rapide et fiable.
            </p>
          </div>
          <div className="p-4">
            <FiCheckCircle className="mx-auto text-3xl sm:text-4xl text-gray-600 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Organisation du plan de salle</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Optimisez votre plan de table automatiquement selon les données d'invités.
            </p>
          </div>
        </div>
      </section>

   


<footer className="bg-white border-t border-gray-200 px-6 sm:px-12 py-5">
  <div className="w-full flex flex-col justify-between min-h-[180px]">

    <div className="flex flex-col sm:flex-row justify-between items-center w-full">
      {/* Ligne du bas : Logo + Copyright */}
      <div className="flex justify-center items-center gap-3 order-2 sm:order-1">
        <img src={logo} alt="logo" className="h-20 w-20 sm:h-32sm:w-32 rounded-full" />
        <span className="text-sm sm:text-base text-gray-700 font-semibold">WEDD © 2025</span>
      </div>

      {/* Ligne du haut : Email + Réseaux sociaux */}
      <div className="flex flex-col justify-center items-center gap-6 order-1 sm:order-2">
        {/* Email / Téléphone */}
        <div className="w-44 flex gap-6 justify-between text-gray-600 text-xl">
          <a href="#" aria-label="Email" className="hover:text-[#016CEC] transition">
            <FaEnvelope />
          </a>
          <a href="#" aria-label="Téléphone" className="hover:text-[#016CEC] transition">
            <FaPhoneAlt />
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="w-44 flex gap-6 justify-between text-gray-600 text-xl">
          <a href="#" aria-label="Facebook" className="hover:text-[#016CEC] transition">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-[#016CEC] transition">
            <FaInstagram />
          </a>
          <a href="#" aria-label="WhatsApp" className="hover:text-[#016CEC] transition">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>  </div>
</footer>

      
         </div>  );
}

export default Accueil;
