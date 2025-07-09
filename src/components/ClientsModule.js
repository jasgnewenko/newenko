import React, { useState, useEffect } from 'react';

const ClientsModule = ({ sales, orders, currentUserRole, isOffline }) => {
  const [clients, setClients] = useState([
    { id: 1, name: 'Juan Pérez', contact: 'juan@example.com', address: 'Calle Falsa 123', phone: '555-1234', totalPurchases: 0, totalAmount: 0, notes: 'Cliente frecuente, prefiere entrega por la tarde.' },
    { id: 2, name: 'María García', contact: 'maria@example.com', address: 'Av. Siempre Viva 45', phone: '555-5678', totalPurchases: 0, totalAmount: 0, notes: 'Interesada en promociones de garrafones grandes.' },
    { id: 3, name: 'Carlos Ruiz', contact: 'carlos@example.com', address: 'Blvd. de los Sueños 789', phone: '555-9012', totalPurchases: 0, totalAmount: 0, notes: 'Pago siempre con transferencia.' },
    { id: 4, name: 'Ana López', contact: 'ana@example.com', address: 'Paseo de la Reforma 10', phone: '555-3456', totalPurchases: 0, totalAmount: 0, notes: 'Cliente nuevo, primer pedido grande.' },
  ]);

  const [newClient, setNewClient] = useState({ name: '', contact: '', address: '', phone: '', notes: '' });
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const updatedClients = clients.map(client => {
      const clientSales = sales.filter(sale => sale.client === client.name);
      const clientOrders = orders.filter(order => order.client === client.name);
      const totalPurchases = clientSales.length + clientOrders.length;
      const totalAmount = clientSales.reduce((sum, sale) => sum + parseFloat(sale.totalAmount), 0) +
                          clientOrders.reduce((sum, order) => sum + parseFloat(order.deliveredAmount), 0);
      return { ...client, totalPurchases, totalAmount };
    });
    updatedClients.sort((a, b) => b.totalAmount - a.totalAmount);
    setClients(updatedClients);
  }, [sales, orders]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    if (currentUserRole === 'Administrador' || currentUserRole === 'Vendedor') {
      if (newClient.name && newClient.contact && newClient.address && newClient.phone) {
        setClients([...clients, { ...newClient, id: Date.now(), totalPurchases: 0, totalAmount: 0 }]);
        setNewClient({ name: '', contact: '', address: '', phone: '', notes: '' });
      } else {
        alert('Por favor, completa todos los campos obligatorios del cliente.');
      }
    } else {
      alert('No tienes permiso para agregar clientes.');
    }
  };

  const handleEditClient = (client) => {
    if (currentUserRole === 'Administrador' || currentUserRole === 'Vendedor') {
      setSelectedClient({ ...client });
    } else {
      alert('No tienes permiso para editar clientes.');
    }
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    if (selectedClient.name && selectedClient.contact && selectedClient.address && selectedClient.phone) {
      setClients(clients.map(client =>
        client.id === selectedClient.id ? { ...selectedClient } : client
      ));
      setSelectedClient(null);
    } else {
      alert('Por favor, completa todos los campos obligatorios del cliente.');
    }
  };

  const handleDeleteClient = (id) => {
    if (currentUserRole === 'Administrador') {
      if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
        setClients(clients.filter(client => client.id !== id));
      }
    } else {
      alert('No tienes permiso para eliminar clientes.');
    }
  };

  const gptClientsAssistant = "¡Hola! Soy tu Encargado de Clientes. Aquí tienes el listado de tus clientes, ordenados por su valor para la empresa. Puedes agregar, editar o eliminar clientes, y ver su historial de compras. Usa esta información para identificar a tus clientes más leales y ofrecerles promociones especiales. ¡Un cliente feliz es un cliente que regresa!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Clientes</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptClientsAssistant}</p>
      </div>

      {(currentUserRole === 'Administrador' || currentUserRole === 'Vendedor') && (
        <>
          {selectedClient ? (
            <>
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Editar Cliente: {selectedClient.name}</h3>
              <form onSubmit={handleUpdateClient} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
                <div>
                  <label htmlFor="editClientName" className="block text-gray-300 text-sm font-bold mb-2">Nombre:</label>
                  <input type="text" id="editClientName" name="name" value={selectedClient.name} onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="editClientContact" className="block text-gray-300 text-sm font-bold mb-2">Contacto (Email):</label>
                  <input type="email" id="editClientContact" name="contact" value={selectedClient.contact} onChange={(e) => setSelectedClient({ ...selectedClient, contact: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="editClientAddress" className="block text-gray-300 text-sm font-bold mb-2">Dirección:</label>
                  <input type="text" id="editClientAddress" name="address" value={selectedClient.address} onChange={(e) => setSelectedClient({ ...selectedClient, address: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="editClientPhone" className="block text-gray-300 text-sm font-bold mb-2">Teléfono:</label>
                  <input type="tel" id="editClientPhone" name="phone" value={selectedClient.phone} onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="editClientNotes" className="block text-gray-300 text-sm font-bold mb-2">Notas:</label>
                  <textarea id="editClientNotes" name="notes" value={selectedClient.notes} onChange={(e) => setSelectedClient({ ...selectedClient, notes: e.target.value })} rows="3" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" disabled={isOffline}></textarea>
                </div>
                <div className="md:col-span-2 flex justify-end space-x-4">
                  <button type="button" onClick={() => setSelectedClient(null)} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-md">Cancelar</button>
                  <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md" disabled={isOffline}>Actualizar Cliente</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Agregar Nuevo Cliente</h3>
              <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
                <div>
                  <label htmlFor="newClientName" className="block text-gray-300 text-sm font-bold mb-2">Nombre:</label>
                  <input type="text" id="newClientName" name="name" value={newClient.name} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="newClientContact" className="block text-gray-300 text-sm font-bold mb-2">Contacto (Email):</label>
                  <input type="email" id="newClientContact" name="contact" value={newClient.contact} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="newClientAddress" className="block text-gray-300 text-sm font-bold mb-2">Dirección:</label>
                  <input type="text" id="newClientAddress" name="address" value={newClient.address} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div>
                  <label htmlFor="newClientPhone" className="block text-gray-300 text-sm font-bold mb-2">Teléfono:</label>
                  <input type="tel" id="newClientPhone" name="phone" value={newClient.phone} onChange={handleInputChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required disabled={isOffline} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="newClientNotes" className="block text-gray-300 text-sm font-bold mb-2">Notas:</label>
                  <textarea id="newClientNotes" name="notes" value={newClient.notes} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" disabled={isOffline}></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md" disabled={isOffline}>Agregar Cliente</button>
                </div>
              </form>
            </>
          )}
        </>
      )}

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Listado de Clientes por Valor</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Contacto</th>
              <th className="py-3 px-6 text-left">Dirección</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
              <th className="py-3 px-6 text-left">Total Compras</th>
              <th className="py-3 px-6 text-left">Monto Aportado</th>
              {(currentUserRole === 'Administrador' || currentUserRole === 'Vendedor') && <th className="py-3 px-6 text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={currentUserRole === 'Administrador' || currentUserRole === 'Vendedor' ? "7" : "6"} className="py-4 px-6 text-center text-gray-400">No hay clientes registrados.</td>
              </tr>
            ) : (
              clients.map(client => (
                <tr key={client.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{client.name}</td>
                  <td className="py-3 px-6 text-left">{client.contact}</td>
                  <td className="py-3 px-6 text-left">{client.address}</td>
                  <td className="py-3 px-6 text-left">{client.phone}</td>
                  <td className="py-3 px-6 text-left">{client.totalPurchases}</td>
                  <td className="py-3 px-6 text-left">${client.totalAmount.toFixed(2)}</td>
                  {(currentUserRole === 'Administrador' || currentUserRole === 'Vendedor') && (
                    <td className="py-3 px-6 text-center space-x-2">
                      <button onClick={() => handleEditClient(client)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors" disabled={isOffline}>Editar</button>
                      {currentUserRole === 'Administrador' && (
                        <button onClick={() => handleDeleteClient(client.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors" disabled={isOffline}>Eliminar</button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">Los datos de clientes pueden no estar actualizados en modo offline.</p>}
    </section>
  );
};

export default ClientsModule;