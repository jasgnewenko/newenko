import React, { useState } from 'react';

const CatalogModule = ({ currentUserRole, isOffline }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Garrafón 20L', unitValue: 50, preferredValue: 45, promotion: 'Ninguna' },
    { id: 2, name: 'Garrafón 10L', unitValue: 30, preferredValue: 28, promotion: '2x1 en la segunda compra' },
    { id: 3, name: 'Botella 1L Saborizada', unitValue: 10, preferredValue: 8, promotion: 'Compra 5 y lleva 6' },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    unitValue: '',
    preferredValue: '',
    promotion: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (currentUserRole === 'Administrador') {
      if (newProduct.name && newProduct.unitValue) {
        setProducts([...products, { ...newProduct, id: Date.now() }]);
        setNewProduct({ name: '', unitValue: '', preferredValue: '', promotion: '' });
      }
    } else {
      alert('No tienes permiso para agregar productos al catálogo.');
    }
  };

  const gptCatalogAssistant = "¡Hola! Soy tu Encargado de Catálogo Online. Aquí puedes gestionar todos los productos que tus clientes verán. Asegúrate de que los precios y promociones estén actualizados para atraer más ventas. ¡Un catálogo atractivo es clave para el éxito!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Catálogo Online</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptCatalogAssistant}</p>
      </div>

      {currentUserRole === 'Administrador' && (
        <>
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Ingresar Nuevo Producto al Catálogo</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
            <div>
              <label htmlFor="productName" className="block text-gray-300 text-sm font-bold mb-2">Nombre del Producto:</label>
              <input
                type="text"
                id="productName"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Ej: Garrafón 20L"
                required
                disabled={isOffline}
              />
            </div>
            <div>
              <label htmlFor="unitValue" className="block text-gray-300 text-sm font-bold mb-2">Valor Unitario:</label>
              <input
                type="number"
                id="unitValue"
                name="unitValue"
                value={newProduct.unitValue}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Precio normal"
                required
                disabled={isOffline}
              />
            </div>
            <div>
              <label htmlFor="preferredValue" className="block text-gray-300 text-sm font-bold mb-2">Valor Preferencial (por cantidad):</label>
              <input
                type="number"
                id="preferredValue"
                name="preferredValue"
                value={newProduct.preferredValue}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Precio por volumen"
                disabled={isOffline}
              />
            </div>
            <div>
              <label htmlFor="promotion" className="block text-gray-300 text-sm font-bold mb-2">Promoción:</label>
              <input
                type="text"
                id="promotion"
                name="promotion"
                value={newProduct.promotion}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Ej: 2x1, Descuento 10%"
                disabled={isOffline}
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                disabled={isOffline}
              >
                Agregar Producto al Catálogo
              </button>
              {isOffline && <p className="text-red-400 text-sm mt-2 text-center">No puedes agregar productos al catálogo en modo offline.</p>}
            </div>
          </form>
        </>
      )}

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Productos en Catálogo</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Valor Unitario</th>
              <th className="py-3 px-6 text-left">Valor Preferencial</th>
              <th className="py-3 px-6 text-left">Promoción</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-400">No hay productos en el catálogo.</td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
                  <td className="py-3 px-6 text-left">${parseFloat(product.unitValue).toFixed(2)}</td>
                  <td className="py-3 px-6 text-left">${parseFloat(product.preferredValue).toFixed(2)}</td>
                  <td className="py-3 px-6 text-left">{product.promotion || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">Los datos del catálogo pueden no estar actualizados en modo offline.</p>}
    </section>
  );
};

export default CatalogModule;