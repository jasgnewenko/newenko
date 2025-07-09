import React from 'react';
import DashboardCard from './DashboardCard';

const SalesOverview = () => {
  const salesData = [
    { title: 'Ventas Semanales', value: '$12,500', icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12m-6 0h4m2 0h2M7 12H3m0 0l1.763 1.763A5.002 5.002 0 013 16v1a2 2 0 002 2h14a2 2 0 002-2v-1a5.002 5.002 0 01-1.763-3.237L21 12m-6 0a9.002 9.002 0 00-3-7.535M12 12v9"></path>
      </svg>
    ), color: 'bg-green-600' },
    { title: 'Ventas Mensuales', value: '$48,000', icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    ), color: 'bg-purple-600' },
    { title: 'Ventas Anuales', value: '$550,000', icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
      </svg>
    ), color: 'bg-red-600' },
  ];

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Resumen de Ventas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {salesData.map((data, index) => (
          <DashboardCard
            key={index}
            title={data.title}
            value={data.value}
            icon={data.icon}
            colorClass={data.color}
          />
        ))}
      </div>
    </section>
  );
};

export default SalesOverview;