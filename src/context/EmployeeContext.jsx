import React, { createContext, useState, useEffect } from "react"
import { employeeService } from "../services/employeeService"


// Se crea el contexto global
export const EmployeeContext = createContext();

export const EmployeeProvider = ({children}) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true)


    // Cuando la app inicia, se cargan los empleados desde el servicio
    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            const data = await employeeService.getAll();
            setEmployees(data);
            setLoading(false);
        };

        fetchEmployees();
    }, []);

    const addEmployee = async (data) => {
        const newEmployee = await employeeService.create(data);
        setEmployees([...employees, newEmployee]);
        return newEmployee
    };

    const changeStatus = async (id, newStatus) => {
        await employeeService.updateStatus(id, newStatus);
        // Se refresca la lista
        const data = await employeeService.getAll();
        setEmployees(data);
    };


    // Se exportan los datos y funciones para que otros componentes los usen
    const value = {
        employees,
        loading,
        addEmployee,
        changeStatus
    };

    return (
        <EmployeeContext.Provider value = {value}>
            {children}
        </EmployeeContext.Provider>
    )
}