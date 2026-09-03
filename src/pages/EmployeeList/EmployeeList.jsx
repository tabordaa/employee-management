import React from "react";
import { Link } from "react-router-dom";
import { useEmployees } from "../../hooks/useEmployees";
import { StatusBadge } from "../../components/StatusBadge/StatusBagde";
import './EmployeeList.css'

export const EmployeeList = () => {
    const {employees, loading, changeStatus} = useEmployees();

    if(loading) return <div>Cargando directorio...</div>

    return (
        <div className="employee-list-container">
            <div className="list-header">
                <div>
                    <h2>Directorio de empleados</h2>
                    <p>Gestiona todos los miembros de la organización</p>
                </div>

                <Link to="/employees/new" className="primary-btn">
                    + Agregar empleado
                </Link>
            </div>

            <div className="table-container glass-oanel">
                {employees.length === 0 ? (
                    <div className="empty-state">
                        <p>No hay empleados registrados aún</p>
                    </div>
                    ) : (
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Documento</th>
                                    <th>Cargo</th>
                                    <th>Area</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.id}>
                                        <td className="font-medium">{emp.fullName}</td>
                                        <td>{emp.documentNumber}</td>
                                        <td>{emp.position}</td>
                                        <td>{emp.department}</td>
                                        <td>
                                            <StatusBadge status={emp.status}></StatusBadge>
                                        </td>
                                        <td>
                                            <Link 
                                                to={`/employees/${emp.id}`}
                                                style={{color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.8rem', padding: '0.5rem', border: '1px solid var(--accent-primary)', borderRadius:'4px', textDecoration: 'none'}}
                                            >
                                                Ver Detalle
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>
    )
}