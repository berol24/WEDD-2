require('dotenv').config();
const express = require('express');
const mongoose  = require('mongoose');

const app  = express()
const PORT = process.env.PORT || 4000 ;
const routes = require("./Routes/Routes");

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//database connection 

// Connexion à la base de données
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log("Connexion à la base de données réussie !"))
  .catch((error) => console.error("Erreur de connexion à la base de données :", error));


// route prefix 

app.use("/",routes)
app.use('/uploads', express.static('uploads'));


app.listen(PORT, function () {
    console.log("Serveur à l'écoute sur le port ", PORT);
});