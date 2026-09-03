import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = 'buk_employees';


// Funcion para leer del localStorage
const getStoredEmployees = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};


//Funcion para guardar en el localStorage
const saveEmployees = (employees) => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify(employees));
};

export const employeeService = {
    // Obtener los empleados
    getAll: async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(getStoredEmployees()),500);
        })
    },

    // Obtener por ID
    getById: async (id) => {
        return new Promise((resolve) => {
            const employees = getStoredEmployees();
            const employee = employees.find(emp => emp.id === id);
            setTimeout(() => resolve(employee || nulll),200)
        })
    },

    // Crear nuevo empleado
    create: async (employeeData) => {
        return new Promise ((resolve) => {
            const employees = getStoredEmployees();
            const newEmployee = {
                ...employeeData,
                id: uuidv4(),
                status: 'ACTIVE',
                createdAt: new Date().toISOString(),
                UpdatedAt: new Date().toISOString(),
                endDate: null
            };

            saveEmployees([...employees, newEmployee]);
            setTimeout(() => resolve(newEmployee),500);
        })
    },

    // Actualizar estado (Finalizar contrato)
    updateStatus: async (id, newStatus) => {
        return new Promise((resolve) => {
        const employees = getStoredEmployees();
        const updatedEmployees = employees.map(emp => {
            if (emp.id === id) {
            return { ...emp, status: newStatus, endDate: new Date().toISOString() };
            }
            return emp;
        });
        saveEmployees(updatedEmployees);
        setTimeout(() => resolve(true), 200);
        });
    }
}