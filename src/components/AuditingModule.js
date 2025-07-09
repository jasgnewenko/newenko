import React from 'react';

const AuditingModule = ({ currentUserRole, isOffline }) => {
  const gptAuditorAssistant = "¡Hola! Soy tu Auditor GPT. Mi función es proporcionarte información, sugerencias y alertas sobre la gestión de la empresa. No puedo realizar acciones directas, pero puedo ayudarte a identificar áreas de mejora y posibles riesgos. ¡Estoy aquí para asegurar la transparencia y eficiencia de tus operaciones!";

  const auditReports = [
    { id: 1, title: 'Análisis de Ventas por Producto', content: 'Se ha detectado un incremento del 15% en ventas de garrafones de 20L en la última semana. Sugerencia: Considerar aumentar el stock de este producto.', type: 'Sugerencia', area: 'Ventas' },
    { id: 2, title: 'Estado de Filtros de Agua', content: 'El filtro de sedimentos tiene una fecha de recambio próxima (en 2 días). Alerta: Asegúrate de tener el insumo disponible y programar el cambio.', type: 'Alerta', area: 'Logística' },
    { id: 3, title: 'Control de Egresos Mensuales', content: 'Los egresos por insumos han aumentado un 5% este mes en comparación con el promedio trimestral. Sugerencia: Revisar proveedores o buscar alternativas más económicas.', type: 'Sugerencia', area: 'Finanzas' },
    { id: 4, title: 'Vencimiento de Licencias de Conducir', content: 'La licencia de conducir de María García vence en menos de una semana (en 5 días). Alerta: Recordar al trabajador que debe renovarla y verificar su estado.', type: 'Alerta', area: 'Recursos Humanos' },
    { id: 5, title: 'Eficiencia en Pedidos', content: 'Se observa un 20% de pedidos con estado "Pendiente por Realizar" por más de 24 horas. Sugerencia: Optimizar la asignación de rutas o recursos.', type: 'Sugerencia', area: 'Pedidos' },
    { id: 6, title: 'Uso de Permisos de Usuario', content: 'El usuario "Juan Vendedor" ha intentado acceder al módulo de usuarios 3 veces en la última hora sin éxito. Alerta: Monitorear actividad inusual.', type: 'Alerta', area: 'Usuarios' },
  ];

  const downloadReport = (format) => {
    if (format === 'word') {
      const docContent = `
        <html>
        <head>
            <meta charset="utf-8">
            <title>Informe de Auditoría Aguas Newenko</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                h1, h2, h3 { color: #0056b3; }
                .section { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
                .alert { color: #d9534f; font-weight: bold; }
                .suggestion { color: #5cb85c; font-weight: bold; }
                .chart-placeholder { width: 100%; height: 200px; background-color: #eee; border: 1px solid #ccc; text-align: center; line-height: 200px; color: #666; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Informe de Auditoría Aguas Newenko</h1>
            <p>Fecha de Emisión: ${new Date().toLocaleDateString()}</p>
            <p>Este informe detalla las observaciones y sugerencias generadas por el sistema de Auditoría GPT para la gestión de la empresa Aguas Newenko.</p>

            <h2>Resumen Ejecutivo</h2>
            <div class="section">
                <p>El sistema ha identificado áreas clave en ventas, logística, finanzas, recursos humanos, pedidos y gestión de usuarios que requieren atención. Se recomienda revisar las alertas y sugerencias para optimizar las operaciones y mitigar riesgos.</p>
            </div>

            <h2>Análisis Detallado</h2>
            ${auditReports.map(report => `
                <div class="section">
                    <h3>${report.title}</h3>
                    <p><strong>Área:</strong> ${report.area}</p>
                    <p class="${report.type === 'Alerta' ? 'alert' : 'suggestion'}"><strong>Tipo:</strong> ${report.type}</p>
                    <p>${report.content}</p>
                </div>
            `).join('')}

            <h2>Datos Gráficos (Ejemplos)</h2>
            <div class="section">
                <h3>Gráfico de Ventas Mensuales</h3>
                <div class="chart-placeholder">Gráfico de Barras de Ventas (Simulado)</div>
                <p>Descripción: Proyección de ventas basada en el rendimiento actual.</p>
            </div>
            <div class="section">
                <h3>Gráfico de Stock de Productos Clave</h3>
                <div class="chart-placeholder">Gráfico de Líneas de Stock (Simulado)</div>
                <p>Descripción: Tendencia del inventario de garrafones de 20L.</p>
            </div>

            <h2>Checklist de Acciones Recomendadas</h2>
            <div class="section">
                <p>Basado en los informes de auditoría, el administrador debe considerar las siguientes acciones:</p>
                <ul>
                    <li>[ ] Verificar y ajustar los niveles de stock de garrafones de 20L.</li>
                    <li>[ ] Programar el recambio del filtro de sedimentos y asegurar la disponibilidad del insumo.</li>
                    <li>[ ] Realizar una revisión de los gastos por insumos y evaluar posibles ahorros.</li>
                    <li>[ ] Contactar a María García para recordarle la renovación de su licencia de conducir.</li>
                    <li>[ ] Analizar la asignación de rutas y recursos para pedidos pendientes.</li>
                    <li>[ ] Monitorear la actividad del usuario "Juan Vendedor" en el módulo de usuarios.</li>
                    <li>[ ] Revisar y actualizar los permisos de los roles si es necesario.</li>
                    <li>[ ] Asegurar que todos los vehículos tengan su documentación al día.</li>
                </ul>
            </div>

            <h2>Información Detallada de la Empresa (Ejemplo)</h2>
            <div class="section">
                <h3>Datos Generales</h3>
                <p><strong>Nombre de la Empresa:</strong> Aguas Newenko S.A.</p>
                <p><strong>RUT:</strong> 76.XXX.XXX-X</p>
                <p><strong>Dirección:</strong> Calle Ficticia #123, Ciudad Ejemplo</p>
                <p><strong>Contacto:</strong> info@newenko.com</p>
                <h3>Estadísticas Clave (Ejemplo)</h3>
                <table>
                    <tr><th>Métrica</th><th>Valor Actual</th><th>Tendencia</th></tr>
                    <tr><td>Ventas Mensuales Promedio</td><td>$48,000</td><td>↑</td></tr>
                    <tr><td>Pedidos Entregados (última semana)</td><td>95%</td><td>→</td></tr>
                    <tr><td>Stock Crítico</td><td>2 productos</td><td>↓</td></tr>
                    <tr><td>Empleados Activos</td><td>10</td><td>→</td></tr>
                </table>
            </div>

            <p>Fin del Informe.</p>
        </body>
        </html>
      `;
      const blob = new Blob([docContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Informe_Auditoria_Aguas_Newenko.doc';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Informe de auditoría descargado como Word.');
    } else {
      alert(`Descargando datos en formato ${format}... (Funcionalidad de descarga real iría aquí)`);
    }
  };

  return (
    <section className="p-6 bg-gray-800 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Módulo de Auditoría</h2>

      <div className="bg-gray-900 p-4 rounded-lg mb-6 text-gray-300 text-sm italic">
        <p>{gptAuditorAssistant}</p>
      </div>

      {currentUserRole === 'Administrador' ? (
        <div className="text-gray-300">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Informes de Auditoría Personalizados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditReports.map(report => (
              <div key={report.id} className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold text-gray-100">{report.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${report.type === 'Alerta' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {report.type}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2"><strong>Área:</strong> {report.area}</p>
                <p className="text-gray-400 text-sm">{report.content}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-6 text-center">
            Esta sección proporciona análisis y alertas generadas por el sistema de auditoría.
            Recuerda que estas son solo sugerencias y no acciones directas.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Exportar Informe de Auditoría</h3>
            <button
              onClick={() => downloadReport('word')}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center justify-center"
              disabled={isOffline}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Descargar Informe (Word)
            </button>
            {isOffline && <p className="text-red-400 text-sm mt-2 text-center">No puedes descargar informes en modo offline.</p>}
          </div>
        </div>
      ) : (
        <p className="text-red-400 text-sm mt-4 text-center">Solo los administradores pueden acceder al módulo de Auditoría.</p>
      )}
      {isOffline && <p className="text-red-400 text-sm mt-4 text-center">El módulo de Auditoría no está disponible en modo offline.</p>}
    </section>
  );
};

export default AuditingModule;