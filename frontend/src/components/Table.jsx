
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import deleteIcon from '../assets/icons/deleteIcon.svg';
import edit from '../assets/icons/edit.svg';
import axios from 'axios';
import whatsapp from "../assets/icons/whatsapp.svg"


function Table({ invites, apiUrl, onEditInvite, handleDeleteInvite }) {

const generatePdf = async (invite) => {
  const apiUrlFrontend = "https://wedd-i8ls.onrender.com";
  const imageUrl = "assets/img/billet.png";

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "A4",
  });

  const loadImageAsBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      };

      img.onerror = () => reject("❌ Erreur de chargement de l'image");
      img.src = url;
    });
  };

  try {
    const backgroundBase64 = await loadImageAsBase64(imageUrl);
    doc.addImage(backgroundBase64, "PNG", 0, 0, 210, 297);

    const qrText = `${apiUrlFrontend}/invites/${invite.inviteId}`;
    const qrImage = await QRCode.toDataURL(qrText);
    doc.addImage(qrImage, "PNG", 150, 205, 40, 40);

    let titreTexte = "";
    switch (invite.titre) {
      case "M":
        titreTexte = `M. ${invite.prenom} ${invite.nom}`;
        break;
      case "Mme":
        titreTexte = `Mme ${invite.prenom} ${invite.nom}`;
        break;
      case "Mlle":
        titreTexte = `Mlle ${invite.prenom} ${invite.nom}`;
        break;
      case "couple":
        titreTexte = `M. & Mme ${invite.nom}`;
        break;
      default:
        titreTexte = `${invite.prenom} ${invite.nom}`;
    }

    doc.setTextColor(208, 108, 56);
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    
    const textWidth = doc.getStringUnitWidth(titreTexte) * doc.getFontSize() / doc.internal.scaleFactor;
    const maxWidth = 110; // Maximum width before QR code (150 - 40)
    
    if (textWidth > maxWidth) {
      doc.text(titreTexte, 30, 220, {
        maxWidth: maxWidth,
        align: "left"
      });
    } else {
      doc.text(titreTexte, 30, 230);
    }

    doc.setFontSize(12);
    doc.text(`ID : ${invite.inviteId}`, 170, 250, null, null, "center");

    // 🔁 Retourne un Blob (sans save)
    return doc.output("blob");
  } catch (err) {
    console.error("Erreur génération PDF avec image :", err);
    return null;
  }
};


const handleWhatsAppShare = async (invite) => {
  try {
    const pdfBlob = await generatePdf(invite);

    if (!pdfBlob) {
      alert("PDF non généré.");
      return;
    }

    const file = new File([pdfBlob], `Billet_${invite.nom}_${invite.prenom}.pdf`, {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/uploadPDF`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const fileUrl = response.data.url;
   
     let titreTexte = "";
    switch (invite.titre) {
      case "M":
        titreTexte = `M. ${invite.prenom} ${invite.nom}`;
        break;
      case "Mme":
        titreTexte = `Mme ${invite.prenom} ${invite.nom}`;
        break;
      case "Mlle":
        titreTexte = `Mlle ${invite.prenom} ${invite.nom}`;
        break;
      case "couple":
        titreTexte = `M. & Mme ${invite.nom}`;
        break;
      default:
        titreTexte = `${invite.prenom} ${invite.nom}`;
    }
    const whatsappMessage = `💌 Bonjour ${titreTexte},\n\nC’est avec une immense joie que nous vous t’invitons à célébrer notre union 💍.\n\n📩 Clique sur le lien ci-dessous pour télécharger ton billet d’invitation personnalisé 🎟️ :\n ${fileUrl} \n\n Merci de le conserver précieusement et de le présenter à l’entrée le jour du mariage. Ta présence à nos côtés rendra ce moment encore plus beau et inoubliable 💖.\n\nNous avons hâte de partager avec toi cette journée remplie d’amour, de joie et d’émotions ✨.\n\nAvec toute notre affection,\nLes futurs mariés 💐`;

    const whatsappUrl = `https://wa.me/237${invite.telephone}?text=${encodeURIComponent(whatsappMessage)}`;

    // window.open(whatsappUrl);
    window.location.href = whatsappUrl
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
            <th scope="col" className="px-4 py-3 whitespace-nowrap">Titre</th>
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
                <td className="px-4 py-3 whitespace-nowrap">{invite.titre || ""}</td>

                <td className="px-4 py-3 break-words">{invite.nom} {invite.prenom}</td>
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
            ))          ) : (
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
