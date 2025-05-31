import React, { useState } from 'react'

function ModifierInvite() {
      const [nom, setNom] = useState('Nom');
      const [prenom, setPrenom] = useState('Prenom');
      const [telephone, setTelephone] = useState('Telephone');
      const [nomTable, setNomTable] = useState('Table 1');
      const [status, setStatus] = useState('P'); 
    return (
      <div className="h-screen flex justify-center items-center bg-[#717171]">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-black mb-5 font-bold text-lg">Modifier l'invité</h2>
          <div className="flex flex-col gap-4 mb-6">
            <input 
              type="text" 
              value={nom} 
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom"
              className="w-[300px] p-2 text-center border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="text" 
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Prénom"
              className="w-[300px] p-2 text-center border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="tel" 
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Téléphone"
              className="w-[300px] p-2 text-center border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="text" 
              value={nomTable}
              onChange={(e) => setNomTable(e.target.value)}
              placeholder="Nom table"
              className="w-[300px] p-2 text-center border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="text" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
              className="w-[300px] p-2 text-center border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="file" 
              className="w-[300px] p-2 text-center border border-[#C6C6C6] rounded-2xl"
            />
          </div>

          <div>
            <button className="w-[300px] bg-[#11B141] font-bold text-white px-8 py-2 rounded-2xl border-none cursor-pointer text-center">
              SAUVEGARDER
            </button>
          </div>
        </div>
      </div>
    )
}

export default ModifierInvite