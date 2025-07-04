
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  User from "../Models/User.js";
import Reunion from '../Models/Reunion.js';
import Invite from '../Models/Invite.js';



const register = async (req, res) => {
    const { nom, prenom, email, telephone, password, confirmPassword, dateMariage, lieuMariage, couleurSite, themeMariage } = req.body;

    // console.log("Donnees", req.body);

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
        // console.log("Utilisateur enregistré :", user);
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
            { expiresIn: '24h'} // Le token expire après 24h 
        );
      //  console.log("Token généré :", token);
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

const user = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "Utilisateur non trouvé",
                type: "danger"
            });
        }
        res.status(200).json({
            message: "Informations utilisateur récupérées avec succès",
            type: "success",
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
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        res.status(500).json({
            message: "Erreur serveur",
            type: "danger"
        });
    }
}


const editProfil = async (req, res) => {
    const { nom, prenom, email, telephone, dateMariage, lieuMariage, couleurSite, themeMariage } = req.body;

    try {
        // Vérification des données
        if (!nom || !prenom || !email || !telephone) {
            return res.status(400).json({
                message: "Tous les champs sont requis",
                type: "danger"
            });
        }

        // Mise à jour de l'utilisateur
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { nom, prenom, email, telephone, dateMariage, lieuMariage, couleurSite, themeMariage },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "Utilisateur non trouvé",
                type: "danger"
            });
        }

        res.status(200).json({
            message: "Profil mis à jour avec succès!",
            type: "success",
            user: updatedUser
        });

    } catch (err) {
        console.error("Erreur lors de la mise à jour du profil :", err);
        res.status(400).json({
            message: err.message,
            type: "danger"
        });
    }
}

const editPassword = async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;

  try {
    // Vérification des données reçues
    if (!newPassword || !confirmNewPassword) {
      return res.status(400).json({
        message: "Tous les champs sont requis",
        type: "danger",
      });
    }

    // Vérification de la confirmation
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "Les nouveaux mots de passe ne correspondent pas",
        type: "danger",
      });
    }

    // Récupération de l'utilisateur connecté
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
        type: "danger",
      });
    }

    // Hashage et mise à jour
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      message: "Mot de passe mis à jour avec succès!",
      type: "success",
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du mot de passe :", err);
    return res.status(500).json({
      message: "Erreur serveur",
      type: "danger",
    });
  }
};


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
        //console.log("Réunion enregistrée :", newReunion);
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

        const reunions = await Reunion.find({ userId: req.user._id }).sort({ dateHeure: 1 }); // Récupérer les réunions de l'utilisateur connecté
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

const editReunion = async (req, res) => {
    const { reunionId } = req.params;
    const { titre, dateHeure, lieu } = req.body;

    try {
        // Vérification des données
        if (!titre || !dateHeure || !lieu) {
            return res.status(400).json({
                message: "Tous les champs sont requis",
                type: "danger"
            });
        }

        // Mise à jour de la réunion
        const updatedReunion = await Reunion.findByIdAndUpdate(
            reunionId,
            { titre, dateHeure, lieu },
            { new: true }
        );

        if (!updatedReunion) {
            return res.status(404).json({
                message: "Réunion non trouvée",
                type: "danger"
            });
        }

        res.status(200).json({
            message: "Réunion mise à jour avec succès!",
            type: "success",
            reunion: updatedReunion
        });

    } catch (err) {
        console.error("Erreur lors de la mise à jour de la réunion :", err);
        res.status(400).json({
            message: err.message,
            type: "danger"
        });
    }
}


const deleteReunion = async (req, res) => {
  const { reunionId } = req.params;

  try {
    const deleted = await Reunion.findByIdAndDelete(reunionId);

    if (!deleted) {
      return res.status(404).json({
        message: 'Réunion non trouvée',
        type: 'danger',
      });
    }

    res.status(200).json({
      message: 'Réunion supprimée avec succès',
      type: 'success',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la réunion:', error);
    res.status(500).json({
      message: 'Erreur serveur lors de la suppression',
      type: 'danger',
    });
  }
};



const addInvite = async (req, res) => {
    const {titre ,nom, prenom, telephone, nomTable, status} = req.body;
    //console.log("Données de l'invité :", req.body);
    try {
        if (!nom || !prenom || !telephone) {
            return res.status(400).json({
                message: "Tous les champs sont requis",
                type: "danger"
            });
        }

        const newInvite = new Invite({
            titre,
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



const oneInvite  = async (req, res) => {
  const { inviteId } = req.params;

  try {
    const invite = await Invite.findOne({ inviteId });

    if (!invite) {
      return res.status(404).json({
        message: 'Invité non trouvé',
        type: 'danger'
      });
    }

    // ✅ Vérification de propriété
    if (invite.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Accès non autorisé à cet invité",
        type: "danger"
      });
    }

    res.status(200).json({
      message: 'Invité récupéré avec succès',
      type: 'success',
      invite
    });
  } catch (err) {
    console.error("Erreur lors de la récupération de l'invité :", err);
    res.status(500).json({
      message: "Erreur serveur",
      type: "danger"
    });
  }
}


const editInvite = async (req, res) => {

  const { id } = req.params; 
  const { titre ,nom, prenom, telephone, nomTable, status } = req.body;

  try {
    if (!nom || !prenom || !telephone) {
      return res.status(400).json({
        message: "Nom, prénom et téléphone sont requis",
        type: "danger",
      });
    }

    const updatedFields = {
      titre,
      nom,
      prenom,
      telephone,
      nomTable,
      status,
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updatedInvite = await Invite.findByIdAndUpdate(
        id, 
        updatedFields,
         {
      new: true,
    });

    if (!updatedInvite) {
      return res.status(404).json({
        message: "Invité non trouvé",
        type: "danger",
      });
    }

    res.status(200).json({
      message: "Invité mis à jour avec succès !",
      type: "success",
      invite: updatedInvite,
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'invité :", err);
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour",
      type: "danger",
    });
  }
};

const deleteInvite = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Invite.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                message: 'Invité non trouvé',
                type: 'danger',
            });
        }

        res.status(200).json({
            message: 'Invité supprimé avec succès',
            type: 'success',
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'invité:', error);
        res.status(500).json({
            message: 'Erreur serveur lors de la suppression',
            type: 'danger',
        });
    }
}


const presence = async (req, res) => {
  try {
    const inviteId = req.params.inviteId;
    const invite = await Invite.findOne({ inviteId });

    if (!invite) {
      return res.status(404).json({ message: "Invité introuvable" });
    }

    const dejaPresent = invite.status === 'P';

    if (!dejaPresent) {
      invite.status = 'P';
      await invite.save();
    }

    return res.status(200).json({
      dejaPresent,
      message: dejaPresent
        ? "❗ Cet invité était déjà présent"
        : "✅ Présence enregistrée avec succès",
      invite,
    });
  } catch (err) {
    console.error("Erreur serveur :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};




export {
    register,
    login,
    user,
    editProfil,
    editPassword,
    addReunion,
    allReunion,
    addInvite,
    allInvite,
    oneInvite,
    editInvite,
    deleteInvite,
    editReunion,
    deleteReunion,
    presence
};