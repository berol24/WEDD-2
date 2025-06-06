import React from 'react'
import NavLink from '../components/NavLink';
import BlogRight from '../components/BlogRight';

function RechercheInvite() {
  return (
     <div className="flex h-screen w-full">
      <NavLink />

      <div className="flex-1 bg-[#717171] flex items-center justify-center p-8">
        <div className="bg-white shadow-lg p-8 rounded-full w-96 h-96 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold mb-6 text-center text-black">Entrer l'identifiant de l'invité</h2>
          <form className="w-full">
            <div className="flex flex-col gap-4 mb-6">
              <input
                type="text"
                placeholder="Identifiant de l'invité"
                className="w-full p-3 text-base border border-[#C6C6C6] rounded-lg"
              />
            </div>
            <button className="w-3xs bg-[#016CEC] font-bold text-white px-8 py-3 rounded-lg border-none cursor-pointer hover:bg-[#0156BC]">
              CHERCHER
            </button>
          </form>
        </div>
      </div>
      <BlogRight/>
    </div>
  )

}export default RechercheInvite;