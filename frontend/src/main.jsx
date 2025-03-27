import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './assets/css/index.css'
import Connexion from './pages/Connexion.jsx'
import Inscription from './pages/Inscription.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Accueil from './pages/Accueil.jsx'

const router = createBrowserRouter (
  createRoutesFromElements (
      <>
        <Route path="/" element={<Accueil />} />
        <Route path="/login-page" element={<Connexion />} />
        <Route path="/register-page" element={<Inscription />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound/>} />
        
      </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
