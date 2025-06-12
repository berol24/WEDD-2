const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose  = require('mongoose');


const app  = express()
const PORT = process.env.PORT || 5000 ;
const routes = require("./Routes/Routes");

// ✅ Configuration CORS
// const corsOptions = {
//  // origin: 'http://localhost:5173', // l'URL du frontend
//   origin: [
//   process.env.FRONTEND_URL, // <-- URL de ton frontend Vercel
//   // "http://localhost:5173"
// ],

//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ⚠ inclure DELETE
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

// app.use(cors(corsOptions));



const allowedOrigins = [
   process.env.FRONTEND_URL, // mets ici l’URL Vercel de ton frontend
  "http://localhost:5173"
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

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // obligatoire pour gérer les requêtes OPTIONS



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


