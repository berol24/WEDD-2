const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { register, login } = require("../Controllers/Controllers");

// Configuration CORS explicite
const corsOptions = {
  origin: ['https://wedd-mocha-beta.vercel.app', 'http://localhost:5173'], // Origines autorisées (frontend)  methods: ['POST', 'GET'], // Méthodes autorisées
  allowedHeaders: ['Content-Type'] // En-têtes autorisés
};

router.use(cors(corsOptions));
router.use(express.json());

// Routes

router.post("/register", register);
router.post("/login", login);


// Route de déconnexion
router.post('/logout', (req, res) => {
    try {
        // Comme nous utilisons JWT, il n'y a pas besoin de session à détruire côté serveur
        // Le client doit simplement supprimer le token de son stockage
        
        res.status(200).json({
            message: "Déconnexion réussie!",
            type: "success"
        });
    } catch (err) {
        console.error("Erreur lors de la déconnexion :", err);
        res.status(500).json({
            message: "Erreur lors de la déconnexion",
            type: "danger"
        });
    }
});


module.exports = router;