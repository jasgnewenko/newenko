import React from 'react';

const ReportsAndCharts = () => {
  const downloadData = (format) => {
    alert(`Descargando datos en formato ${format}... (Funcionalidad de descarga real iría aquí)`);
  };

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Reportes y Gráficos</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Descargar Datos</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => downloadData('Excel')}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Descargar Excel
          </button>
          <button
            onClick={() => downloadData('CSV')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Descargar CSV
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Gráficos de Gestión</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Ventas (simulado) - Diseño Mejorado */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-bold text-gray-100 mb-4">Ventas Mensuales</h4>
          <div className="h-48 bg-gray-700 rounded-lg flex items-end justify-around p-2 relative overflow-hidden">
            {/* Líneas de fondo para referencia */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 px-4">
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
            </div>
            {/* Barras de gráfico con gradiente y sombra */}
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '80%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '60%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '90%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '70%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '85%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
            <div className="w-8 rounded-t-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ height: '75%', background: 'linear-gradient(to top, #6366F1, #818CF8)' }}></div>
          </div>
          <p className="text-gray-400 text-sm mt-2 text-center">Ventas de los últimos 6 meses</p>
        </div>

        {/* Gráfico de Balance Financiero (simulado) - Diseño Mejorado */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-bold text-gray-100 mb-4">Balance Financiero</h4>
          <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center relative">
            {/* Gráfico de pastel con efecto 3D y sombra */}
            <div className="relative w-32 h-32 rounded-full shadow-xl" style={{
              background: `conic-gradient(#10B981 0% 70%, #EF4444 70% 100%)`,
              transform: 'rotateX(45deg) scale(1.1)', // Efecto 3D
              transformOrigin: 'center',
            }}>
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold" style={{ transform: 'rotateX(-45deg)' }}>
                80%
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2 text-center">Ingresos vs Egresos</p>
        </div>

        {/* Gráfico de Stock de Garrafones (simulado) - Diseño Mejorado */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-bold text-gray-100 mb-4">Stock de Garrafones</h4>
          <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Líneas de fondo para referencia */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 px-4">
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
              <div className="h-px bg-gray-600 w-full"></div>
            </div>
            {/* Gráfico de línea con puntos destacados y gradiente */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                points="0,80 20,60 40,70 60,50 80,65 100,40"
              />
              <circle cx="0" cy="80" r="3" fill="#3B82F6" stroke="#1F2937" strokeWidth="1.5" />
              <circle cx="20" cy="60" r="3" fill="#3B82F6" stroke="#1F2937" strokeWidth="1.5" />
              <circle cx="40" cy="70" r="3" fill="#3B82F6" stroke="#1F2937" strokeWidth="1.5" />
              <circle cx="60" cy="50" r="3" fill="#3B82F6" stroke="#1F2937" strokeWidth="1.5" />
              <circle cx="80" cy="65" r="3" fill="#3B82F6" stroke="#1F2937" strokeWidth="1.5" />
              <circle cx="100" cy="40" r="3" fill="#3B82F6" stroke="#1F2937" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm mt-2 text-center">Variación de stock en el tiempo</p>
        </div>

        {/* Gráfico de Pedidos por Estado (simulado) - Diseño Mejorado */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-bold text-gray-100 mb-4">Pedidos por Estado</h4>
          <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center relative">
            {/* Gráfico de dona con etiquetas y sombra */}
            <div className="relative w-32 h-32 rounded-full shadow-xl" style={{
              background: `conic-gradient(#3B82F6 0% 50%, #F59E0B 50% 75%, #10B981 75% 100%)`
            }}>
              <div className="absolute inset-4 bg-gray-900 rounded-full"></div>
            </div>
            <div className="absolute text-xs text-gray-300">
              <span className="block" style={{ transform: 'translate(-50px, -30px)' }}>50% Entregado</span>
              <span className="block" style={{ transform: 'translate(40px, -10px)' }}>25% Pendiente</span>
              <span className="block" style={{ transform: 'translate(-50px, 30px)' }}>25% En Ruta</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2 text-center">Distribución de pedidos</p>
        </div>
      </div>
    </section>
  );
};

export default ReportsAndCharts;

// DONE