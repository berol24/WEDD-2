import React, { useState } from 'react'
import myImage from '../assets/img/logo.png'

function Table({ invites }) {

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-blue-600 text-white">
            <tr>
                <th scope="col" className="px-6 py-3">Photo</th>
                <th scope="col" className="px-6 py-3">ID Invité</th>
                <th scope="col" className="px-6 py-3">Nom et Prénom</th>
                <th scope="col" className="px-6 py-3">Téléphone</th>
                <th scope="col" className="px-6 py-3">Table</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
        </thead>
        <tbody>
            {invites.map((invite) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                    <img className="w-10 h-10 rounded-full" src={myImage} alt="Profile"/>
                </td>
                <td className="px-6 py-4">{invite.inviteId}</td>
                <td className="px-6 py-4">{invite.nom} {invite.prenom}</td>
                <td className="px-6 py-4">+{invite.telephone}</td>
                <td className="px-6 py-4">{invite.nomTable}</td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full ${invite.status === 'P' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {invite.status}
                    </div>                </td>
                <td className="px-6 py-4">
                    <div className="flex space-x-2">
                        <a href="/edit" className="text-blue-600 hover:text-blue-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="/delete" className="text-red-600 hover:text-red-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </td>  
            </tr>
            ))}
            
           
        </tbody>
    </table>
    )
}

export default Table