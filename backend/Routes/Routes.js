const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
// const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register, login,logout, addReunion, allReunion, addInvite, allInvite, oneInvite, editReunion, deleteReunion, editInvite, deleteInvite, user, editProfil, editPassword, presence } = require("../Controllers/Controllers.js");
const upload= require("./UploadImage.js"); // Importation du middleware multer pour l'upload d'images
const authenticate = require("./AuthMiddleware.js").default;

// router.use(cors({ origin: 'http://localhost:5173', credentials: true }));

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

// presence invité 

router.post('/invites/:inviteId/presence', authenticate, presence);

//  Routes pour les reunions
router.post("/reunion", authenticate , addReunion)
router.get("/reunions", authenticate, allReunion);
router.put("/edit-reunion/:reunionId", authenticate, editReunion);
router.delete('/delete-reunion/:reunionId', authenticate, deleteReunion);


// Route de déconnexion
router.post('/logout', logout);



module.exports = router;