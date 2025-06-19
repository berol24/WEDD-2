import { useEffect, useState } from 'react';
import download from "../assets/icons/download.png"
function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    const handleClickOutside = () => {
      setIsVisible(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInstallClick = (e) => {
    e.stopPropagation();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    }
  };

  if (!deferredPrompt || !isVisible) return null;

  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <button onClick={handleInstallClick} className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-b-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 flex items-center justify-between gap-2 w-[80%] md:w-auto">
      Installer
      <img src={download} alt="download_installation" className="w-5 h-5" />
    </button>
  );
}
export default InstallPWAButton