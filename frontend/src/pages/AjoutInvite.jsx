import React, { useState } from 'react'

function AjoutInvite() {
      const [nom, setNom] = useState('Nom');
      const [prenom, setPrenom] = useState('Prénom');
      const [telephone, setTelephone] = useState('Téléphone');
      const [nomTable, setNomTable] = useState('Nom table');
      const [status, setStatus] = useState('Status');
    return (
      <div className="h-screen flex justify-center items-center bg-[#717171]">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-black mb-5 font-bold text-lg">Ajouter un invité</h2>

          <div className="flex flex-col gap-4 mb-6">
            <input 
              type="text" 
              placeholder={nom}
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="text" 
              placeholder={prenom}
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="tel" 
              placeholder={telephone}
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="text" 
              placeholder={nomTable}
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="text" 
              placeholder={status}
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="file" 
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
          </div>

          <div>
            <button className="w-[300px] bg-[#11B141] font-bold text-white px-8 py-2 rounded-2xl border-none cursor-pointer text-base">
              SAUVEGARDER
            </button>
          </div>
        </div>
      </div>
    )
}

export default AjoutInvite