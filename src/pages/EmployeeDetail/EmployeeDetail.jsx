import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEmployees } from '../../hooks/useEmployees';
import { StatusBadge } from '../../components/StatusBadge/StatusBagde';
import { employeeService } from '../../services/employeeService';
import './EmployeeDetail.css';

export const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { changeStatus } = useEmployees();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTerminateModal, setShowTerminateModal] = useState(false);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            const data = await employeeService.getById(id);
            if (data) {
                setEmployee(data);
            } else {
                navigate('/employees');
            }
            setLoading(false);
        };
        fetchEmployee();
    }, [id, navigate]);

    const handleTerminate = () => {
        if (new Date(endDate) < new Date(employee.startDate)) {
            setError('La fecha de finalización no puede ser anterior a la fecha de inicio.');
            return;
        }
        changeStatus(employee.id, 'INACTIVE', new Date(endDate).toISOString());
        setShowTerminateModal(false);
        setEmployee(prev => ({...prev, status: 'INACTIVE', endDate: new Date(endDate).toISOString()}));
    };

    if (loading) return <div>Cargando detalle...</div>;
    if (!employee) return null;

    return (
        <div className="employee-detail-container">
            <div className="detail-header">
                <div>
                    <Link to="/employees" className="back-link">← Volver al directorio</Link>
                    <h2>Detalle del Empleado</h2>
                </div>
                {employee.status === 'ACTIVE' && (
                    <button onClick={() => setShowTerminateModal(true)} className="terminate-btn">
                        Finalizar Contrato
                    </button>
                )}
            </div>

            <div className="detail-card glass-panel">
                <div className="detail-profile">
                    <div className="avatar">{employee.fullName.charAt(0)}</div>
                    <div>
                        <h3>{employee.fullName}</h3>
                        <p>{employee.position}</p>
                        <StatusBadge status={employee.status} />
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="info-group">
                        <label>Documento ID</label>
                        <p>{employee.documentNumber}</p>
                    </div>
                    <div className="info-group">
                        <label>Email</label>
                        <p>{employee.email}</p>
                    </div>
                    <div className="info-group">
                        <label>Departamento</label>
                        <p>{employee.department}</p>
                    </div>
                    <div className="info-group">
                        <label>Fecha de Inicio</label>
                        <p>{new Date(employee.startDate).toLocaleDateString()}</p>
                    </div>
                    {employee.status === 'INACTIVE' && employee.endDate && (
                        <div className="info-group">
                            <label>Fecha de Finalización</label>
                            <p>{new Date(employee.endDate).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
            </div>

            {showTerminateModal && (
                <div className="modal-overlay">
                    <div className="modal glass-panel">
                        <h3>Finalizar Contrato</h3>
                        <p>Seleccione la fecha de terminación del contrato para <strong>{employee.fullName}</strong>.</p>
                        
                        {error && <div className="error-msg">{error}</div>}

                        <div className="form-group" style={{marginTop: '1rem'}}>
                            <label>Fecha de Terminación (Fecha Inicio: {new Date(employee.startDate).toLocaleDateString()})</label>
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                    setError('');
                                }} 
                            />
                        </div>

                        <div className="modal-actions">
                            <button onClick={() => setShowTerminateModal(false)} className="cancel-btn">Cancelar</button>
                            <button onClick={handleTerminate} className="terminate-btn">Confirmar Finalización</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
