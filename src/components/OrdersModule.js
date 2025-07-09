import React, { useState } from 'react';

const OrdersModule = ({ currentUserRole, orders, setOrders, isOffline, routesData }) => {
  const [newOrder, setNewOrder] = useState({ client: '', route: '', date: '', amount: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (currentUserRole !== 'Administrador') {
      alert('Solo los administradores pueden agregar pedidos.');
      return;
    }
    if (newOrder.client && newOrder.route && newOrder.date && newOrder.amount) {
      setOrders([...orders, { ...newOrder, id: `ORD-${Date.now()}`, status: 'Pendiente', deliveredAmount: 0 }]);
      setNewOrder({ client: '', route: '', date: '', amount: '' });
    }
  };

  const handleStatusChange = (id, newStatus) => {
    if (currentUserRole !== 'Administrador' && currentUserRole !== 'Repartidor' && currentUserRole !== 'Vendedor') {
      alert('No tienes permiso para cambiar el estado del pedido.');
      return;
    }
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeliveredAmountChange = (id, value) => {
    if (currentUserRole !== 'Administrador' && currentUserRole !== 'Repartidor' && currentUserRole !== 'Vendedor') {
      alert('No tienes permiso para cambiar el monto entregado.');
      return;
    }
    setOrders(orders.map(order =>
      order.id === id ? { ...order, deliveredAmount: parseFloat(value) || 0 } : order
    ));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Entregado':
        return 'bg-green-500';
      case 'Pendiente':
        return 'bg-yellow-500';
      case 'En Ruta':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const gptOrdersAssistant = "¡Hola! Soy tu Encargado de Pedidos. Como administrador, aquí puedes ingresar los pedidos diarios por ruta. Si eres repartidor o vendedor, puedes actualizar el estado de entrega y el monto recibido. ¡Mantener esto al día es clave para la logística!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Pedidos</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptOrdersAssistant}</p>
      </div>

      {currentUserRole === 'Administrador' && (
        <>
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Ingresar Nuevo Pedido (Solo Admin)</h3>
          <form onSubmit={handleAddOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
            <div>
              <label htmlFor="newClient" className="block text-gray-300 text-sm font-bold mb-2">Cliente:</label>
              <input
                type="text"
                id="newClient"
                name="client"
                value={newOrder.client}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Nombre del cliente"
                required
                disabled={isOffline}
              />
            </div>
            <div>
              <label htmlFor="newRoute" className="block text-gray-300 text-sm font-bold mb-2">Ruta:</label>
              <select
                id="newRoute"
                name="route"
                value={newOrder.route}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                disabled={isOffline}
              >
                <option value="">Selecciona una ruta</option>
                {routesData.map(route => (
                  <option key={route.id} value={route.name}>{route.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="newDate" className="block text-gray-300 text-sm font-bold mb-2">Fecha:</label>
              <input
                type="date"
                id="newDate"
                name="date"
                value={newOrder.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                disabled={isOffline}
              />
            </div>
            <div>
              <label htmlFor="newAmount" className="block text-gray-300 text-sm font-bold mb-2">Monto Total:</label>
              <input
                type="number"
                id="newAmount"
                name="amount"
                value={newOrder.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Monto del pedido"
                required
                disabled={isOffline}
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                disabled={isOffline}
              >
                Agregar Pedido
              </button>
              {isOffline && <p className="text-red-400 text-sm mt-2 text-center">No puedes agregar pedidos en modo offline.</p>}
            </div>
          </form>
        </>
      )}

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Listado de Pedidos</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID Pedido</th>
              <th className="py-3 px-6 text-left">Cliente</th>
              <th className="py-3 px-6 text-left">Ruta</th>
              <th className="py-3 px-6 text-left">Fecha</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Monto Total</th>
              <th className="py-3 px-6 text-left">Monto Entregado</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4 px-6 text-center text-gray-400">No hay pedidos registrados.</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                  <td className="py-3 px-6 text-left">{order.client}</td>
                  <td className="py-3 px-6 text-left">{order.route}</td>
                  <td className="py-3 px-6 text-left">{order.date}</td>
                  <td className="py-3 px-6 text-left">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusClass(order.status)} bg-opacity-75 focus:outline-none`}
                      disabled={isOffline || !(currentUserRole === 'Administrador' || currentUserRole === 'Repartidor' || currentUserRole === 'Vendedor')}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Ruta">En Ruta</option>
                      <option value="Entregado">Entregado</option>
                    </select>
                  </td>
                  <td className="py-3 px-6 text-left">${order.amount.toFixed(2)}</td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="number"
                      value={order.deliveredAmount}
                      onChange={(e) => handleDeliveredAmountChange(order.id, e.target.value)}
                      className="w-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      disabled={isOffline || !(currentUserRole === 'Administrador' || currentUserRole === 'Repartidor' || currentUserRole === 'Vendedor')}
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors">Detalles</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersModule;