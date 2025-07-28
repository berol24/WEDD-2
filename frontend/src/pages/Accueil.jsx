import React from "react";
import HeroAccueil from "../components/HeroAccueil";
import HeaderAccueil from "../components/HeaderAccueil";
import FeaturesAccueil from "../components/FeaturesAccueil";
import AboutAccueil from "../components/AboutAccueil";
import Footer from "../components/Footer";

function Accueil() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAccueil />

      <HeroAccueil />

      <FeaturesAccueil />

      <AboutAccueil />

      <Footer />
    </div>  
  );
}

export default Accueil;
