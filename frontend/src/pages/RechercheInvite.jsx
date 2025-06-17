import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogRight from "../components/BlogRight";
import NavLink from "../components/NavLink";
import axios from "axios";
import { Html5Qrcode } from "html5-qrcode";

const RechercheInvite = () => {
  const [invitesList, setInvitesList] = useState([]);
  const [inputId, setInputId] = useState("");
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const scannerRef = useRef(null);

  // Récupération des invités
  const invites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/invites`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const data = response.data.invites || [];
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des Invités:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInvites = async () => {
      const data = await invites();
      setInvitesList(data);
    };
    fetchInvites();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = invitesList.find(
      (invite) => String(invite.inviteId).trim() === inputId.trim()
    );
    if (found) {
      navigate(`/invites/${found.inviteId}`);
    } else {
      setError("Identifiant inconnu");
    }
  };

const startScanner = () => {
  setError(null);
  setIsScanning(true);

  const html5QrCode = new Html5Qrcode("scanner");

  html5QrCode
    .start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        console.log("QR Code détecté :", decodedText);

        html5QrCode.stop().then(() => {
          setIsScanning(false);

          try {
            const url = new URL(decodedText); // ✅ pour extraire le chemin seulement
            const path = url.pathname;
            navigate(path);
          } catch (err) {
            console.error("❌ URL invalide dans le QR Code :", decodedText);
            setError("QR Code invalide");
          }
        });
      },
      (errorMessage) => {
        console.warn("Erreur scan :", errorMessage);
      }
    )
    .catch((err) => {
      console.error("Erreur démarrage scanner :", err);
      setIsScanning(false);
    });
};


  return (
    <div className="flex h-full w-full">
      <NavLink />
      <div className="flex-1 bg-[#717171] flex items-center justify-center p-8 min-h-screen">
        <div className="bg-white shadow-lg p-8 rounded-2xl w-96 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-6 text-black">
            Entrer l'identifiant de l'invité
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-4">
              <input
                type="text"
                placeholder="Identifiant de l'invité"
                className="w-full p-3 text-base border border-[#C6C6C6] rounded-lg"
                value={inputId}
                onChange={(e) => {
                  setInputId(e.target.value);
                  setError(null);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#016CEC] font-bold text-white px-6 py-3 rounded-lg hover:bg-[#0156BC]"
            >
              CHERCHER
            </button>
          </form>

          <button
            type="button"
            onClick={startScanner}
            className="mt-4 w-full bg-green-600 font-bold text-white px-6 py-3 rounded-lg hover:bg-green-800"
          >
            📷 Scanner un QR Code
          </button>

          {error && (
            <div className="mt-4">
              <span className="text-red-600 font-bold">{error}</span>
            </div>
          )}

          {isScanning && (
            <div id="scanner" className="mt-6 w-full h-60 bg-gray-100 rounded-md shadow-inner" />
          )}
        </div>
      </div>
      <BlogRight />
    </div>
  );
};

export default RechercheInvite;
