import React, { useState } from 'react';

const InventoryManagement = () => {
  const [garrafones, setGarrafones] = useState([
    { id: 1, type: 'Garrafón 20L', stock: 150, minStock: 50 },
    { id: 2, type: 'Garrafón 10L', stock: 80, minStock: 30 },
    { id: 3, type: 'Botella 1L Saborizada', stock: 300, minStock: 100 },
  ]);

  const [insumos, setInsumos] = useState([
    { id: 1, name: 'Tapas de Garrafón', stock: 1000, minStock: 200 },
    { id: 2, name: 'Etiquetas', stock: 500, minStock: 100 },
    { id: 3, name: 'Concentrado de Sabor', stock: 50, minStock: 10 },
  ]);

  const [newProduct, setNewProduct] = useState({ type: '', stock: '', minStock: '' });
  const [newSupply, setNewSupply] = useState({ name: '', stock: '', minStock: '' });

  const handleUpdateStock = (type, id, value) => {
    if (type === 'garrafones') {
      setGarrafones(garrafones.map(item =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + value) } : item
      ));
    } else {
      setInsumos(insumos.map(item =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + value) } : item
      ));
    }
  };

  const handleManualStockChange = (type, id, field, value) => {
    if (type === 'garrafones') {
      setGarrafones(garrafones.map(item =>
        item.id === id ? { ...item, [field]: parseInt(value) || 0 } : item
      ));
    } else {
      setInsumos(insumos.map(item =>
        item.id === id ? { ...item, [field]: parseInt(value) || 0 } : item
      ));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.type && newProduct.stock !== '' && newProduct.minStock !== '') {
      setGarrafones([...garrafones, {
        id: Date.now(),
        type: newProduct.type,
        stock: parseInt(newProduct.stock),
        minStock: parseInt(newProduct.minStock)
      }]);
      setNewProduct({ type: '', stock: '', minStock: '' });
    }
  };

  const handleAddSupply = (e) => {
    e.preventDefault();
    if (newSupply.name && newSupply.stock !== '' && newSupply.minStock !== '') {
      setInsumos([...insumos, {
        id: Date.now(),
        name: newSupply.name,
        stock: parseInt(newSupply.stock),
        minStock: parseInt(newSupply.minStock)
      }]);
      setNewSupply({ name: '', stock: '', minStock: '' });
    }
  };

  const getStockStatusClass = (stock, minStock) => {
    if (stock <= minStock) {
      return 'text-red-400 font-bold';
    }
    return 'text-green-400';
  };

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Gestión de Inventario</h2>

      {/* Formulario para agregar nuevos productos */}
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Agregar Nuevo Producto</h3>
      <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
        <div>
          <label htmlFor="newProductType" className="block text-gray-300 text-sm font-bold mb-2">Tipo de Producto:</label>
          <input
            type="text"
            id="newProductType"
            value={newProduct.type}
            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Ej: Garrafón 20L"
            required
          />
        </div>
        <div>
          <label htmlFor="newProductStock" className="block text-gray-300 text-sm font-bold mb-2">Stock Inicial:</label>
          <input
            type="number"
            id="newProductStock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Cantidad"
            required
          />
        </div>
        <div>
          <label htmlFor="newProductMinStock" className="block text-gray-300 text-sm font-bold mb-2">Stock Mínimo:</label>
          <input
            type="number"
            id="newProductMinStock"
            value={newProduct.minStock}
            onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Cantidad mínima"
            required
          />
        </div>
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          >
            Agregar Producto
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Garrafones y Productos Existentes</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Tipo</th>
              <th className="py-3 px-6 text-left">Stock Actual</th>
              <th className="py-3 px-6 text-left">Stock Mínimo</th>
              <th className="py-3 px-6 text-center">Acciones Rápidas</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {garrafones.map(item => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                <td className="py-3 px-6 text-left">{item.type}</td>
                <td className="py-3 px-6 text-left">
                  <input
                    type="number"
                    value={item.stock}
                    onChange={(e) => handleManualStockChange('garrafones', item.id, 'stock', e.target.value)}
                    className={`w-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${getStockStatusClass(item.stock, item.minStock)}`}
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  <input
                    type="number"
                    value={item.minStock}
                    onChange={(e) => handleManualStockChange('garrafones', item.id, 'minStock', e.target.value)}
                    className="w-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <button onClick={() => handleUpdateStock('garrafones', item.id, 1)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-2 transition-colors">+</button>
                  <button onClick={() => handleUpdateStock('garrafones', item.id, -1)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors">-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario para agregar nuevos insumos */}
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Agregar Nuevo Insumo</h3>
      <form onSubmit={handleAddSupply} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
        <div>
          <label htmlFor="newSupplyName" className="block text-gray-300 text-sm font-bold mb-2">Nombre del Insumo:</label>
          <input
            type="text"
            id="newSupplyName"
            value={newSupply.name}
            onChange={(e) => setNewSupply({ ...newSupply, name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Ej: Tapas de Garrafón"
            required
          />
        </div>
        <div>
          <label htmlFor="newSupplyStock" className="block text-gray-300 text-sm font-bold mb-2">Stock Inicial:</label>
          <input
            type="number"
            id="newSupplyStock"
            value={newSupply.stock}
            onChange={(e) => setNewSupply({ ...newSupply, stock: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Cantidad"
            required
          />
        </div>
        <div>
          <label htmlFor="newSupplyMinStock" className="block text-gray-300 text-sm font-bold mb-2">Stock Mínimo:</label>
          <input
            type="number"
            id="newSupplyMinStock"
            value={newSupply.minStock}
            onChange={(e) => setNewSupply({ ...newSupply, minStock: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Cantidad mínima"
            required
          />
        </div>
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          >
            Agregar Insumo
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Insumos Existentes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Stock Actual</th>
              <th className="py-3 px-6 text-left">Stock Mínimo</th>
              <th className="py-3 px-6 text-center">Acciones Rápidas</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {insumos.map(item => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                <td className="py-3 px-6 text-left">{item.name}</td>
                <td className="py-3 px-6 text-left">
                  <input
                    type="number"
                    value={item.stock}
                    onChange={(e) => handleManualStockChange('insumos', item.id, 'stock', e.target.value)}
                    className={`w-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${getStockStatusClass(item.stock, item.minStock)}`}
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  <input
                    type="number"
                    value={item.minStock}
                    onChange={(e) => handleManualStockChange('insumos', item.id, 'minStock', e.target.value)}
                    className="w-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <button onClick={() => handleUpdateStock('insumos', item.id, 1)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-2 transition-colors">+</button>
                  <button onClick={() => handleUpdateStock('insumos', item.id, -1)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors">-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InventoryManagement;

// DONE