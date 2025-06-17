
import React from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import edit from '../assets/icons/edit.svg';
import axios from 'axios';

function Table({ invites, apiUrl, onEditInvite, handleDeleteInvite }) {

  // const generatePdf = async (invite) => {
  //   const doc = new jsPDF();
    
  //   // Contenu texte
  //   doc.setFontSize(16);
  //   doc.text("Fiche Invité", 20, 20);
  //   doc.setFontSize(12);
  //   doc.text(`Nom : ${invite.nom}`, 20, 40);
  //   doc.text(`Prénom : ${invite.prenom}`, 20, 50);
  //   doc.text(`Téléphone : +237 ${invite.telephone}`, 20, 60);
  //   doc.text(`Table : ${invite.nomTable || 'Non attribuée'}`, 20, 70);
  //   doc.text(`ID invité : ${invite.inviteId || 'Non attribuée'}`, 20, 80);
  //   doc.text(`Statut : ${invite.status === 'P' ? 'Présent' : 'Absent'}`, 20, 90);

  //   // QR Code : il redirige vers une page mobile ou affiche juste "Présent"
  //   const qrText = "Présent";
  //   const qrImage = await QRCode.toDataURL(qrText);

  //   doc.addImage(qrImage, 'PNG', 140, 40, 50, 50); // QR en haut à droite

  //   doc.save(`Invite-${invite.nom}-${invite.prenom}.pdf`);
  // };
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
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase bg-blue-600 text-white">
        <tr>
          <th className="px-6 py-3">Photo</th>
          <th className="px-6 py-3">ID Invité</th>
          <th className="px-6 py-3">Nom et Prénom</th>
          <th className="px-6 py-3">Téléphone</th>
          <th className="px-6 py-3">Table</th>
          <th className="px-6 py-3">Status</th>
          <th className="px-6 py-3">Actions</th>
          <th className="px-6 py-3">Télécharger</th> {/* ✅ Colonne ajoutée */}
        </tr>
      </thead>
      <tbody>
        {invites && invites.length > 0 ? (
          invites.map((invite) => (
            <tr key={invite._id} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                <img className="w-10 h-10 rounded-full" src={`${apiUrl}/uploads/${invite.image}`} alt="Profile" />
              </td>
              <td className="px-6 py-4">{invite.inviteId}</td>
              <td className="px-6 py-4">{invite.nom} {invite.prenom}</td>
              <td className="px-6 py-4">+237 {invite.telephone}</td>
              <td className="px-6 py-4">{invite.nomTable}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <div className={`h-2.5 w-2.5 rounded-full ${invite.status === 'P' ? 'bg-green-500' : 'bg-red-500'} me-2`} />
                  {invite.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2 justify-center">
                  <button onClick={() => onEditInvite(invite)} className="px-2">
                    <img src={edit} alt="Editer" className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDeleteInvite(invite._id)} className="px-2">
                    <img src={deleteIcon} alt="Supprimer" className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
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
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      PDF
                    </button>

                <button
                      onClick={() => handleWhatsAppShare(invite)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      WhatsApp
                    </button>

              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="px-4 py-2 border-b text-center">
              Aucune donnée trouvée
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
