import React from 'react';

const BackupAndRestore = ({ currentUserRole, isOffline }) => {
  const handleBackup = () => {
    if (currentUserRole === 'Administrador') {
      alert('Realizando respaldo de datos... (Funcionalidad de respaldo real iría aquí)');
    } else {
      alert('No tienes permiso para realizar respaldos.');
    }
  };

  const handleRestore = () => {
    if (currentUserRole === 'Administrador') {
      alert('Restaurando datos desde el último respaldo... (Funcionalidad de restauración real iría aquí)');
    } else {
      alert('No tienes permiso para restaurar datos.');
    }
  };

  const gptBackupAssistant = "¡Hola! Soy tu Encargado de Respaldo. Aquí puedes asegurar que toda tu información esté a salvo. Realiza respaldos periódicos para evitar cualquier pérdida de datos. ¡Más vale prevenir que lamentar!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Respaldo y Restauración de Datos</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptBackupAssistant}</p>
      </div>

      <div className="mb-8">
        <p className="text-gray-300 mb-4">
          Realiza respaldos periódicos de toda la información de tu negocio para asegurar la integridad y disponibilidad de tus datos.
        </p>
        <button
          onClick={handleBackup}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center justify-center"
          disabled={isOffline || currentUserRole !== 'Administrador'}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0-8a5 5 0 00-5 5v1a3 3 0 00-3 3v1h12v-1a3 3 0 00-3-3v-1a5 5 0 00-5-5z"></path>
          </svg>
          Realizar Respaldo Ahora
        </button>
        {isOffline && <p className="text-red-400 text-sm mt-2 text-center">No puedes realizar respaldos en modo offline.</p>}
        {currentUserRole !== 'Administrador' && <p className="text-red-400 text-sm mt-2 text-center">Solo los administradores pueden realizar respaldos.</p>}
      </div>

      <div>
        <p className="text-gray-300 mb-4">
          En caso de ser necesario, puedes restaurar tus datos desde un respaldo anterior.
        </p>
        <button
          onClick={handleRestore}
          className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-md flex items-center justify-center"
          disabled={isOffline || currentUserRole !== 'Administrador'}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Restaurar Datos
        </button>
        {isOffline && <p className="text-red-400 text-sm mt-2 text-center">No puedes restaurar datos en modo offline.</p>}
        {currentUserRole !== 'Administrador' && <p className="text-red-400 text-sm mt-2 text-center">Solo los administradores pueden restaurar datos.</p>}
      </div>
    </section>
  );
};

export default BackupAndRestore;