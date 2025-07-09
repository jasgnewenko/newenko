import React from 'react';

const SettingsModule = ({ currentUserRole, isOffline }) => {
  const gptSettingsAssistant = "¡Hola! Soy tu Encargado de Configuración. Aquí puedes personalizar tu aplicación para que se adapte perfectamente a tu negocio. Desde el logo hasta los impuestos, ¡todo a tu medida! Si tienes dudas sobre alguna opción, ¡aquí estoy para guiarte!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Configuración Empresarial Avanzada</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptSettingsAssistant}</p>
      </div>

      {currentUserRole === 'Administrador' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-100 mb-4">Información General</h3>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-gray-300 text-sm font-bold mb-2">Nombre Comercial:</label>
              <input type="text" id="companyName" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Aguas Newenko S.A." disabled={isOffline} />
            </div>
            <div className="mb-4">
              <label htmlFor="logoUpload" className="block text-gray-300 text-sm font-bold mb-2">Logo:</label>
              <input type="file" id="logoUpload" className="w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" disabled={isOffline} />
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-100 mb-4">Opciones de Negocio</h3>
            <div className="mb-4">
              <label htmlFor="taxType" className="block text-gray-300 text-sm font-bold mb-2">Tipo de Impuesto:</label>
              <select id="taxType" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" disabled={isOffline}>
                <option>IVA Incluido</option>
                <option>IVA Excluido</option>
                <option>Sin Impuesto</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="warehouses" className="block text-gray-300 text-sm font-bold mb-2">Bodegas/Sucursales:</label>
              <input type="text" id="warehouses" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Principal, Sucursal A, Sucursal B" disabled={isOffline} />
            </div>
          </div>
        </div>
      )}
      {currentUserRole !== 'Administrador' && <p className="text-red-400 text-sm mt-4 text-center">Solo los administradores pueden acceder a la configuración.</p>}
      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">La configuración no se puede modificar en modo offline.</p>}
    </section>
  );
};

export default SettingsModule;