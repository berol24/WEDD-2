import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { getBilletCivility, getBilletLineText, MAX_BILLET_LINE_CHARS } from './invitePeople';

const billetImg = '/assets/img/billet.jpeg';

const API_URL_FRONTEND =
  typeof window !== 'undefined' ? window.location.origin : '';

const QR_SIZE = 120;
const QR_CREAM_W = 146;
const QR_CREAM_H = 145;
const ID_RECT_W = 146;
const ID_RECT_H = 50;
const QR_INSET_X = 10;
const QR_INSET_Y = 14;

const QR_POS = {
  x: 0.093,
  y: 0.85,
};

const ID_POS = {
  x: 0.084,
  y: 0.938,
};

const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Erreur de chargement de l'image"));
    img.src = url;
  });

const getInviteLabel = (titre) => {
  switch (titre) {
    case 'Mme':
    case 'Mlle':
      return 'Invitée';
    case 'couple':
      return 'Invités';
    case 'M':
    default:
      return 'Invité';
  }
};

const fitCanvasText = (ctx, text, maxWidth, maxFont = 22, minFont = 11) => {
  let size = maxFont;
  let output = text;
  ctx.font = `italic ${size}px "Times New Roman", Times, serif`;
  while (size > minFont && ctx.measureText(output).width > maxWidth) {
    size -= 0.5;
    ctx.font = `italic ${size}px "Times New Roman", Times, serif`;
  }
  if (ctx.measureText(output).width > maxWidth) {
    while (output.length > 1 && ctx.measureText(`${output}…`).width > maxWidth) {
      output = output.slice(0, -1).trimEnd();
    }
    output = `${output}…`;
  }
  return output;
};

const drawBilletCanvas = async (invite) => {
  const [background, qrImage] = await Promise.all([
    loadImage(billetImg),
    loadImage(
      await QRCode.toDataURL(`${API_URL_FRONTEND}/invites/${invite.inviteId}`, {
        margin: 1,
        width: 512,
        color: { dark: '#2a1c0f', light: '#f3e8d6' },
      })
    ),
  ]);

  const imgW = background.naturalWidth || background.width;
  const imgH = background.naturalHeight || background.height;

  const canvas = document.createElement('canvas');
  canvas.width = imgW;
  canvas.height = imgH;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(background, 0, 0, imgW, imgH);

  const qrX = Math.round(imgW * QR_POS.x);
  const qrY = Math.round(imgH * QR_POS.y);
  const creamX = qrX - QR_INSET_X;
  const creamY = qrY - QR_INSET_Y;
  const idX = Math.round(imgW * ID_POS.x);
  const idY = Math.round(imgH * ID_POS.y);

  ctx.fillStyle = 'rgb(243, 232, 214)';
  ctx.fillRect(creamX, creamY, QR_CREAM_W, QR_CREAM_H);
  ctx.drawImage(qrImage, qrX, qrY, QR_SIZE, QR_SIZE);

  ctx.fillStyle = 'rgb(243, 232, 214)';
  ctx.fillRect(idX, idY, ID_RECT_W, ID_RECT_H);
  const inviteIdText = String(invite.inviteId || '').trim();
  if (inviteIdText) {
    ctx.fillStyle = 'rgb(92, 51, 23)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 30px "Times New Roman", Times, serif';
    ctx.fillText(inviteIdText, idX + ID_RECT_W / 2, idY + ID_RECT_H / 2);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  const civility = getBilletCivility(invite.titre);
  const rawName = getBilletLineText(invite.prenom, invite.nom, invite.titre);
  const nameOnLine = rawName.slice(0, MAX_BILLET_LINE_CHARS);
  const fullLine = [civility, nameOnLine].filter(Boolean).join(' ');

  if (fullLine) {
    const nameLeft = Math.round(imgW * 0.50);
    const nameRight = Math.round(imgW * 0.96);
    const nameMaxWidth = nameRight - nameLeft;
    const nameCenterX = (nameLeft + nameRight) / 2;
    const nameY = Math.round(imgH * 0.775);

    ctx.fillStyle = 'rgb(184, 134, 70)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'italic 22px "Times New Roman", Times, serif';
    ctx.fillText(getInviteLabel(invite.titre), nameCenterX, nameY - 28);

    ctx.fillStyle = 'rgb(61, 38, 20)';
    const fitted = fitCanvasText(ctx, fullLine, nameMaxWidth, 24, 11);
    ctx.fillText(fitted, nameCenterX, nameY);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  return canvas;
};

export const generateBilletPreviewUrl = async (invite) => {
  try {
    const canvas = await drawBilletCanvas(invite);
    return canvas.toDataURL('image/jpeg', 0.92);
  } catch (err) {
    console.error('Erreur aperçu billet :', err);
    return null;
  }
};

export const generatePdf = async (invite) => {
  try {
    const canvas = await drawBilletCanvas(invite);
    const pageHeight = 210;
    const pageWidth = pageHeight * (canvas.width / canvas.height);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pageWidth, pageHeight],
    });
    doc.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pageWidth, pageHeight);
    return doc.output('blob');
  } catch (err) {
    console.error('Erreur génération PDF avec image :', err);
    return null;
  }
};
