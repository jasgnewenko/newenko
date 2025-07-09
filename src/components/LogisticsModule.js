import React, { useState } from 'react';

const LogisticsModule = ({ currentUserRole, isOffline }) => {
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: 'ABCD12', circulationPermit: '2024-12-31', insurance: '2024-11-15', techReview: '2024-10-20' },
    { id: 2, plate: 'EFGH34', circulationPermit: '2025-01-31', insurance: '2024-10-01', techReview: '2024-09-25' },
  ]);

  const [filters, setFilters] = useState([
    { id: 1, category: 'Filtro de Agua Principal', lastChange: '2024-01-01', nextChange: '2024-04-01' },
    { id: 2, category: 'Filtro de Sedimentos', lastChange: '2024-02-15', nextChange: '2024-05-15' },
  ]);

  const [routes, setRoutes] = useState([
    { id: 1, name: 'Ruta Norte', vehiclePlate: 'ABCD12', driver: 'Juan Pérez', stops: 5, status: 'Activa' },
    { id: 2, name: 'Ruta Sur', vehiclePlate: 'EFGH34', driver: 'María García', stops: 8, status: 'Pendiente' },
  ]);

  const [newVehicle, setNewVehicle] = useState({ plate: '', circulationPermit: '', insurance: '', techReview: '' });
  const [newFilter, setNewFilter] = useState({ category: '', lastChange: '', nextChange: '' });
  const [newRoute, setNewRoute] = useState({ name: '', vehiclePlate: '', driver: '', stops: '', status: 'Pendiente' });

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

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (newVehicle.plate && newVehicle.circulationPermit && newVehicle.insurance && newVehicle.techReview) {
      setVehicles([...vehicles, { ...newVehicle, id: Date.now() }]);
      setNewVehicle({ plate: '', circulationPermit: '', insurance: '', techReview: '' });
    } else {
      alert('Por favor, completa todos los campos del vehículo.');
    }
  };

  const handleAddFilter = (e) => {
    e.preventDefault();
    if (newFilter.category && newFilter.lastChange && newFilter.nextChange) {
      setFilters([...filters, { ...newFilter, id: Date.now() }]);
      setNewFilter({ category: '', lastChange: '', nextChange: '' });
    } else {
      alert('Por favor, completa todos los campos del filtro.');
    }
  };

  const handleAddRoute = (e) => {
    e.preventDefault();
    if (newRoute.name && newRoute.vehiclePlate && newRoute.driver && newRoute.stops) {
      setRoutes([...routes, { ...newRoute, id: Date.now() }]);
      setNewRoute({ name: '', vehiclePlate: '', driver: '', stops: '', status: 'Pendiente' });
    } else {
      alert('Por favor, completa todos los campos de la ruta.');
    }
  };

  const handleRouteStatusChange = (id, newStatus) => {
    setRoutes(routes.map(route =>
      route.id === id ? { ...route, status: newStatus } : route
    ));
  };

  const gptLogisticsAssistant = "¡Hola! Soy tu Encargado de Logística. Aquí puedes gestionar la documentación de tus vehículos, el recambio de filtros y planificar tus rutas. Es vital mantener todo al día para evitar multas, asegurar la calidad del agua y optimizar las entregas. ¡Revisa las alertas y planifica tus mantenimientos y rutas!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Logística</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptLogisticsAssistant}</p>
      </div>

      {currentUserRole === 'Administrador' && (
        <>
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Gestión de Vehículos</h3>
          <form onSubmit={handleAddVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
            <div>
              <label htmlFor="newVehiclePlate" className="block text-gray-300 text-sm font-bold mb-2">Patente:</label>
              <input type="text" id="newVehiclePlate" name="plate" value={newVehicle.plate} onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div>
              <label htmlFor="newVehicleCirculation" className="block text-gray-300 text-sm font-bold mb-2">Permiso Circulación:</label>
              <input type="date" id="newVehicleCirculation" name="circulationPermit" value={newVehicle.circulationPermit} onChange={(e) => setNewVehicle({ ...newVehicle, circulationPermit: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div>
              <label htmlFor="newVehicleInsurance" className="block text-gray-300 text-sm font-bold mb-2">Seguro Obligatorio:</label>
              <input type="date" id="newVehicleInsurance" name="insurance" value={newVehicle.insurance} onChange={(e) => setNewVehicle({ ...newVehicle, insurance: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div>
              <label htmlFor="newVehicleTechReview" className="block text-gray-300 text-sm font-bold mb-2">Revisión Técnica:</label>
              <input type="date" id="newVehicleTechReview" name="techReview" value={newVehicle.techReview} onChange={(e) => setNewVehicle({ ...newVehicle, techReview: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md" disabled={isOffline}>Agregar Vehículo</button>
            </div>
          </form>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Patente</th>
                  <th className="py-3 px-6 text-left">Permiso Circulación</th>
                  <th className="py-3 px-6 text-left">Seguro Obligatorio</th>
                  <th className="py-3 px-6 text-left">Revisión Técnica</th>
                </tr>
              </thead>
              <tbody className="text-gray-200 text-sm font-light">
                {vehicles.map(vehicle => (
                  <tr key={vehicle.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <td className="py-3 px-6 text-left">{vehicle.plate}</td>
                    <td className={`py-3 px-6 text-left ${getAlertClass(getDaysRemaining(vehicle.circulationPermit))}`}>
                      {vehicle.circulationPermit} ({getDaysRemaining(vehicle.circulationPermit)} días)
                    </td>
                    <td className={`py-3 px-6 text-left ${getAlertClass(getDaysRemaining(vehicle.insurance))}`}>
                      {vehicle.insurance} ({getDaysRemaining(vehicle.insurance)} días)
                    </td>
                    <td className={`py-3 px-6 text-left ${getAlertClass(getDaysRemaining(vehicle.techReview))}`}>
                      {vehicle.techReview} ({getDaysRemaining(vehicle.techReview)} días)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-200 mb-4">Gestión de Filtros</h3>
          <form onSubmit={handleAddFilter} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
            <div>
              <label htmlFor="newFilterCategory" className="block text-gray-300 text-sm font-bold mb-2">Categoría de Filtro:</label>
              <input type="text" id="newFilterCategory" name="category" value={newFilter.category} onChange={(e) => setNewFilter({ ...newFilter, category: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div>
              <label htmlFor="newFilterLastChange" className="block text-gray-300 text-sm font-bold mb-2">Último Recambio:</label>
              <input type="date" id="newFilterLastChange" name="lastChange" value={newFilter.lastChange} onChange={(e) => setNewFilter({ ...newFilter, lastChange: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div>
              <label htmlFor="newFilterNextChange" className="block text-gray-300 text-sm font-bold mb-2">Próximo Recambio:</label>
              <input type="date" id="newFilterNextChange" name="nextChange" value={newFilter.nextChange} onChange={(e) => setNewFilter({ ...newFilter, nextChange: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md" disabled={isOffline}>Agregar Filtro</button>
            </div>
          </form>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Categoría de Filtro</th>
                  <th className="py-3 px-6 text-left">Último Recambio</th>
                  <th className="py-3 px-6 text-left">Próximo Recambio</th>
                </tr>
              </thead>
              <tbody className="text-gray-200 text-sm font-light">
                {filters.map(filter => (
                  <tr key={filter.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <td className="py-3 px-6 text-left">{filter.category}</td>
                    <td className="py-3 px-6 text-left">{filter.lastChange}</td>
                    <td className={`py-3 px-6 text-left ${getAlertClass(getDaysRemaining(filter.nextChange) - 3)}`}>
                      {filter.nextChange} ({getDaysRemaining(filter.nextChange)} días)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-200 mb-4">Gestión de Rutas</h3>
          <form onSubmit={handleAddRoute} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
            <div>
              <label htmlFor="newRouteName" className="block text-gray-300 text-sm font-bold mb-2">Nombre Ruta:</label>
              <input type="text" id="newRouteName" name="name" value={newRoute.name} onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div>
              <label htmlFor="newRouteVehicle" className="block text-gray-300 text-sm font-bold mb-2">Patente Vehículo:</label>
              <select id="newRouteVehicle" name="vehiclePlate" value={newRoute.vehiclePlate} onChange={(e) => setNewRoute({ ...newRoute, vehiclePlate: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline}>
                <option value="">Selecciona Patente</option>
                {vehicles.map(v => <option key={v.id} value={v.plate}>{v.plate}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="newRouteDriver" className="block text-gray-300 text-sm font-bold mb-2">Conductor:</label>
              <input type="text" id="newRouteDriver" name="driver" value={newRoute.driver} onChange={(e) => setNewRoute({ ...newRoute, driver: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div>
              <label htmlFor="newRouteStops" className="block text-gray-300 text-sm font-bold mb-2">Paradas:</label>
              <input type="number" id="newRouteStops" name="stops" value={newRoute.stops} onChange={(e) => setNewRoute({ ...newRoute, stops: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md" disabled={isOffline}>Agregar Ruta</button>
            </div>
          </form>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nombre Ruta</th>
                  <th className="py-3 px-6 text-left">Patente Vehículo</th>
                  <th className="py-3 px-6 text-left">Conductor</th>
                  <th className="py-3 px-6 text-left">Paradas</th>
                  <th className="py-3 px-6 text-left">Estado</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-200 text-sm font-light">
                {routes.map(route => (
                  <tr key={route.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <td className="py-3 px-6 text-left">{route.name}</td>
                    <td className="py-3 px-6 text-left">{route.vehiclePlate}</td>
                    <td className="py-3 px-6 text-left">{route.driver}</td>
                    <td className="py-3 px-6 text-left">{route.stops}</td>
                    <td className="py-3 px-6 text-left">
                      <select
                        value={route.status}
                        onChange={(e) => handleRouteStatusChange(route.id, e.target.value)}
                        className="py-1 px-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={isOffline || !(currentUserRole === 'Administrador' || currentUserRole === 'Repartidor' || currentUserRole === 'Vendedor')}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Activa">Activa</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors" disabled={isOffline}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {currentUserRole !== 'Administrador' && <p className="text-red-400 text-sm mt-4 text-center">Solo los administradores pueden acceder al módulo de logística.</p>}
      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">Los datos de logística pueden no estar actualizados en modo offline.</p>}
    </section>
  );
};

export default LogisticsModule;