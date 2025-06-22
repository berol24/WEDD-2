import logo from "../assets/img/logo.png";

function PlanifierNotification(reunion) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        planifier(reunion);
      }
    });
  } else if (Notification.permission === "granted") {
    planifier(reunion);
  }

  function planifier(reunion) {
    const dateReunion = new Date(reunion.date || reunion.dateHeure);
    const now = Date.now();

    if (dateReunion.getTime() <= now) return;

    const maxNotificationDate = new Date();
    maxNotificationDate.setDate(maxNotificationDate.getDate() + 1);
    maxNotificationDate.setHours(23, 59, 59, 999);
    if (dateReunion > maxNotificationDate) return;

    const heure = formatHeure(dateReunion);
    const lieu = reunion.lieu || "lieu non précisé";

    const notifications = [
      {
        label: "📅 Rappel réunion",
        message: `Demain, réunion "${reunion.titre}" à ${heure} au lieu de ${lieu}.`,
        time: new Date(dateReunion.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        label: "⏳ Rappel réunion",
        message: `La réunion "${reunion.titre}" commence dans 1 heure à ${lieu}.`,
        time: new Date(dateReunion.getTime() - 60 * 60 * 1000),
      },
      {
        label: "🕔 Rappel réunion",
        message: `La réunion "${reunion.titre}" commence dans 5 minutes à ${lieu}.`,
        time: new Date(dateReunion.getTime() - 5 * 60 * 1000),
      },
      {
        label: "🚨 Réunion en cours",
        message: `C'est l'heure de la réunion "${reunion.titre}" à ${lieu} !`,
        time: dateReunion,
      },
    ];

    notifications.forEach((notif) => {
      const delay = notif.time.getTime() - now;
      if (delay > 0) {
        setTimeout(() => {
          try {
            new Notification(notif.label, {
              body: notif.message,
              icon: logo,
              vibrate: [100, 50, 100],
              requireInteraction: false,
            });
          } catch (error) {
            console.error("Erreur notification :", error);
          }
        }, delay);
      }
    });
  }

  function formatHeure(date) {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export default PlanifierNotification;
