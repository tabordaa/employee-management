import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEmployees } from '../../hooks/useEmployees';
import { DEPARTMENTS, POSITIONS } from '../../utils/constants';
import { validateEmployee } from '../../utils/validators';
import './RegisterEmployee.css';

export const RegisterEmployee = () => {
  const navigate = useNavigate();
  const { addEmployee, employees } = useEmployees();
  
  const [formData, setFormData] = useState({
    fullName: '',
    documentNumber: '',
    email: '',
    position: POSITIONS[0],
    department: DEPARTMENTS[0],
    startDate: new Date().toISOString().split('T')[0] // Fecha de hoy por defecto
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiamos el error de este campo al escribir
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validamos reglas de negocio
    const validationErrors = validateEmployee(formData);
    
    // 2. Validamos documento único (Regla RN-2)
    const documentExists = employees.some(emp => emp.documentNumber === formData.documentNumber);
    if (documentExists) {
      validationErrors.documentNumber = 'Este documento ya está registrado';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 3. Guardamos
    await addEmployee(formData);
    alert('¡Empleado registrado con éxito!'); // Después lo cambiaremos por un Toast bonito
    navigate('/employees');
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <div>
          <h2>Registrar nuevo empleado</h2>
          <p>Ingrese los datos básicos del nuevo miembro del equipo.</p>
        </div>
        <Link to="/employees" className="cancel-btn">Cancelar</Link>
      </div>

      <div className="form-card glass-panel">
        <form onSubmit={handleSubmit} className="employee-form">
          
          <div className="form-section">
            <h3>Información personal</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre completo *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Número de documento *</label>
                <input 
                  type="text" 
                  name="documentNumber" 
                  value={formData.documentNumber} 
                  onChange={handleChange} 
                  className={errors.documentNumber ? 'input-error' : ''}
                />
                {errors.documentNumber && <span className="error-text">{errors.documentNumber}</span>}
              </div>

              <div className="form-group">
                <label>Correo electronico *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Detalles</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Area</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  {DEPARTMENTS.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Cargo</label>
                <select name="position" value={formData.position} onChange={handleChange}>
                  {POSITIONS.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Fecha de inicio *</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleChange} 
                  className={errors.startDate ? 'input-error' : ''}
                />
                {errors.startDate && <span className="error-text">{errors.startDate}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">Save Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};