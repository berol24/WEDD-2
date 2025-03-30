import React, { useState } from 'react'
import Input from '../components/Input'

function Informations() {
      const [isEditing, setIsEditing] = useState(false)
      const [isEditingPassword, setIsEditingPassword] = useState(false)
      const [showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
      const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        dateMariage: "",
        lieuMariage: "",
        couleurSite: "",
        themeMariage: "",
        newPassword: "",
        confirmPassword: ""
      })

      const handleEditClick = () => {
        setIsEditing(!isEditing)
      }

      const handleEditPasswordClick = () => {
        setIsEditingPassword(!isEditingPassword)
      }

      const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-6">Mes informations personnels</h1>
          <div className="flex w-full mb-4">
            <div className="w-1/2 pr-4">
              <label>Nom</label>
              <Input
                width="w-full"
                type="text"
                name="nom"
                placeholder="Votre nom"
                required={true}
                value={formData.nom}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="w-1/2 pl-4">
              <label>Prénom</label>
              <Input
                width="w-full"
                type="text"
                name="prenom"
                placeholder="Votre prénom"
                required={true}
                value={formData.prenom}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex w-full mb-4">
            <div className="w-1/2 pr-4">
              <label>Email</label>
              <Input
                width="w-full"
                type="email"
                name="email"
                placeholder="Votre email"
                required={true}
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="w-1/2 pl-4">
              <label>Numéro de téléphone</label>
              <Input
                width="w-full"
                type="tel"
                name="telephone"
                placeholder="Votre numéro de téléphone"
                required={true}
                value={formData.telephone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex w-full mb-4">
            <div className="w-1/2 pr-4">
              <label>Date de mariage</label>
              <Input
                width="w-full"
                type="date"
                name="dateMariage"
                required={true}
                value={formData.dateMariage}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="w-1/2 pl-4">
              <label>Lieu de mariage</label>
              <Input
                width="w-full"
                type="text"
                name="lieuMariage"
                placeholder="Lieu du mariage"
                required={true}
                value={formData.lieuMariage}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex w-full mb-4">
            <div className="w-1/2 pr-4">
              <label>Couleur du site</label>
              <Input
                width="w-full"
                type="color"
                name="couleur_site"
                required={true}
                value={formData.couleurSite}
                onChange={handleInputChange}
                disabled={!isEditing}
               
              />
            </div>
            <div className="w-1/2 pl-4">
              <label>Thème du mariage</label>
              <Input
                width="w-full"
                type="text"
                name="themeMariage"
                placeholder="Thème du mariage"
                required={true}
                value={formData.themeMariage}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="mt-4 w-full">
            <div className="flex justify-center">
              <button 
                onClick={handleEditClick}
                className={`${isEditing ? 'bg-[#11B141] hover:bg-[#0E9E39]' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded w-64`}
                >
                {isEditing ?  'Enregistrer' :'Modifier mon profil'}
              </button>
            </div>
            <div className="mt-4">
              <div className="flex w-full mb-4">
                <div className="w-1/2 pr-4">
                  <label>Nouveau mot de passe</label>
                  <div className="relative">
                    <Input
                      width="w-full"
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="*****"
                      required={true}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      disabled={!isEditingPassword}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="w-1/2 pl-4">
                  <label>Confirmer le mot de passe</label>
                  <div className="relative">
                    <Input
                      width="w-full"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="*****"
                      required={true}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={!isEditingPassword}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button 
                  onClick={handleEditPasswordClick}
                  className={`${isEditingPassword ? 'bg-[#11B141] hover:bg-[#0E9E39]' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded w-64`}
                  >
                  {isEditingPassword ?  'Enregistrer mot de passe' :'Modifier mon mot de passe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )

}export default Informations