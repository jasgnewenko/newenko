import React from 'react';

const DashboardCard = ({ title, value, icon, colorClass = 'bg-blue-600' }) => {
  return (
    <div className={`relative p-6 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${colorClass}`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 p-4 rounded-full bg-white bg-opacity-20">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-200 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-white">{value}</p>
    </div>
  );
};

export default DashboardCard;