import React from 'react'

function AjoutReunion() {
    return (
      <div className="h-screen flex justify-center items-center bg-[#717171]">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-black mb-5 font-bold text-lg">Ajouter une reunion</h2>

          <div className="flex flex-col gap-4 mb-6">
            <input 
              type="text" 
              placeholder='Titre réunion'
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="date" 
              placeholder='Date réunion'
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
            <input 
              type="text" 
              placeholder='Lieu'
              className="w-[300px] p-2 text-base border border-[#C6C6C6] rounded-2xl"
            />
          </div>

          <div>
            <button className="bg-[#0066cc] font-bold text-white px-8 py-2 rounded border-none cursor-pointer text-base">
              ENREGISTRER
            </button>
          </div>
        </div>
      </div>
    )
}

export default AjoutReunion