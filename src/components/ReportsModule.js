import React from 'react';

const ReportsModule = ({ garrafones, insumos, currentUserRole, isOffline }) => {
  const downloadData = (format) => {
    alert(`Descargando datos en formato ${format}... (Funcionalidad de descarga real iría aquí)`);
  };

  const gptReportsAssistant = "¡Hola! Soy tu Encargado de Reportes. Aquí puedes ver el estado de tu negocio en números y gráficos. Revisa el stock de productos e insumos para asegurarte de que siempre tengas lo necesario. ¡Los datos son poder para tomar las mejores decisiones!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Reportes</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptReportsAssistant}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Descargar Datos</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => downloadData('Excel')}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md flex items-center"
            disabled={isOffline} // Deshabilitar si está offline
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Descargar Excel
          </button>
          <button
            onClick={() => downloadData('CSV')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center"
            disabled={isOffline} // Deshabilitar si está offline
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Descargar CSV
          </button>
        </div>
        {isOffline && <p className="text-red-400 text-sm mt-2 text-center">No puedes descargar reportes en modo offline.</p>}
      </div>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Stock Actual de Productos e Insumos</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Tipo/Nombre</th>
              <th className="py-3 px-6 text-left">Stock Actual</th>
              <th className="py-3 px-6 text-left">Stock Mínimo</th>
              <th className="py-3 px-6 text-left">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {garrafones.map(item => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                <td className="py-3 px-6 text-left">{item.type}</td>
                <td className="py-3 px-6 text-left">{item.stock}</td>
                <td className="py-3 px-6 text-left">{item.minStock}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs font-semibold ${item.stock <= item.minStock ? 'bg-red-500' : 'bg-green-500'}`}>
                    {item.stock <= item.minStock ? 'Bajo' : 'Suficiente'}
                  </span>
                </td>
              </tr>
            ))}
            {insumos.map(item => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                <td className="py-3 px-6 text-left">{item.name}</td>
                <td className="py-3 px-6 text-left">{item.stock}</td>
                <td className="py-3 px-6 text-left">{item.minStock}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs font-semibold ${item.stock <= item.minStock ? 'bg-red-500' : 'bg-green-500'}`}>
                    {item.stock <= item.minStock ? 'Bajo' : 'Suficiente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Gráficos de Gestión</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-bold text-gray-100 mb-4">Ventas Mensuales</h4>
          <div className="h-48 bg-gray-700 rounded-lg flex items-end justify-around p-2 relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between py-2 px-4">
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
            </div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '80%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '60%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '90%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '70%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '85%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '75%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
          </div>
          <p className="text-gray-400 text-sm mt-2 text-center">Ventas de los últimos 6 meses</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-bold text-gray-100 mb-4">Balance Financiero</h4>
          <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center relative">
            <div className="relative w-32 h-32 rounded-full shadow-xl" style={{
              background: `conic-gradient(#10B981 0% 70%, #EF4444 70% 100%)`,
              transform: 'rotateX(45deg) scale(1.1)',
              transformOrigin: 'center',
            }}>
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold" style={{ transform: 'rotateX(-45deg)' }}>
                80%
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2 text-center">Ingresos vs Egresos</p>
        </div>
      </div>
      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">Los gráficos pueden no estar actualizados en modo offline.</p>}
    </section>
  );
};

export default ReportsModule;