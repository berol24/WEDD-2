import React from 'react';
import map from '../assets/icons/map.png';
import calendar from '../assets/icons/calendar.png';
import clock from '../assets/icons/clock.png';
import notification from '../assets/icons/notification.png';
import Image from './Image';
function NextMeeting({lastMeeting}) {

if (!lastMeeting || lastMeeting.length === 0) {
    return (
      <div className="w-96 border-4 border-solid border-blue-400 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Image
            src={notification}
            className="w-10 h-10"
            alt="notification_icon"
          />
          <h2 className="text-2xl font-bold">Aucun évènement à venir</h2>
        </div>
        <p className="text-gray-600">Aucune réunion planifiée pour le moment.</p>
      </div>
    );
  }

  const reunion = lastMeeting[0];
  const titre = reunion.titre;
  const lieu = reunion.lieu;
  const date = reunion.dateHeure?.split('T')[0];
  const heure = reunion.dateHeure?.split('T')[1]?.split(':')[0] + ':' + reunion.dateHeure?.split('T')[1]?.split(':')[1];

  return (
    <div className="w-full md:w-96 border-4 border-solid border-blue-400 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Image
          src={notification}
          className="w-8 h-8 md:w-10 md:h-10"
          alt="notification_icon"
        />
        <h2 className="text-xl md:text-2xl font-bold">Evènement à venir</h2>
      </div>
      <div className="bg-white rounded-lg">
        <h1 className="text-lg md:text-xl font-bold mb-4">
          <span className="text-blue-600">{titre}</span>
        </h1>
        <p className="flex justify-between items-center mb-4">
          <Image src={calendar} className="w-8 h-8 md:w-10 md:h-10" alt="calendar_icon" />
          <span className="font-bold text-lg md:text-xl text-gray-700">{date}</span>
        </p>
        <p className="flex justify-between items-center mb-4">
          <Image src={clock} className="w-8 h-8 md:w-10 md:h-10" alt="clock_icon" />
          <span className="font-bold text-lg md:text-xl text-blue-700">{heure}</span>
        </p>
        <p className="flex justify-between items-center">
          <Image src={map} className="w-8 h-8 md:w-10 md:h-10" alt="map_icon" />
          <span className="font-bold text-lg md:text-xl break-words text-right max-w-[70%]">
           {lieu}
          </span>
        </p>
      </div>
    </div>
  );
}

export default NextMeeting;
