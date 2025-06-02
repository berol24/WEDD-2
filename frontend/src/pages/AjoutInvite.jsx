import React, { useState } from 'react';
import NavLink from '../components/NavLink';
import Notification from '../components/Notification';

function AjoutInvite() {
  const [nom, setNom] = useState('Nom');
  const [prenom, setPrenom] = useState('Prénom');
  const [telephone, setTelephone] = useState('Téléphone');
  const [nomTable, setNomTable] = useState('Nom table');
  const [status, setStatus] = useState('Status');

  return (
    <div className="flex h-screen w-full">
      <NavLink />

      <div className="flex-1 bg-[#717171] flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-black">Ajouter un invité</h2>

          <div className="flex flex-col gap-6 mb-8">
            <input
              type="text"
              placeholder={nom}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input
              type="text"
              placeholder={prenom}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input
              type="tel"
              placeholder={telephone}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input
              type="text"
              placeholder={nomTable}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input
              type="text"
              placeholder={status}
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input
              type="file"
              className="w-full p-3 text-base border border-[#C6C6C6] rounded-2xl"
            />
          </div>

          <button className="w-full bg-[#11B141] font-bold text-white px-8 py-3 rounded-2xl border-none cursor-pointer text-base hover:bg-[#0d9235] transition-colors">
            SAUVEGARDER
          </button>
        </div>
      </div>

      <Notification />
    </div>
  );
}

export default AjoutInvite;