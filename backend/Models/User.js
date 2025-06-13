const mongoose = require('mongoose');

// Schéma User

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    password: { type: String, required: true },
    dateMariage: { type: Date, required: true },
    lieuMariage: { type: String, required: true },
    couleurSite: { type: String, required: true },
    themeMariage: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports =  User