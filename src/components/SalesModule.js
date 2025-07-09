import React, { useState } from 'react';

const SalesModule = ({ sales, setSales, currentUserRole, isOffline }) => {
  const [newSale, setNewSale] = useState({
    client: '',
    products: [{ name: '', quantity: 1, unitValue: 0 }],
    paymentType: 'efectivo',
    documentType: 'boleta',
    paymentStatus: 'pagado',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = newSale.products.map((product, i) =>
      i === index ? { ...product, [name]: parseInt(value) || 0 } : product // Valores enteros
    );
    setNewSale({ ...newSale, products: updatedProducts });
  };

  const addProductField = () => {
    setNewSale({
      ...newSale,
      products: [...newSale.products, { name: '', quantity: 1, unitValue: 0 }],
    });
  };

  const removeProductField = (index) => {
    const updatedProducts = newSale.products.filter((_, i) => i !== index);
    setNewSale({ ...newSale, products: updatedProducts });
  };

  const calculateProductTotal = (product) => {
    return (parseInt(product.quantity) || 0) * (parseInt(product.unitValue) || 0); // Valores enteros
  };

  const calculateGrandTotal = () => {
    return newSale.products.reduce((sum, product) => sum + calculateProductTotal(product), 0);
  };

  const handleAddSale = (e) => {
    e.preventDefault();
    if (currentUserRole === 'Vendedor' || currentUserRole === 'Administrador') {
      if (newSale.client && newSale.products.every(p => p.name && p.quantity > 0 && p.unitValue >= 0)) {
        setSales([...sales, { ...newSale, id: Date.now(), date: new Date().toLocaleDateString(), totalAmount: calculateGrandTotal() }]);
        setNewSale({ client: '', products: [{ name: '', quantity: 1, unitValue: 0 }], paymentType: 'efectivo', documentType: 'boleta', paymentStatus: 'pagado' });
      } else {
        alert('Por favor, completa todos los campos de la venta y los productos.');
      }
    } else {
      alert('No tienes permiso para registrar ventas.');
    }
  };

  const getDailySales = () => {
    const today = new Date().toLocaleDateString();
    return sales.filter(sale => sale.date === today).reduce((acc, sale) => acc + parseFloat(sale.totalAmount), 0);
  };

  const getWeeklySales = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return sales.filter(sale => new Date(sale.date) >= oneWeekAgo).reduce((acc, sale) => acc + parseFloat(sale.totalAmount), 0);
  };

  const getMonthlySales = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return sales.filter(sale => new Date(sale.date) >= oneMonthAgo).reduce((acc, sale) => acc + parseFloat(sale.totalAmount), 0);
  };

  const getAnnualSales = () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return sales.filter(sale => new Date(sale.date) >= oneYearAgo).reduce((acc, sale) => acc + parseFloat(sale.totalAmount), 0);
  };

  const gptSalesAssistant = "¡Hola! Soy tu Encargado de Ventas. Aquí puedes registrar todas tus ventas, incluyendo múltiples productos, tipo de documento y forma de pago. Un buen registro nos ayuda a ver quiénes son nuestros mejores clientes y qué productos se venden más. ¡Si tienes dudas sobre cómo categorizar una venta o cómo ofrecer un descuento, pregúntame!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Ventas</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptSalesAssistant}</p>
      </div>

      {(currentUserRole === 'Vendedor' || currentUserRole === 'Administrador') && (
        <form onSubmit={handleAddSale} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
          <div>
            <label htmlFor="client" className="block text-gray-300 text-sm font-bold mb-2">Cliente/Empresa:</label>
            <input
              type="text"
              id="client"
              name="client"
              value={newSale.client}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Nombre del cliente o empresa"
              required
              disabled={isOffline}
            />
          </div>
          <div>
            <label htmlFor="documentType" className="block text-gray-300 text-sm font-bold mb-2">Tipo de Documento:</label>
            <select
              id="documentType"
              name="documentType"
              value={newSale.documentType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={isOffline}
            >
              <option value="boleta">Boleta</option>
              <option value="factura">Factura</option>
            </select>
          </div>
          <div>
            <label htmlFor="paymentType" className="block text-gray-300 text-sm font-bold mb-2">Tipo de Pago:</label>
            <select
              id="paymentType"
              name="paymentType"
              value={newSale.paymentType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={isOffline}
            >
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta_debito">Tarjeta de Débito</option>
              <option value="tarjeta_credito">Tarjeta de Crédito</option>
            </select>
          </div>
          <div>
            <label htmlFor="paymentStatus" className="block text-gray-300 text-sm font-bold mb-2">Estado de Pago:</label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={newSale.paymentStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={isOffline}
            >
              <option value="pagado">Pagado</option>
              <option value="por pagar">Por Pagar</option>
            </select>
          </div>

          <div className="md:col-span-2 mt-4">
            <h4 className="text-lg font-semibold text-gray-200 mb-2">Productos de la Venta</h4>
            {newSale.products.map((product, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2 p-2 bg-gray-700 rounded-lg">
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, e)}
                  className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Nombre Producto"
                  disabled={isOffline}
                />
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, e)}
                  className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Cantidad"
                  min="1"
                  step="1" // Asegura que sea entero
                  disabled={isOffline}
                />
                <input
                  type="number"
                  name="unitValue"
                  value={product.unitValue}
                  onChange={(e) => handleProductChange(index, e)}
                  className="px-3 py-1 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Valor Unitario"
                  min="0"
                  step="1" // Asegura que sea entero
                  disabled={isOffline}
                />
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">${calculateProductTotal(product).toFixed(0)}</span> {/* Mostrar entero */}
                  {newSale.products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProductField(index)}
                      className="text-red-400 hover:text-red-600 transition-colors focus:outline-none"
                      disabled={isOffline}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addProductField}
              className="w-full bg-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold mt-2"
              disabled={isOffline}
            >
              + Agregar Otro Producto
            </button>
            <p className="text-right text-white text-lg font-bold mt-4">Total General: ${calculateGrandTotal().toFixed(0)}</p> {/* Mostrar entero */}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
              disabled={isOffline}
            >
              Registrar Venta
            </button>
            {isOffline && <p className="text-red-400 text-sm mt-2 text-center">No puedes registrar ventas en modo offline.</p>}
          </div>
        </form>
      )}

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Resumen de Ventas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-400 text-sm">Ventas Diarias</p>
          <p className="text-white text-2xl font-bold">${getDailySales().toFixed(0)}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-400 text-sm">Ventas Semanales</p>
          <p className="text-white text-2xl font-bold">${getWeeklySales().toFixed(0)}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-400 text-sm">Ventas Mensuales</p>
          <p className="text-white text-2xl font-bold">${getMonthlySales().toFixed(0)}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-400 text-sm">Ventas Anuales</p>
          <p className="text-white text-2xl font-bold">${getAnnualSales().toFixed(0)}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Ventas Registradas</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Fecha</th>
              <th className="py-3 px-6 text-left">Cliente</th>
              <th className="py-3 px-6 text-left">Productos</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Tipo Doc.</th>
              <th className="py-3 px-6 text-left">Tipo Pago</th>
              <th className="py-3 px-6 text-left">Estado Pago</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {sales.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 px-6 text-center text-gray-400">No hay ventas registradas.</td>
              </tr>
            ) : (
              sales.map(sale => (
                <tr key={sale.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{sale.date}</td>
                  <td className="py-3 px-6 text-left">{sale.client}</td>
                  <td className="py-3 px-6 text-left">
                    {sale.products.map((p, idx) => (
                      <div key={idx}>{p.name} ({p.quantity}x ${p.unitValue})</div>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-left">${parseFloat(sale.totalAmount).toFixed(0)}</td>
                  <td className="py-3 px-6 text-left">{sale.documentType}</td>
                  <td className="py-3 px-6 text-left">{sale.paymentType}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${sale.paymentStatus === 'pagado' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {sale.paymentStatus}
                    </span>
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

export default SalesModule;