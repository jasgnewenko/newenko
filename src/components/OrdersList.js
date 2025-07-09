import React from 'react';

const OrdersList = () => {
  const orders = [
    { id: '001', client: 'Juan Pérez', date: '2023-10-26', status: 'Entregado', amount: '$150' },
    { id: '002', client: 'María García', date: '2023-10-26', status: 'Pendiente', amount: '$80' },
    { id: '003', client: 'Carlos Ruiz', date: '2023-10-25', status: 'En Ruta', amount: '$200' },
    { id: '004', client: 'Ana López', date: '2023-10-25', status: 'Entregado', amount: '$120' },
    { id: '005', client: 'Pedro Gómez', date: '2023-10-24', status: 'Pendiente', amount: '$95' },
  ];

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

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Pedidos Recientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID Pedido</th>
              <th className="py-3 px-6 text-left">Cliente</th>
              <th className="py-3 px-6 text-left">Fecha</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Monto</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                <td className="py-3 px-6 text-left">{order.client}</td>
                <td className="py-3 px-6 text-left">{order.date}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md">
        Ver Todos los Pedidos
      </button>
    </section>
  );
};

export default OrdersList;