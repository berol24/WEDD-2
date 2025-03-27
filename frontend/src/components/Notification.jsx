import React from 'react';
import alarm from '../assets/icons/alarm.svg';

function Notification() {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto  w-[310px] border-2 ">
        <a href="#" className="flex flex-row-reverse items-center gap-4 border-2 border-gray-300 p-4 rounded-lg w-[300px]">
          <div className="flex flex-col">
            <p className="font-bold">Reunion avec le protocole</p>
            <p>ven. 28/02/2025</p>
          </div>
          <img src={alarm} alt="alarm-icon" />
        </a>
        <a href="#" className="flex flex-row-reverse items-center gap-4 border-2 border-gray-300 p-4 rounded-lg w-[300px]">
          <div className="flex flex-col">
            <p className="font-bold">Reunion avec le protocole</p>
            <p>ven. 28/02/2025</p>
          </div>
          <img src={alarm} alt="alarm-icon" />
        </a>
        <a href="#" className="flex flex-row-reverse items-center gap-4 border-2 border-gray-300 p-4 rounded-lg w-[300px]">
          <div className="flex flex-col">
            <p className="font-bold">Reunion avec le protocole</p>
            <p>ven. 28/02/2025</p>
          </div>
          <img src={alarm} alt="alarm-icon" />
        </a>
        <a href="#" className="flex flex-row-reverse items-center gap-4 border-2 border-gray-300 p-4 rounded-lg w-[300px]">
          <div className="flex flex-col">
            <p className="font-bold">Reunion avec le protocole</p>
            <p>ven. 28/02/2025</p>
          </div>
          <img src={alarm} alt="alarm-icon" />
        </a>
        <a href="#" className="flex flex-row-reverse items-center gap-4 border-2 border-gray-300 p-4 rounded-lg w-[300px]">
          <div className="flex flex-col">
            <p className="font-bold">Reunion avec le protocole</p>
            <p>ven. 28/02/2025</p>
          </div>
          <img src={alarm} alt="alarm-icon" />
        </a>
      </div>
    </div>
  );
}export default Notification;