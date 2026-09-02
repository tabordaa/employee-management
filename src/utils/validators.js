export const validateEmployee = (data) => {
  const errors = {};

  if (!data.fullName || data.fullName.trim() === '') {
    errors.fullName = 'El nombre completo es obligatorio';
  }

  if (!data.documentNumber || data.documentNumber.trim() === '') {
    errors.documentNumber = 'El documento es obligatorio';
  } else if (!/^[a-zA-Z0-9]+$/.test(data.documentNumber)) {
    errors.documentNumber = 'El documento solo puede contener letras y números';
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'El formato de correo no es válido';
  }

  if (data.salary && isNaN(Number(data.salary))) {
    errors.salary = 'El salario debe ser numérico';
  } else if (data.salary && Number(data.salary) < 0) {
    errors.salary = 'El salario no puede ser negativo';
  }

  if (!data.startDate) {
    errors.startDate = 'La fecha de ingreso es obligatoria';
  }

  if (data.endDate && data.startDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (end < start) {
      errors.endDate = 'La fecha de finalización no puede ser anterior a la de ingreso';
    }
  }

  return errors;
};
