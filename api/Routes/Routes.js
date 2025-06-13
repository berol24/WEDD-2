const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { register, login, addReunion, allReunion, addInvite, allInvite, oneInvite, editReunion, deleteReunion, editInvite, deleteInvite, user, editProfil, editPassword } = require("../Controllers/Controllers.js");
const upload= require("./UploadImage.js"); // Importation du middleware multer pour l'upload d'images
const authenticate = require("./AuthMiddleware.js").default;

// Configuration CORS explicite
const allowedOrigins = [
   process.env.FRONTEND_URL, // mets ici l’URL Vercel de ton frontend
  // "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    // autoriser les requêtes sans origin (comme curl ou Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

router.use(cors(corsOptions));
router.options('*', cors(corsOptions)); // obligatoire pour gérer les requêtes OPTIONS


router.use(express.json());

// Routes

router.post("/register", register);
router.post("/login", login);

// Route pour récupérer les informations de l'utilisateur connecté
router.get("/profil", authenticate,user);
router.put("/profil", authenticate,editProfil)
router.put("/profil-password", authenticate,editPassword )

// Routes pour les invitations
router.post("/invite", authenticate, upload.single('image'), addInvite);
router.get("/invites", authenticate,allInvite);
router.get("/invites/:inviteId", authenticate, oneInvite)
router.put("/edit-invite/:id", authenticate,upload.single('image'), editInvite);
router.delete('/delete-invite/:id', authenticate, deleteInvite);


//  Routes pour les reunions
router.post("/reunion", authenticate , addReunion)
router.get("/reunions", authenticate, allReunion);
router.put("/edit-reunion/:reunionId", authenticate, editReunion);
router.delete('/delete-reunion/:reunionId', authenticate, deleteReunion);


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