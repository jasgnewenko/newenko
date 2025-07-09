import React from 'react';
import DashboardCard from './DashboardCard';

const FinanceModule = ({ currentUserRole, isOffline, salesData, invoicesData }) => {
  const safeSalesData = salesData || [];
  const safeInvoicesData = invoicesData || [];

  // Simulación de ingresos y egresos diarios para proyecciones
  const dailyIncome = safeSalesData.reduce((sum, sale) => sum + (sale.paymentStatus === 'pagado' ? sale.totalAmount : 0), 0);
  const dailyExpense = safeInvoicesData.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  const projectData = (baseIncome, baseExpense, days) => {
    const projectedIncome = baseIncome * days;
    const projectedExpense = baseExpense * days;
    const projectedBalance = projectedIncome - projectedExpense;
    return { projectedIncome, projectedExpense, projectedBalance };
  };

  const weeklyProjection = projectData(dailyIncome, dailyExpense, 7);
  const monthlyProjection = projectData(dailyIncome, dailyExpense, 30);
  const annualProjection = projectData(dailyIncome, dailyExpense, 365);

  const financeData = [
    { title: 'Ingresos Totales (Hoy)', value: `$${dailyIncome.toFixed(0)}`, icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 12m-6 0h4m2 0h2M7 12H3m0 0l1.763 1.763A5.002 5.002 0 013 16v1a2 2 0 002 2h14a2 2 0 002-2v-1a5.002 5.002 0 01-1.763-3.237L21 12m-6 0a9.002 9.002 0 00-3-7.535M12 12v9"></path>
      </svg>
    ), color: 'bg-teal-600' },
    { title: 'Egresos Totales (Hoy)', value: `$${dailyExpense.toFixed(0)}`, icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l-6 6m0 0l6 6m-6-6h14a2 2 0 002-2V9a2 2 0 00-2-2H7"></path>
      </svg>
    ), color: 'bg-orange-600' },
    { title: 'Balance Actual (Hoy)', value: `$${(dailyIncome - dailyExpense).toFixed(0)}`, icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ), color: 'bg-blue-600' },
  ];

  const gptFinanceAssistant = "¡Hola! Soy tu Encargado de Finanzas. Aquí puedes ver un resumen rápido de tus ingresos, egresos y balance, además de proyecciones detalladas basadas en tu flujo diario. Mantener un ojo en estos números es crucial para la salud financiera de tu negocio. ¡Si necesitas analizar gastos o proyecciones, aquí estoy para ayudarte!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Finanzas</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptFinanceAssistant}</p>
      </div>

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

      <h3 className="text-xl font-semibold text-gray-200 mb-4 mt-8">Proyecciones Financieras (Basado en flujo diario)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-400 text-sm font-bold mb-2">Proyección Semanal</p>
          <p className="text-gray-300 text-sm">Ingresos Estimados: <span className="text-white font-bold">${weeklyProjection.projectedIncome.toFixed(0)}</span></p>
          <p className="text-gray-300 text-sm">Egresos Estimados: <span className="text-white font-bold">${weeklyProjection.projectedExpense.toFixed(0)}</span></p>
          <p className="text-gray-300 text-sm">Balance Estimado: <span className="text-white font-bold">${weeklyProjection.projectedBalance.toFixed(0)}</span></p>
          <p className="text-gray-400 text-xs mt-2">Basado en ${dailyIncome.toFixed(0)} ingresos y ${dailyExpense.toFixed(0)} egresos diarios.</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-400 text-sm font-bold mb-2">Proyección Mensual</p>
          <p className="text-gray-300 text-sm">Ingresos Estimados: <span className="text-white font-bold">${monthlyProjection.projectedIncome.toFixed(0)}</span></p>
          <p className="text-gray-300 text-sm">Egresos Estimados: <span className="text-white font-bold">${monthlyProjection.projectedExpense.toFixed(0)}</span></p>
          <p className="text-gray-300 text-sm">Balance Estimado: <span className="text-white font-bold">${monthlyProjection.projectedBalance.toFixed(0)}</span></p>
          <p className="text-gray-400 text-xs mt-2">Basado en ${dailyIncome.toFixed(0)} ingresos y ${dailyExpense.toFixed(0)} egresos diarios.</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-400 text-sm font-bold mb-2">Proyección Anual</p>
          <p className="text-gray-300 text-sm">Ingresos Estimados: <span className="text-white font-bold">${annualProjection.projectedIncome.toFixed(0)}</span></p>
          <p className="text-gray-300 text-sm">Egresos Estimados: <span className="text-white font-bold">${annualProjection.projectedExpense.toFixed(0)}</span></p>
          <p className="text-gray-300 text-sm">Balance Estimado: <span className="text-white font-bold">${annualProjection.projectedBalance.toFixed(0)}</span></p>
          <p className="text-gray-400 text-xs mt-2">Basado en ${dailyIncome.toFixed(0)} ingresos y ${dailyExpense.toFixed(0)} egresos diarios.</p>
        </div>
      </div>

      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">Los datos financieros pueden no estar actualizados en modo offline.</p>}
    </section>
  );
};

export default FinanceModule;