import React from 'react';

const DashboardSidebar = ({ isOpen, onNavigate, onClose, currentUserRole }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>
    )},
    { id: 'sales', name: 'Ventas', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    )},
    { id: 'finance', name: 'Finanzas', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0h.01M9 12h6m-5 0h.01M9 16h6m-5 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )},
    { id: 'orders', name: 'Pedidos', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
      </svg>
    )},
    { id: 'inventory', name: 'Inventario', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
      </svg>
    )},
    { id: 'invoices', name: 'Facturas', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    )},
    { id: 'clients', name: 'Clientes', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m5-9V3l2 2m-2 2l-2-2m-2 2l2-2m2 2l2-2m-2 2V3"></path>
      </svg>
    )},
    { id: 'catalog', name: 'Catálogo Online', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
      </svg>
    )},
    { id: 'logistics', name: 'Logística', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3m-1 4h.01M12 17h.01M16 17h.01M12 12V3"></path>
      </svg>
    )},
    { id: 'human_resources', name: 'Recursos Humanos', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m5-9V3l2 2m-2 2l-2-2m-2 2l2-2m2 2l2-2m-2 2V3"></path>
      </svg>
    )},
    { id: 'reports', name: 'Reportes', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 2v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    )},
    { id: 'auditing', name: 'Auditoría', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )},
    { id: 'backup', name: 'Respaldo', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0-8a5 5 0 00-5 5v1a3 3 0 00-3 3v1h12v-1a3 3 0 00-3-3v-1a5 5 0 00-5-5z"></path>
      </svg>
    )},
    { id: 'users', name: 'Usuarios', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m3-10h4m-4 0v4m0-4h.01M12 12a3 3 0 100-6 3 3 0 000 6z"></path>
      </svg>
    )},
    { id: 'settings', name: 'Configuración', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    )},
  ];

  const rolePermissionsMap = {
    Administrador: {
      dashboard: true, sales: true, finance: true, orders: true, inventory: true, invoices: true,
      clients: true, catalog: true, reports: true, backup: true, users: true, settings: true,
      logistics: true, human_resources: true, auditing: true
    },
    Vendedor: {
      dashboard: true, sales: true, finance: false, orders: true, inventory: false, invoices: false,
      clients: true, catalog: true, reports: true, backup: false, users: false, settings: false,
      logistics: false, human_resources: false, auditing: false
    },
    Bodeguero: {
      dashboard: true, sales: false, finance: false, orders: false, inventory: true, invoices: false,
      clients: false, catalog: false, reports: true, backup: false, users: false, settings: false,
      logistics: false, human_resources: false, auditing: false
    },
    Contador: {
      dashboard: true, sales: false, finance: true, orders: false, inventory: false, invoices: true,
      clients: false, catalog: false, reports: true, backup: false, users: false, settings: false,
      logistics: false, human_resources: false, auditing: false
    },
    Repartidor: {
      dashboard: true, sales: false, finance: false, orders: true, inventory: false, invoices: false,
      clients: false, catalog: false, reports: false, backup: false, users: false, settings: false,
      logistics: true, human_resources: false, auditing: false
    },
  };

  const filteredMenuItems = menuItems.filter(item => {
    return rolePermissionsMap[currentUserRole] && rolePermissionsMap[currentUserRole][item.id];
  });

  return (
    <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 p-4 shadow-xl z-50 md:relative md:rounded-tr-2xl md:rounded-br-2xl`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-blue-400">Newenko</h2>
        <button onClick={onClose} className="text-white focus:outline-none md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav>
        <ul>
          {filteredMenuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => { onNavigate(item.id); onClose(); }}
                className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 focus:outline-none"
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-lg font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;