import React from 'react';
import { useEmployees } from '../../hooks/useEmployees';
import './Dashboard.css';

export const Dashboard = () => {
  const { employees, loading } = useEmployees();

  if (loading) {
    return <div>Cargando estadísticas...</div>;
  }

  // Calculamos las métricas dinámicamente
  const total = employees.length;
  const active = employees.filter(emp => emp.status === 'ACTIVE').length;
  const inactive = employees.filter(emp => emp.status === 'INACTIVE').length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Panel Principal</h2>
        <p>Resumen general de la plantilla de empleados.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-title">
            <span>Total Empleados</span>
            <span className="stat-icon">👥</span>
          </div>
          <div className="stat-value">{total}</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-title">
            <span>Empleados Activos</span>
            <span className="stat-icon">✅</span>
          </div>
          <div className="stat-value">{active}</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-title">
            <span>Empleados Inactivos</span>
            <span className="stat-icon">❌</span>
          </div>
          <div className="stat-value">{inactive}</div>
        </div>
      </div>
    </div>
  );
};