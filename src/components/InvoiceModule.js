import React, { useState } from 'react';

const InvoiceModule = ({ currentUserRole, isOffline }) => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    provider: '',
    amount: '',
    date: '',
    description: ''
  });
  const [clientInvoices, setClientInvoices] = useState([
    { id: 1, clientName: 'Cliente A', clientRut: '11.111.111-1', products: [{ name: 'Garrafón 20L', value: 50 }], total: 50, status: 'realizada', invoiceNumber: 'F0001' },
    { id: 2, clientName: 'Cliente B', clientRut: '22.222.222-2', products: [{ name: 'Botella 1L', value: 10 }], total: 10, status: 'pendiente', invoiceNumber: '' },
    { id: 3, clientName: 'Cliente C', clientRut: '33.333.333-3', products: [{ name: 'Garrafón 10L', value: 30 }, { name: 'Botella 1L', value: 10 }], total: 40, status: 'acumulable', invoiceNumber: '' },
  ]);
  const [selectedClientInvoice, setSelectedClientInvoice] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (currentUserRole === 'Contador' || currentUserRole === 'Administrador') {
      if (newInvoice.provider && newInvoice.amount && newInvoice.date) {
        setInvoices([...invoices, { ...newInvoice, id: Date.now() }]);
        setNewInvoice({ provider: '', amount: '', date: '', description: '' });
      }
    } else {
      alert('No tienes permiso para registrar facturas de egreso.');
    }
  };

  const handleClientInvoiceStatusChange = (id, newStatus) => {
    if (currentUserRole === 'Administrador' || currentUserRole === 'Vendedor' || currentUserRole === 'Repartidor') {
      setClientInvoices(clientInvoices.map(inv =>
        inv.id === id ? { ...inv, status: newStatus } : inv
      ));
    } else {
      alert('No tienes permiso para cambiar el estado de las facturas a clientes.');
    }
  };

  const handleClientInvoiceNumberChange = (id, newNumber) => {
    if (currentUserRole === 'Administrador' || currentUserRole === 'Vendedor' || currentUserRole === 'Repartidor') {
      setClientInvoices(clientInvoices.map(inv =>
        inv.id === id ? { ...inv, invoiceNumber: newNumber } : inv
      ));
    } else {
      alert('No tienes permiso para ingresar números de factura.');
    }
  };

  const handleCloseAccumulationCycle = (clientId) => {
    if (currentUserRole === 'Administrador' || currentUserRole === 'Contador') {
      const clientAccumulables = clientInvoices.filter(inv => inv.clientName === clientId && inv.status === 'acumulable');
      if (clientAccumulables.length > 0) {
        const totalAccumulated = clientAccumulables.reduce((sum, inv) => sum + inv.total, 0);
        const productsAccumulated = clientAccumulables.flatMap(inv => inv.products);
        
        // Crear una nueva factura "realizada" con el total acumulado
        const newRealizedInvoice = {
          id: Date.now(),
          clientName: clientId,
          clientRut: clientAccumulables[0].clientRut, // Asumimos el mismo RUT
          products: productsAccumulated,
          total: totalAccumulated,
          status: 'realizada',
          invoiceNumber: `F${Date.now().toString().slice(-4)}` // Generar un número de factura
        };
        setClientInvoices(prev => [
          ...prev.filter(inv => !(inv.clientName === clientId && inv.status === 'acumulable')),
          newRealizedInvoice
        ]);
        alert(`Ciclo de acumulación cerrado para ${clientId}. Factura total de $${totalAccumulated} generada.`);
      } else {
        alert(`No hay facturas acumulables para ${clientId}.`);
      }
    } else {
      alert('No tienes permiso para cerrar ciclos de acumulación.');
    }
  };

  const gptInvoiceAssistant = "¡Hola! Soy tu Encargado de Facturas. Aquí puedes registrar los gastos de la empresa y gestionar las facturas a clientes. Es crucial llevar un control de las facturas emitidas y por emitir para una contabilidad clara. ¡Si necesitas cerrar un ciclo de acumulación o registrar una factura, pregúntame!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Facturas</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptInvoiceAssistant}</p>
      </div>

      {/* Sección de Facturas de Egreso (Gastos de la empresa) */}
      {(currentUserRole === 'Contador' || currentUserRole === 'Administrador') && (
        <>
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Ingreso de Facturas de Egreso</h3>
          <form onSubmit={handleAddInvoice} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
            <div>
              <label htmlFor="provider" className="block text-gray-300 text-sm font-bold mb-2">Proveedor:</label>
              <input
                type="text"
                id="provider"
                name="provider"
                value={newInvoice.provider}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Nombre del proveedor"
                required
                disabled={isOffline}
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">Monto:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={newInvoice.amount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Monto de la factura"
                required
                disabled={isOffline}
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-300 text-sm font-bold mb-2">Fecha:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newInvoice.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                disabled={isOffline}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">Descripción (Opcional):</label>
              <textarea
                id="description"
                name="description"
                value={newInvoice.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                placeholder="Detalles de la factura"
                disabled={isOffline}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                disabled={isOffline}
              >
                Agregar Factura de Egreso
              </button>
              {isOffline && <p className="text-red-400 text-sm mt-2 text-center">No puedes agregar facturas en modo offline.</p>}
            </div>
          </form>

          <h3 className="text-xl font-semibold text-gray-200 mb-4">Facturas de Egreso Registradas</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Proveedor</th>
                  <th className="py-3 px-6 text-left">Monto</th>
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-left">Descripción</th>
                </tr>
              </thead>
              <tbody className="text-gray-200 text-sm font-light">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 px-6 text-center text-gray-400">No hay facturas de egreso registradas.</td>
                  </tr>
                ) : (
                  invoices.map(invoice => (
                    <tr key={invoice.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{invoice.provider}</td>
                      <td className="py-3 px-6 text-left">${invoice.amount}</td>
                      <td className="py-3 px-6 text-left">{invoice.date}</td>
                      <td className="py-3 px-6 text-left">{invoice.description || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Sección de Facturas a Clientes */}
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Facturas a Clientes</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Cliente</th>
              <th className="py-3 px-6 text-left">RUT</th>
              <th className="py-3 px-6 text-left">Productos</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Nro. Factura</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {clientInvoices.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 px-6 text-center text-gray-400">No hay facturas a clientes registradas.</td>
              </tr>
            ) : (
              clientInvoices.map(inv => (
                <tr key={inv.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{inv.clientName}</td>
                  <td className="py-3 px-6 text-left">{inv.clientRut}</td>
                  <td className="py-3 px-6 text-left">
                    {inv.products.map((p, idx) => (
                      <div key={idx}>{p.name} (${p.value})</div>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-left">${inv.total.toFixed(2)}</td>
                  <td className="py-3 px-6 text-left">
                    <select
                      value={inv.status}
                      onChange={(e) => handleClientInvoiceStatusChange(inv.id, e.target.value)}
                      className="py-1 px-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      disabled={isOffline || !(currentUserRole === 'Administrador' || currentUserRole === 'Vendedor' || currentUserRole === 'Repartidor')}
                    >
                      <option value="realizada">Realizada</option>
                      <option value="pendiente">Pendiente por Realizar</option>
                      <option value="acumulable">Acumulable</option>
                    </select>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="text"
                      value={inv.invoiceNumber}
                      onChange={(e) => handleClientInvoiceNumberChange(inv.id, e.target.value)}
                      className="w-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Nro. Factura"
                      disabled={isOffline || !(currentUserRole === 'Administrador' || currentUserRole === 'Vendedor' || currentUserRole === 'Repartidor')}
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => setSelectedClientInvoice(inv)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
                    >
                      Ver Detalle
                    </button>
                    {inv.status === 'acumulable' && (currentUserRole === 'Administrador' || currentUserRole === 'Contador') && (
                      <button
                        onClick={() => handleCloseAccumulationCycle(inv.clientName)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md transition-colors ml-2"
                        disabled={isOffline}
                      >
                        Cerrar Ciclo
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedClientInvoice && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-lg border border-gray-700">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Detalle de Factura a Cliente</h3>
            <p className="text-gray-300 mb-2"><strong>Cliente:</strong> {selectedClientInvoice.clientName}</p>
            <p className="text-gray-300 mb-2"><strong>RUT:</strong> {selectedClientInvoice.clientRut}</p>
            <p className="text-gray-300 mb-2"><strong>Estado:</strong> {selectedClientInvoice.status}</p>
            <p className="text-gray-300 mb-2"><strong>Nro. Factura:</strong> {selectedClientInvoice.invoiceNumber || 'N/A'}</p>
            <h4 className="text-lg font-semibold text-gray-200 mt-4 mb-2">Productos:</h4>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              {selectedClientInvoice.products.map((p, idx) => (
                <li key={idx}>{p.name} - ${p.value.toFixed(2)}</li>
              ))}
            </ul>
            <p className="text-white text-lg font-bold">Total: ${selectedClientInvoice.total.toFixed(2)}</p>
            <button
              onClick={() => setSelectedClientInvoice(null)}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">Los datos de facturas a clientes pueden no estar actualizados en modo offline.</p>}
    </section>
  );
};

export default InvoiceModule;