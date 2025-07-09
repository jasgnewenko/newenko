import React, { useState } from 'react';

const InvoiceEntry = () => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    provider: '',
    amount: '',
    date: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (newInvoice.provider && newInvoice.amount && newInvoice.date) {
      setInvoices([...invoices, { ...newInvoice, id: Date.now() }]);
      setNewInvoice({ provider: '', amount: '', date: '', description: '' });
    }
  };

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Ingreso de Facturas</h2>

      <form onSubmit={handleAddInvoice} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          >
            Agregar Factura
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Facturas Registradas</h3>
      <div className="overflow-x-auto">
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
                <td colSpan="4" className="py-4 px-6 text-center text-gray-400">No hay facturas registradas.</td>
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
    </section>
  );
};

export default InvoiceEntry;