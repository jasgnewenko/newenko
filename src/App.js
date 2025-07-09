import React, { useState, useEffect, useCallback } from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardOverview from './components/DashboardOverview';
import SalesModule from './components/SalesModule';
import FinanceModule from './components/FinanceModule';
import OrdersModule from './components/OrdersModule';
import InventoryModule from './components/InventoryModule';
import InvoiceModule from './components/InvoiceModule';
import ClientsModule from './components/ClientsModule';
import CatalogModule from './components/CatalogModule';
import ReportsModule from './components/ReportsModule';
import BackupAndRestore from './components/BackupAndRestore';
import SettingsModule from './components/SettingsModule';
import UserManagementModule from './components/UserManagementModule';
import LogisticsModule from './components/LogisticsModule';
import HumanResourcesModule from './components/HumanResourcesModule';
import AuditingModule from './components/AuditingModule';
import UrgentNotification from './components/UrgentNotification';
import AuthLogin from './components/AuthLogin';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUrgentNotification, setShowUrgentNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationAction, setNotificationAction] = useState(null);
  const [notificationActionLabel, setNotificationActionLabel] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState({});

  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [inventoryProducts, setInventoryProducts] = useState([
    { id: 1, type: 'Garrafón 20L', stock: 150, minStock: 50 },
    { id: 2, type: 'Garrafón 10L', stock: 80, minStock: 30 },
  ]);
  const [inventorySupplies, setInventorySupplies] = useState([
    { id: 1, name: 'Tapas de Garrafón', stock: 1000, minStock: 200 },
    { id: 2, name: 'Etiquetas', stock: 500, minStock: 100 },
  ]);
  const [logisticsRoutes, setLogisticsRoutes] = useState([
    { id: 1, name: 'Ruta Norte', vehiclePlate: 'ABCD12', driver: 'Juan Pérez', stops: 5, status: 'Activa' },
    { id: 2, name: 'Ruta Sur', vehiclePlate: 'EFGH34', driver: 'María García', stops: 8, status: 'Pendiente' },
  ]);
  const [invoicesData, setInvoicesData] = useState([]); // Estado para las facturas de egreso

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingSyncData, setPendingSyncData] = useState({
    sales: [],
    orders: [],
    inventoryProducts: [],
    inventorySupplies: [],
    logisticsRoutes: [],
    invoices: [], // Añadir a los datos pendientes
  });

  const synchronizeData = useCallback(() => {
    if (!isOffline && (
      pendingSyncData.sales.length > 0 ||
      pendingSyncData.orders.length > 0 ||
      pendingSyncData.inventoryProducts.length > 0 ||
      pendingSyncData.inventorySupplies.length > 0 ||
      pendingSyncData.logisticsRoutes.length > 0 ||
      pendingSyncData.invoices.length > 0
    )) {
      console.log('Sincronizando datos pendientes:', pendingSyncData);
      triggerUrgentNotification('Datos sincronizados exitosamente.', null, null);
      setPendingSyncData({
        sales: [],
        orders: [],
        inventoryProducts: [],
        inventorySupplies: [],
        logisticsRoutes: [],
        invoices: [],
      });
    }
  }, [isOffline, pendingSyncData]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      synchronizeData();
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const storedPendingData = JSON.parse(localStorage.getItem('pendingSyncData')) || {
      sales: [], orders: [], inventoryProducts: [], inventorySupplies: [], logisticsRoutes: [], invoices: []
    };
    setPendingSyncData(storedPendingData);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [synchronizeData]);

  useEffect(() => {
    localStorage.setItem('pendingSyncData', JSON.stringify(pendingSyncData));
  }, [pendingSyncData]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
    synchronizeData();
  };

  const handleAttemptLogin = (email, isSuccessful, callback) => {
    const isBlockedByAdmin = blockedUsers[email];
    if (isBlockedByAdmin) {
      callback(true);
      return;
    }
    callback(false);
  };

  const notifyAdminOfLockout = (userEmail, type) => {
    const message = `¡Alerta! El usuario ${userEmail} ha sido bloqueado por demasiados intentos fallidos de ${type}.`;
    
    const unlockUser = () => {
      setBlockedUsers(prev => {
        const newBlocked = { ...prev };
        delete newBlocked[userEmail];
        return newBlocked;
      });
      console.log(`Usuario ${userEmail} desbloqueado desde la notificación.`);
      triggerUrgentNotification(`Usuario ${userEmail} ha sido desbloqueado.`, null, null);
    };

    if (currentUser && currentUser.role === 'Administrador') {
      setNotificationAction(() => unlockUser);
      setNotificationActionLabel('Desbloquear Usuario');
    } else {
      setNotificationAction(null);
      setNotificationActionLabel('');
    }

    setNotificationMessage(message);
    setShowUrgentNotification(true);
    console.log(`NOTIFICACIÓN AL ADMINISTRADOR: ${message}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const triggerUrgentNotification = (message, action = null, actionLabel = null) => {
    setNotificationMessage(message);
    setNotificationAction(() => action);
    setNotificationActionLabel(actionLabel);
    setShowUrgentNotification(true);
  };

  const closeUrgentNotification = () => {
    setShowUrgentNotification(false);
    setNotificationMessage('');
    setNotificationAction(null);
    setNotificationActionLabel('');
  };

  const updateSalesData = (newSales) => {
    setSalesData(newSales);
    if (isOffline) {
      setPendingSyncData(prev => ({ ...prev, sales: newSales }));
    }
  };

  const updateOrdersData = (newOrders) => {
    setOrdersData(newOrders);
    if (isOffline) {
      setPendingSyncData(prev => ({ ...prev, orders: newOrders }));
    }
  };

  const updateInventoryProducts = (newProducts) => {
    setInventoryProducts(newProducts);
    if (isOffline) {
      setPendingSyncData(prev => ({ ...prev, inventoryProducts: newProducts }));
    }
  };

  const updateInventorySupplies = (newSupplies) => {
    setInventorySupplies(newSupplies);
    if (isOffline) {
      setPendingSyncData(prev => ({ ...prev, inventorySupplies: newSupplies }));
    }
  };

  const updateLogisticsRoutes = (newRoutes) => {
    setLogisticsRoutes(newRoutes);
    if (isOffline) {
      setPendingSyncData(prev => ({ ...prev, logisticsRoutes: newRoutes }));
    }
  };

  const updateInvoicesData = (newInvoices) => {
    setInvoicesData(newInvoices);
    if (isOffline) {
      setPendingSyncData(prev => ({ ...prev, invoices: newInvoices }));
    }
  };

  if (!currentUser) {
    return <AuthLogin onLogin={handleLogin} onAttemptLogin={handleAttemptLogin} notifyAdminOfLockout={notifyAdminOfLockout} />;
  }

  const currentUserRole = currentUser.role;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'sales':
        return <SalesModule sales={salesData} setSales={updateSalesData} currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'finance':
        return <FinanceModule currentUserRole={currentUserRole} isOffline={isOffline} salesData={salesData} invoicesData={invoicesData} />;
      case 'orders':
        return <OrdersModule currentUserRole={currentUserRole} orders={ordersData} setOrders={updateOrdersData} isOffline={isOffline} routesData={logisticsRoutes} />;
      case 'inventory':
        return <InventoryModule garrafones={inventoryProducts} setGarrafones={updateInventoryProducts} insumos={inventorySupplies} setInsumos={updateInventorySupplies} currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'invoices':
        return <InvoiceModule currentUserRole={currentUserRole} isOffline={isOffline} invoices={invoicesData} setInvoices={updateInvoicesData} />;
      case 'clients':
        return <ClientsModule sales={salesData} orders={ordersData} currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'catalog':
        return <CatalogModule currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'logistics':
        return <LogisticsModule currentUserRole={currentUserRole} isOffline={isOffline} routesData={logisticsRoutes} setRoutesData={updateLogisticsRoutes} />;
      case 'human_resources':
        return <HumanResourcesModule currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'auditing':
        return <AuditingModule currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'reports':
        return <ReportsModule garrafones={inventoryProducts} insumos={inventorySupplies} currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'backup':
        return <BackupAndRestore currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'settings':
        return <SettingsModule currentUserRole={currentUserRole} isOffline={isOffline} />;
      case 'users':
        return <UserManagementModule currentUserRole={currentUserRole} blockedUsers={blockedUsers} setBlockedUsers={setBlockedUsers} isOffline={isOffline} />;
      default:
        return (
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Página no encontrada</h2>
            <p>La página que buscas no existe.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        onNavigate={handleNavigate}
        currentUserRole={currentUserRole}
      />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Aguas Newenko" onMenuToggle={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6">
          {isOffline && (
            <div className="bg-yellow-600 text-white p-3 rounded-lg mb-4 text-center font-semibold shadow-md">
              Estás en modo offline. Los cambios se sincronizarán al reconectar.
            </div>
          )}
          {renderPage()}
        </main>
        <button
          onClick={handleLogout}
          className="fixed bottom-4 left-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md z-50"
        >
          Cerrar Sesión
        </button>
      </div>
      {showUrgentNotification && (
        <UrgentNotification 
          message={notificationMessage} 
          onClose={closeUrgentNotification} 
          onAction={notificationAction} 
          actionLabel={notificationActionLabel} 
        />
      )}
    </div>
  );
};

export default App;