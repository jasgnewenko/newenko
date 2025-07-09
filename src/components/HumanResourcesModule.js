import React, { useState } from 'react';

const HumanResourcesModule = ({ currentUserRole, isOffline }) => {
  const [workers, setWorkers] = useState([
    { id: 1, name: 'Juan Pérez', rut: '11.111.111-1', dob: '1985-05-10', bloodType: 'O+', license: 'B', licenseExpiry: '2025-03-15' },
    { id: 2, name: 'María García', rut: '22.222.222-2', dob: '1990-11-20', bloodType: 'A-', license: 'B', licenseExpiry: '2024-01-20' },
  ]);

  const [newWorker, setNewWorker] = useState({ name: '', rut: '', dob: '', bloodType: '', license: '', licenseExpiry: '' });
  const [selectedWorker, setSelectedWorker] = useState(null);

  const getDaysRemaining = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getAlertClass = (daysRemaining) => {
    if (daysRemaining <= 0) return 'bg-red-500 text-white';
    if (daysRemaining <= 7) return 'bg-yellow-500 text-gray-900';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const handleAddWorker = (e) => {
    e.preventDefault();
    if (newWorker.name && newWorker.rut && newWorker.dob && newWorker.bloodType && newWorker.license && newWorker.licenseExpiry) {
      setWorkers([...workers, { ...newWorker, id: Date.now() }]);
      setNewWorker({ name: '', rut: '', dob: '', bloodType: '', license: '', licenseExpiry: '' });
    } else {
      alert('Por favor, completa todos los campos del trabajador.');
    }
  };

  const handleEditWorker = (worker) => {
    setSelectedWorker({ ...worker });
  };

  const handleUpdateWorker = (e) => {
    e.preventDefault();
    if (selectedWorker.name && selectedWorker.rut && selectedWorker.dob && selectedWorker.bloodType && selectedWorker.license && selectedWorker.licenseExpiry) {
      setWorkers(workers.map(worker =>
        worker.id === selectedWorker.id ? { ...selectedWorker } : worker
      ));
      setSelectedWorker(null);
    } else {
      alert('Por favor, completa todos los campos obligatorios del trabajador.');
    }
  };

  const gptHRManagerAssistant = "¡Hola! Soy tu Encargado de Recursos Humanos. Aquí puedes gestionar la información de tus trabajadores. Es importante mantener al día los datos personales y las fechas de vencimiento de licencias para evitar problemas. ¡Revisa las alertas y asegúrate de que todos estén en regla!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Recursos Humanos</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptHRManagerAssistant}</p>
      </div>

      {currentUserRole === 'Administrador' && (
        <>
          {selectedWorker ? (
            <>
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Editar Trabajador: {selectedWorker.name}</h3>
              <form onSubmit={handleUpdateWorker} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
                <div>
                  <label htmlFor="editWorkerName" className="block text-gray-300 text-sm font-bold mb-2">Nombre Completo:</label>
                  <input type="text" id="editWorkerName" name="name" value={selectedWorker.name} onChange={(e) => setSelectedWorker({ ...selectedWorker, name: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="editWorkerRut" className="block text-gray-300 text-sm font-bold mb-2">RUT:</label>
                  <input type="text" id="editWorkerRut" name="rut" value={selectedWorker.rut} onChange={(e) => setSelectedWorker({ ...selectedWorker, rut: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="editWorkerDob" className="block text-gray-300 text-sm font-bold mb-2">Fecha Nacimiento:</label>
                  <input type="date" id="editWorkerDob" name="dob" value={selectedWorker.dob} onChange={(e) => setSelectedWorker({ ...selectedWorker, dob: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="editWorkerBloodType" className="block text-gray-300 text-sm font-bold mb-2">Grupo Sanguíneo:</label>
                  <input type="text" id="editWorkerBloodType" name="bloodType" value={selectedWorker.bloodType} onChange={(e) => setSelectedWorker({ ...selectedWorker, bloodType: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="editWorkerLicense" className="block text-gray-300 text-sm font-bold mb-2">Licencia de Conducir:</label>
                  <input type="text" id="editWorkerLicense" name="license" value={selectedWorker.license} onChange={(e) => setSelectedWorker({ ...selectedWorker, license: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="editWorkerLicenseExpiry" className="block text-gray-300 text-sm font-bold mb-2">Vencimiento Licencia:</label>
                  <input type="date" id="editWorkerLicenseExpiry" name="licenseExpiry" value={selectedWorker.licenseExpiry} onChange={(e) => setSelectedWorker({ ...selectedWorker, licenseExpiry: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div className="md:col-span-2 flex justify-end space-x-4">
                  <button type="button" onClick={() => setSelectedWorker(null)} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-md">Cancelar</button>
                  <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md" disabled={isOffline}>Actualizar Trabajador</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Agregar Nuevo Trabajador</h3>
              <form onSubmit={handleAddWorker} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
                <div>
                  <label htmlFor="newWorkerName" className="block text-gray-300 text-sm font-bold mb-2">Nombre Completo:</label>
                  <input type="text" id="newWorkerName" name="name" value={newWorker.name} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="newWorkerRut" className="block text-gray-300 text-sm font-bold mb-2">RUT:</label>
                  <input type="text" id="newWorkerRut" name="rut" value={newWorker.rut} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="newWorkerDob" className="block text-gray-300 text-sm font-bold mb-2">Fecha Nacimiento:</label>
                  <input type="date" id="newWorkerDob" name="dob" value={newWorker.dob} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="newWorkerBloodType" className="block text-gray-300 text-sm font-bold mb-2">Grupo Sanguíneo:</label>
                  <input type="text" id="newWorkerBloodType" name="bloodType" value={newWorker.bloodType} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="newWorkerLicense" className="block text-gray-300 text-sm font-bold mb-2">Licencia de Conducir:</label>
                  <input type="text" id="newWorkerLicense" name="license" value={newWorker.license} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="newWorkerLicenseExpiry" className="block text-gray-300 text-sm font-bold mb-2">Vencimiento Licencia:</label>
                  <input type="date" id="newWorkerLicenseExpiry" name="licenseExpiry" value={newWorker.licenseExpiry} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md" disabled={isOffline}>Agregar Trabajador</button>
                </div>
              </form>
            </>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nombre Completo</th>
                  <th className="py-3 px-6 text-left">RUT</th>
                  <th className="py-3 px-6 text-left">Fecha Nac.</th>
                  <th className="py-3 px-6 text-left">Grupo Sang.</th>
                  <th className="py-3 px-6 text-left">Licencia</th>
                  <th className="py-3 px-6 text-left">Vencimiento Licencia</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-200 text-sm font-light">
                {workers.map(worker => (
                  <tr key={worker.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{worker.name}</td>
                    <td className="py-3 px-6 text-left">{worker.rut}</td>
                    <td className="py-3 px-6 text-left">{worker.dob}</td>
                    <td className="py-3 px-6 text-left">{worker.bloodType}</td>
                    <td className="py-3 px-6 text-left">{worker.license}</td>
                    <td className={`py-3 px-6 text-left ${getAlertClass(getDaysRemaining(worker.licenseExpiry))}`}>
                      {worker.licenseExpiry} ({getDaysRemaining(worker.licenseExpiry)} días)
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button onClick={() => handleEditWorker(worker)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors" disabled={isOffline}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {currentUserRole !== 'Administrador' && <p className="text-red-400 text-sm mt-4 text-center">Solo los administradores pueden acceder al módulo de Recursos Humanos.</p>}
      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">Los datos de Recursos Humanos pueden no estar actualizados en modo offline.</p>}
    </section>
  );
};

export default HumanResourcesModule;