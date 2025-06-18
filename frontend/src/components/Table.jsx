
import React from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import edit from '../assets/icons/edit.svg';
import axios from 'axios';
import whatsapp from "../assets/icons/whatsapp.svg"
function Table({ invites, apiUrl, onEditInvite, handleDeleteInvite }) {

    

const generatePdf = async (invite) => {
  const apiUrlFrontend = "https://wedd-i8ls.onrender.com";

  if (!apiUrlFrontend) {
    console.error("⚠️ FRONTEND URL non définie");
    return null;
  }

  const doc = new jsPDF();

  // 🖊️ Texte
  doc.setFontSize(16);
  doc.text("Fiche Invité", 20, 20);
  doc.setFontSize(12);
  doc.text(`Nom : ${invite.nom}`, 20, 40);
  doc.text(`Prénom : ${invite.prenom}`, 20, 50);
  doc.text(`Téléphone : +237 ${invite.telephone}`, 20, 60);
  doc.text(`Table : ${invite.nomTable || 'Non attribuée'}`, 20, 70);
  doc.text(`ID invité : ${invite.inviteId || 'Non attribué'}`, 20, 80);
  doc.text(`Statut : ${invite.status === 'P' ? 'Présent' : 'Absent'}`, 20, 90);

  // 🔗 Lien QR Code
  const qrText = `${apiUrlFrontend}/invites/${invite.inviteId}`;
  try {
    const qrImage = await QRCode.toDataURL(qrText);
    doc.addImage(qrImage, 'PNG', 140, 40, 50, 50); // Ajout QR
  } catch (err) {
    console.error("❌ Erreur génération QR Code :", err);
  }

  // ✅ Retourner un Blob (et non sauvegarder directement)
  const pdfBlob = doc.output('blob');
  return pdfBlob;
};

const handleWhatsAppShare = async (invite) => {
  try {
    const pdfBlob = await generatePdf(invite);

    if (!pdfBlob) {
      alert("PDF non généré.");
      return;
    }

    const file = new File([pdfBlob], `Invite-${invite.nom}-${invite.prenom}.pdf`, {
      type: 'application/pdf',
    });

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/uploadPDF`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const fileUrl = response.data.url;

    const whatsappMessage = `Bonjour ${invite.prenom}, voici ton billet d'invitation 🎉 : ${fileUrl}`;
    const whatsappUrl = `https://wa.me/237${invite.telephone}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl);
  } catch (error) {
    console.error("❌ Erreur lors du partage WhatsApp:", error);
    alert("Une erreur est survenue lors du partage.");
  }
};

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="text-xs uppercase bg-blue-600 text-white">
          <tr>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">Photo</th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">ID Invité</th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">Nom et Prénom</th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">Téléphone</th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">Table</th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">Status</th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">Actions</th>
            <th scope="col" className="px-4 py-3 whitespace-nowrap">Télécharger</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {invites && invites.length > 0 ? (
            invites.map((invite) => (
              <tr key={invite._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-3">
                  <img className="w-10 h-10 rounded-full" src={`${apiUrl}/uploads/${invite.image}`} alt="Profile" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{invite.inviteId}</td>
                <td className="px-4 py-3 whitespace-nowrap">{invite.nom} {invite.prenom}</td>
                <td className="px-4 py-3 whitespace-nowrap">+237 {invite.telephone}</td>
                <td className="px-4 py-3 whitespace-nowrap">{invite.nomTable}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${invite.status === 'P' ? 'bg-green-500' : 'bg-red-500'} me-2`} />
                    {invite.status}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2 justify-center">
                    <button onClick={() => onEditInvite(invite)} className="p-1 hover:bg-gray-100 rounded">
                      <img src={edit} alt="Editer" className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteInvite(invite._id)} className="p-1 hover:bg-gray-100 rounded">
                      <img src={deleteIcon} alt="Supprimer" className="w-5 h-5" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={async () => {
                        const pdfBlob = await generatePdf(invite);
                        if (pdfBlob) {
                          const link = document.createElement("a");
                          link.href = URL.createObjectURL(pdfBlob);
                          link.download = `Invite-${invite.nom}-${invite.prenom}.pdf`;
                          link.click();
                        }
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      PDF
                    </button>

                    <button
                      onClick={() => handleWhatsAppShare(invite)}
                      className="bg-green-500 text-white  px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                     <img src={whatsapp} className='size-5 m-auto text-white' alt="whatsapp" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-4 py-3 text-center">
                Aucune donnée trouvée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>  );
}

export default Table;
