
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User from "../Models/User.js";
import Reunion from '../Models/Reunion.js';
import Invite from '../Models/Invite.js';



const register = async (req, res) => {
    const { nom, prenom, email, telephone, password, confirmPassword, dateMariage, lieuMariage, couleurSite, themeMariage } = req.body;

    console.log("Donnees", req.body);

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Les mots de passe ne correspondent pas",
                type: "danger"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            nom,
            prenom,
            email,
            telephone,
            password: hashedPassword,
            dateMariage,
            lieuMariage,
            couleurSite,
            themeMariage
        });

        await user.save();
        console.log("Utilisateur enregistré :", user);
        res.status(201).json({
            message: "Utilisateur créé avec succès!",
            type: "success",
            user
        });
    } catch (err) {
        console.error("Erreur lors de l'enregistrement :", err);
        res.status(400).json({
            message: err.message,
            type: "danger"
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body; // Ne prendre que l'email et le mot de passe ici

    try {
        // Vérification si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email ou mot de passe incorrect",
                type: "danger"
            });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Email ou mot de passe incorrect",
                type: "danger"
            });
        }

        // Création d'un token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h'} // Le token expire après 10 secondes
        );
       console.log("Token généré :", token);
        // Envoi du token et des informations utilisateur
        res.status(200).json({
            message: "Connexion réussie!",
            type: "success",
            token, // Envoi du nouveau token
            expiresIn: 24 * 60 * 60 * 1000, // Durée de validité du token en millisecondes
            user: {
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                telephone: user.telephone,
                dateMariage: user.dateMariage,
                lieuMariage: user.lieuMariage,
                couleurSite: user.couleurSite,
                themeMariage: user.themeMariage
            }
        });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).json({
            message: "Erreur lors de la connexion",
            type: "danger"
        });
    }
}

const addReunion = async (req, res) => {
    const { titre, dateHeure, lieu } = req.body;

    try {
        // Vérification des données
        if (!titre || !dateHeure || !lieu) {
            return res.status(400).json({
                message: "Tous les champs sont requis",
                type: "danger"
            });
        }

        // Création de la réunion
        const newReunion = new Reunion({
            titre,
            dateHeure,
            lieu,
            userId: req.user._id // Assurez-vous que l'utilisateur est authentifié et que req.user est défini
            
        })


        await newReunion.save();
        console.log("Réunion enregistrée :", newReunion);
        res.status(201).json({
            message: "Réunion créée avec succès!",
            type: "success",
            reunion: newReunion
        });

}catch (err) {
        console.error("Erreur lors de l'enregistrement :", err);
        res.status(400).json({
            message: err.message,
            type: "danger"
        });
    }
}

const allReunion = async (req, res) => {
    try {
        const reunions = await Reunion.find({ userId: req.user._id }); // Récupérer les réunions de l'utilisateur connecté
        res.status(200).json({
            message: "Réunions récupérées avec succès",
            type: "success",
            reunions
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des réunions :", err);
        res.status(500).json({
            message: "Erreur lors de la récupération des réunions",
            type: "danger"
        });
    }
}


const addInvite = async (req, res) => {
    const { nom, prenom, telephone, nomTable, status } = req.body;
    console.log("Données de l'invité :", req.body);
    try {
        if (!nom || !prenom || !telephone) {
            return res.status(400).json({
                message: "Tous les champs sont requis",
                type: "danger"
            });
        }

        const newInvite = new Invite({
            nom,
            prenom,
            telephone,
            nomTable,
            status,
            image: req.file ? req.file.filename : null,
            userId: req.user._id
        });

        await newInvite.save();
        res.status(201).json({
            message: "Invité ajouté avec succès!",
            type: "success",
            invite: newInvite
        });

    } catch (err) {
        console.error("Erreur lors de l'enregistrement :", err);
        res.status(400).json({
            message: err.message,
            type: "danger"
        });
    }
};
       
const allInvite = async (req, res) => {
    try {
        const invites = await Invite.find({ userId: req.user._id }); // Récupérer les invités de l'utilisateur connecté
        res.status(200).json({
            message: "Invités récupérés avec succès",
            type: "success",
            invites
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des invités :", err);
        res.status(500).json({
            message: "Erreur lors de la récupération des invités",
            type: "danger"
        });
    }
}

export {
    register,
    login,
    addReunion,
    allReunion,
    addInvite,
    allInvite
};