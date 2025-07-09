import React from 'react';
import DashboardCard from './DashboardCard';

const FinanceSummary = () => {
  const financeData = [
    { title: 'Ingresos Totales', value: '$60,000', icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12m-6 0h4m2 0h2M7 12H3m0 0l1.763 1.763A5.002 5.002 0 013 16v1a2 2 0 002 2h14a2 2 0 002-2v-1a5.002 5.002 0 01-1.763-3.237L21 12m-6 0a9.002 9.002 0 00-3-7.535M12 12v9"></path>
      </svg>
    ), color: 'bg-teal-600' },
    { title: 'Egresos Totales', value: '$12,000', icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l-6 6m0 0l6 6m-6-6h14a2 2 0 002-2V9a2 2 0 00-2-2H7"></path>
      </svg>
    ), color: 'bg-orange-600' },
    { title: 'Balance Actual', value: '$48,000', icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ), color: 'bg-blue-600' },
  ];

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Resumen Financiero</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financeData.map((data, index) => (
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

export default FinanceSummary;