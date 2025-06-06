import React from 'react'
import map from  "../assets/icons/map.png";
import calendar from  "../assets/icons/calendar.png";
import clock from  "../assets/icons/clock.png";
import notification from  "../assets/icons/notification.png";
import Image from './Image';
function NextMeeting() {
  return (
    <div className='w-80 border-4 border-solid border-blue-400 rounded-lg p-4'>
         <div className="flex items-center gap-2 mb-4">
            <Image src={notification} className="w-10 h-10" alt="notification_icon" />
            <h2 className="text-2xl font-bold">Evènement à venir</h2>
         </div> 
        <div className="bg-white  rounded-lg ">
            <h1 className="text-xl font-bold mb-4"><span className="text-blue-600">Réunion de Planification</span></h1>
            <p className=" flex justify-between items-center mb-4"><Image src={calendar} className="w-10 h-10" alt="calendar_icon" /><span className="font-bold text-xl text-gray-700">2023-10-15</span></p>
            <p className="flex justify-between items-center mb-4"><Image src={clock} className="w-10 h-10" alt="clock_icon" /><span className="font-bold text-xl text-blue-700 ">14:30</span></p>
            <p className="flex justify-between items-center"><Image src={map} className="w-10 h-10" alt="map_icon" /><span className="font-bold text-xl">Salle de Conférence</span></p>
        </div>
    </div>  )
}

export default NextMeeting