import React, { useState } from 'react';

const UserManagementModule = ({ currentUserRole, blockedUsers, setBlockedUsers }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin General', email: 'salinasguajardojuan@gmail.com', role: 'Administrador', lastActivity: '2023-10-26 10:30', password: '17812173juan@' },
    { id: 6, name: 'Admin Newenko', email: 'newenko2022@gmail.com', role: 'Administrador', lastActivity: '2023-10-26 10:30', password: '1234abcd@' },
    { id: 2, name: 'Juan Vendedor', email: 'juan.v@newenko.com', role: 'Vendedor', lastActivity: '2023-10-26 09:45', password: 'vendedor123' },
    { id: 3, name: 'Maria Bodeguera', email: 'maria.b@newenko.com', role: 'Bodeguero', lastActivity: '2023-10-25 17:00', password: 'bodeguero123' },
    { id: 4, name: 'Carlos Contador', email: 'carlos.c@newenko.com', role: 'Contador', lastActivity: '2023-10-26 11:15', password: 'contador123' },
    { id: 5, name: 'Pedro Repartidor', email: 'repartidor@newenko.com', role: 'Repartidor', lastActivity: '2023-10-26 12:00', password: 'repartidor123' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Vendedor', password: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [activityLog, setActivityLog] = useState([
    { id: 1, userId: 1, userName: 'Admin General', action: 'Inició sesión', timestamp: '2023-10-26 10:30' },
    { id: 2, userId: 2, userName: 'Juan Vendedor', action: 'Registró venta #001', timestamp: '2023-10-26 09:45' },
    { id: 3, userId: 5, userName: 'Pedro Repartidor', action: 'Actualizó pedido #002 a "En Ruta"', timestamp: '2023-10-26 12:00' },
    { id: 4, userId: 1, userName: 'Admin General', action: 'Agregó nuevo usuario', timestamp: '2023-10-26 10:35' },
  ]);

  const [permissionChangeLog, setPermissionChangeLog] = useState([
    { id: 1, admin: 'Admin General', role: 'Vendedor', permission: 'canViewSales', oldValue: 'false', newValue: 'true', timestamp: '2023-10-20 14:00' },
  ]);

  const [rolePermissions, setRolePermissions] = useState({
    Administrador: { canViewSales: true, canEditSales: true, canManageUsers: true, canViewInventory: true, canEditInventory: true, canViewReports: true },
    Vendedor: { canViewSales: true, canEditSales: true, canManageUsers: false, canViewInventory: false, canEditInventory: false, canViewReports: true },
    Bodeguero: { canViewSales: false, canEditSales: false, canManageUsers: false, canViewInventory: true, canEditInventory: true, canViewReports: false },
    Contador: { canViewSales: true, canEditSales: false, canManageUsers: false, canViewInventory: false, canEditInventory: false, canViewReports: true },
    Repartidor: { canViewSales: false, canEditSales: false, canManageUsers: false, canViewInventory: false, canEditInventory: false, canViewReports: false },
  });

  const roles = Object.keys(rolePermissions);
  const permissionTypes = [
    { key: 'canViewSales', name: 'Ver Ventas' },
    { key: 'canEditSales', name: 'Editar Ventas' },
    { key: 'canViewInventory', name: 'Ver Inventario' },
    { key: 'canEditInventory', name: 'Editar Inventario' },
    { key: 'canViewReports', name: 'Ver Reportes' },
    { key: 'canManageUsers', name: 'Gestionar Usuarios' },
  ];

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
    const isLongEnough = password.length >= 10;
    return hasLetter && hasNumber && hasSymbol && isLongEnough;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (currentUserRole !== 'Administrador') {
      alert('Solo los administradores pueden agregar usuarios.');
      return;
    }
    if (newUser.name && newUser.email && newUser.password) {
      if (newUser.role !== 'Administrador' && !validatePassword(newUser.password)) {
        alert('La contraseña debe tener al menos 10 caracteres, incluyendo letras, números y un símbolo.');
        return;
      }
      const newUserData = { ...newUser, id: Date.now(), lastActivity: new Date().toLocaleString() };
      setUsers([...users, newUserData]);
      setActivityLog([...activityLog, { id: Date.now() + 1, userId: newUserData.id, userName: newUserData.name, action: 'Creó nuevo usuario', timestamp: new Date().toLocaleString() }]);
      setNewUser({ name: '', email: '', role: 'Vendedor', password: '' });
    } else {
      alert('Por favor, completa todos los campos para agregar un usuario.');
    }
  };

  const handleDeleteUser = (id) => {
    if (currentUserRole !== 'Administrador') {
      alert('Solo los administradores pueden eliminar usuarios.');
      return;
    }
    const userToDelete = users.find(user => user.id === id);
    if (window.confirm(`¿Estás seguro de eliminar a ${userToDelete.name}?`)) {
      setUsers(users.filter(user => user.id !== id));
      setActivityLog([...activityLog, { id: Date.now(), userId: userToDelete.id, userName: userToDelete.name, action: 'Eliminó usuario', timestamp: new Date().toLocaleString() }]);
    }
  };

  const handleEditUser = (user) => {
    if (currentUserRole !== 'Administrador') {
      alert('Solo los administradores pueden editar usuarios.');
      return;
    }
    setSelectedUser({ ...user });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (selectedUser.name && selectedUser.email) {
      if (selectedUser.password && selectedUser.role !== 'Administrador' && !validatePassword(selectedUser.password)) {
        alert('La nueva contraseña debe tener al menos 10 caracteres, incluyendo letras, números y un símbolo.');
        return;
      }
      setUsers(users.map(user =>
        user.id === selectedUser.id ? { ...selectedUser, lastActivity: new Date().toLocaleString() } : user
      ));
      setActivityLog([...activityLog, { id: Date.now(), userId: selectedUser.id, userName: selectedUser.name, action: 'Editó perfil', timestamp: new Date().toLocaleString() }]);
      setSelectedUser(null);
    } else {
      alert('Por favor, completa los campos obligatorios para actualizar el usuario.');
    }
  };

  const handlePermissionChange = (role, permissionKey, value) => {
    if (currentUserRole !== 'Administrador') {
      alert('Solo los administradores pueden modificar permisos.');
      return;
    }
    const oldValue = rolePermissions[role][permissionKey];
    setRolePermissions({
      ...rolePermissions,
      [role]: {
        ...rolePermissions[role],
        [permissionKey]: value,
      },
    });
    setPermissionChangeLog([...permissionChangeLog, {
      id: Date.now(),
      admin: 'Admin Actual',
      role: role,
      permission: permissionKey,
      oldValue: String(oldValue),
      newValue: String(value),
      timestamp: new Date().toLocaleString()
    }]);
    setActivityLog([...activityLog, { id: Date.now(), userId: 'Admin', userName: 'Administrador', action: `Modificó permiso '${permissionKey}' para el rol '${role}' a ${value}`, timestamp: new Date().toLocaleString() }]);
  };

  const handleBlockUser = (emailToBlock) => {
    if (currentUserRole !== 'Administrador') {
      alert('Solo los administradores pueden bloquear usuarios.');
      return;
    }
    setBlockedUsers(prev => ({ ...prev, [emailToBlock]: true }));
    setActivityLog([...activityLog, { id: Date.now(), userId: 'Admin', userName: 'Administrador', action: `Bloqueó al usuario ${emailToBlock}`, timestamp: new Date().toLocaleString() }]);
    alert(`Usuario ${emailToBlock} ha sido bloqueado.`);
  };

  const handleUnblockUser = (emailToUnblock) => {
    if (currentUserRole !== 'Administrador') {
      alert('Solo los administradores pueden desbloquear usuarios.');
      return;
    }
    setBlockedUsers(prev => {
      const newBlocked = { ...prev };
      delete newBlocked[emailToUnblock];
      return newBlocked;
    });
    setActivityLog([...activityLog, { id: Date.now(), userId: 'Admin', userName: 'Administrador', action: `Desbloqueó al usuario ${emailToUnblock}`, timestamp: new Date().toLocaleString() }]);
    alert(`Usuario ${emailToUnblock} ha sido desbloqueado.`);
  };

  const gptUserManagementAssistant = "¡Hola! Soy tu Encargado de Usuarios. Aquí puedes gestionar quién tiene acceso a la aplicación y qué permisos tiene cada uno. Es importante asignar el rol correcto para mantener la seguridad y el orden. Si necesitas crear un nuevo usuario, ajustar permisos o revisar el historial de actividad, ¡aquí estoy para ayudarte!";

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Gestión de Usuarios</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptUserManagementAssistant}</p>
      </div>

      {currentUserRole === 'Administrador' && (
        <>
          {selectedUser ? (
            <>
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Editar Usuario: {selectedUser.name}</h3>
              <form onSubmit={handleUpdateUser} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
                <div>
                  <label htmlFor="editUserName" className="block text-gray-300 text-sm font-bold mb-2">Nombre:</label>
                  <input
                    type="text"
                    id="editUserName"
                    name="name"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="editUserEmail" className="block text-gray-300 text-sm font-bold mb-2">Email:</label>
                  <input
                    type="email"
                    id="editUserEmail"
                    name="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="editUserRole" className="block text-gray-300 text-sm font-bold mb-2">Rol:</label>
                  <select
                    id="editUserRole"
                    name="role"
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="editUserPassword" className="block text-gray-300 text-sm font-bold mb-2">Nueva Contraseña (opcional):</label>
                  <input
                    type="password"
                    id="editUserPassword"
                    name="password"
                    value={selectedUser.password || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Dejar en blanco para no cambiar"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
                  >
                    Actualizar Usuario
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Agregar Nuevo Usuario</h3>
              <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
                <div>
                  <label htmlFor="userName" className="block text-gray-300 text-sm font-bold mb-2">Nombre:</label>
                  <input
                    type="text"
                    id="userName"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Nombre completo"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userEmail" className="block text-gray-300 text-sm font-bold mb-2">Email:</label>
                  <input
                    type="email"
                    id="userEmail"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userRole" className="block text-gray-300 text-sm font-bold mb-2">Rol:</label>
                  <select
                    id="userRole"
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="userPassword" className="block text-gray-300 text-sm font-bold mb-2">Contraseña:</label>
                  <input
                    type="password"
                    id="userPassword"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Contraseña inicial"
                    required
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                  >
                    Agregar Usuario
                  </button>
                </div>
              </form>
            </>
          )}

          <h3 className="text-xl font-semibold text-gray-200 mb-4">Gestión de Permisos por Rol</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Rol</th>
                  {permissionTypes.map(perm => (
                    <th key={perm.key} className="py-3 px-6 text-center">{perm.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-200 text-sm font-light">
                {roles.map(role => (
                  <tr key={role} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <td className="py-3 px-6 text-left font-bold">{role}</td>
                    {permissionTypes.map(perm => (
                      <td key={perm.key} className="py-3 px-6 text-center">
                        <input
                          type="checkbox"
                          checked={rolePermissions[role][perm.key]}
                          onChange={(e) => handlePermissionChange(role, perm.key, e.target.checked)}
                          className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                          disabled={currentUserRole !== 'Administrador'}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Usuarios Registrados</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Rol</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Última Actividad</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-400">No hay usuarios registrados.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${blockedUsers[user.email] ? 'bg-red-500' : 'bg-green-500'}`}>
                      {blockedUsers[user.email] ? 'Bloqueado' : 'Activo'}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{user.lastActivity}</td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
                      disabled={currentUserRole !== 'Administrador'}
                    >
                      Editar
                    </button>
                    {blockedUsers[user.email] ? (
                      <button
                        onClick={() => handleUnblockUser(user.email)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
                        disabled={currentUserRole !== 'Administrador'}
                      >
                        Desbloquear
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(user.email)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md transition-colors"
                        disabled={currentUserRole !== 'Administrador'}
                      >
                        Bloquear
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
                      disabled={currentUserRole !== 'Administrador'}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Historial de Actividad</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Usuario</th>
              <th className="py-3 px-6 text-left">Acción</th>
              <th className="py-3 px-6 text-left">Fecha y Hora</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {activityLog.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 px-6 text-center text-gray-400">No hay actividad registrada.</td>
              </tr>
            ) : (
              activityLog.map(log => (
                <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{log.userName}</td>
                  <td className="py-3 px-6 text-left">{log.action}</td>
                  <td className="py-3 px-6 text-left">{log.timestamp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-200 mb-4">Registro de Cambios de Permisos</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Administrador</th>
              <th className="py-3 px-6 text-left">Rol Afectado</th>
              <th className="py-3 px-6 text-left">Permiso</th>
              <th className="py-3 px-6 text-left">Valor Anterior</th>
              <th className="py-3 px-6 text-left">Nuevo Valor</th>
              <th className="py-3 px-6 text-left">Fecha y Hora</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {permissionChangeLog.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-gray-400">No hay cambios de permisos registrados.</td>
              </tr>
            ) : (
              permissionChangeLog.map(log => (
                <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{log.admin}</td>
                  <td className="py-3 px-6 text-left">{log.role}</td>
                  <td className="py-3 px-6 text-left">{log.permission}</td>
                  <td className="py-3 px-6 text-left">{log.oldValue}</td>
                  <td className="py-3 px-6 text-left">{log.newValue}</td>
                  <td className="py-3 px-6 text-left">{log.timestamp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserManagementModule;