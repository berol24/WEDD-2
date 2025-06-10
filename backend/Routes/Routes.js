const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { register, login, addReunion, allReunion, addInvite, allInvite, oneInvite } = require("../Controllers/Controllers");
const upload= require("../Routes/UploadImage.js"); // Importation du middleware multer pour l'upload d'images
const authenticate = require("../Routes/AuthMiddleware.js").default;

// Configuration CORS explicite
const corsOptions = {
origin: 'http://localhost:5173', // Origine autorisée (frontend)
  methods: ['POST', 'GET'], // Méthodes autorisées
  //allowedHeaders: ['Content-Type'] // En-têtes autorisés
  allowedHeaders: ['Content-Type', 'Authorization'], // <- très important ici
  credentials: true


};

router.use(cors(corsOptions));
router.use(express.json());

// Routes

router.post("/register", register);
router.post("/login", login);
router.post("/reunion", authenticate , addReunion)
router.get("/reunions", authenticate, allReunion);


router.post("/invite", authenticate, upload.single('image'), addInvite);
router.get("/invites", authenticate,allInvite);
router.get("/invites/:inviteId", authenticate, oneInvite)
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