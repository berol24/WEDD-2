// src/utils/notifications.js
function PlanifierNotification(reunion) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const dateReunion = new Date(reunion.date);
  const dateAlerte = new Date(dateReunion.getTime() - 5 * 60 * 1000); // 5 min avant
  const delai = dateAlerte.getTime() - Date.now();

  if (delai > 0) {
    setTimeout(() => {
      new Notification("📅 Rappel Réunion", {
        body: `La réunion "${reunion.titre}" commence dans 5 minutes.`,
        icon: "/logo.png", // adapte le chemin
        vibrate: [100, 50, 100],
      });
    }, delai);
  }
}

export default PlanifierNotification