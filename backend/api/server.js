// const cors = require('cors');
// require('dotenv').config();
// const express = require('express');
// const mongoose  = require('mongoose');


// const app  = express()
// const PORT = process.env.PORT || 5000 ;
// const routes = require("./Routes/Routes");


// const allowedOrigins = [
//    process.env.FRONTEND_URL || "https://wedd-five.vercel.app/*", // mets ici l’URL Vercel de ton frontend
//    "https://wedd-five.vercel.app"
//    // "http://localhost:5173"
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // autoriser les requêtes sans origin (comme curl ou Postman)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // obligatoire pour gérer les requêtes OPTIONS




// // Middleware pour parser les requêtes JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// //database connection 

// // Connexion à la base de données
// mongoose.connect(process.env.DB_URI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//   .then(() => console.log("Connexion à la base de données réussie !"))
//   .catch((error) => console.error("Erreur de connexion à la base de données :", error));


// // route prefix 

// app.use("/api",routes)
// app.use('/uploads', express.static('uploads'));


// app.listen(PORT, function () {
//     console.log("Serveur à l'écoute sur le port ", PORT);
// });



const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("../Routes/Routes");

// Liste des origines autorisées
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://wedd-five.vercel.app",
  "https://wedd-five.vercel.app",
  // "http://localhost:5173", // si tu testes en local
];

const corsOptionsDelegate = function (req, callback) {
  const origin = req.header('Origin');
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, {
      origin: origin, // Répond exactement avec l'origine demandée
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    });
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

app.use(cors(corsOptionsDelegate));

app.options('*', cors(corsOptionsDelegate)); // Pour les préflight OPTIONS

///////////////////
// Pour gérer toutes les requêtes OPTIONS (préflight CORS)
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://wedd-five.vercel.app');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  return res.status(200).end();
});

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connexion à la base de données réussie !"))
  .catch((error) => console.error("Erreur de connexion à la base de données :", error));

// Routes
app.use("/api", routes);
app.use('/uploads', express.static('uploads'));

// Lancement du serveur
app.listen(PORT, () => {
  console.log("Serveur à l'écoute sur le port", PORT);
});
