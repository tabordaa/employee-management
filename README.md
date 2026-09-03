# Sistema de Gestión de Empleados (SGE) 👥

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

Una moderna aplicación web (Single Page Application) desarrollada en React para centralizar y agilizar la gestión administrativa de los recursos humanos en una organización.

> **Enlace de Despliegue:** [https://employee-management.vercel.app](https://employee-management.vercel.app) *(Nota: Actualizar con la URL real generada por Vercel)*

---

## Parte 1: Contexto del Proyecto y Visión de Negocio 🎯

Este proyecto no es solo un ejercicio técnico, sino una solución estructurada a un problema común en la administración de empresas.

### 1. ¿Cuál es el problema real que se quiere resolver?
Las empresas medianas sufren de una fuerte desorganización y fragmentación en la información de su talento humano. Actualmente, los datos laborales, el estado de los contratos y las fechas críticas (inicio/terminación) se manejan en hojas de cálculo (Excel) inconexas o documentos físicos. Esto genera:
* Pérdida de historial y falta de trazabilidad.
* Errores humanos (ej. fechar el fin de un contrato antes de su inicio).
* Lentitud operativa al buscar información crítica del empleado.

### 2. ¿Quién es el usuario o público objetivo?
El sistema está diseñado para el **Analista o Coordinador de Recursos Humanos (Gestión Humana)** de la empresa. Este usuario tiene un rol administrativo, necesita rapidez y requiere validaciones automáticas que le impidan cometer errores de digitación en el registro de la plantilla.

### 3. ¿Qué valor entrega el sistema?
* **Trazabilidad y Control:** Historial centralizado del estado de cada empleado (Activo/Inactivo).
* **Seguridad (Prevención de errores):** Validaciones de negocio estrictas (ej. no permite documentos duplicados, ni fechas de salida ilógicas).
* **Eficiencia Operativa:** Un dashboard con métricas en tiempo real y una tabla unificada con buscadores (Mockup preparado para futura expansión) que reduce el tiempo de consulta a segundos.

---

## Parte 2: Documentación Técnica del Proyecto 💻

### Arquitectura (Fase 1 - MVP Frontend)
El sistema actual es la Fase 1 del producto. Se construyó con una arquitectura basada en componentes y separación estricta de responsabilidades (Separation of Concerns):

* **Context API & Hooks:** Manejo de estado global (`AuthContext`, `EmployeeContext`) aislado de la capa visual.
* **Services (`employeeService.js`):** Capa de datos separada. Actualmente persiste la información en `localStorage` para el MVP, preparada para ser conectada a FastAPI/Supabase en la Fase 2 sin alterar los componentes visuales.
* **Rutas Protegidas:** Implementación de un HOC (Higher Order Component) para restringir el acceso a usuarios no autenticados.

### Instalación y Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Credenciales de Acceso (Entorno Local)
Para acceder al sistema (Rutas protegidas), utiliza las siguientes credenciales simuladas:
* **Email:** `admin@company.com`
* **Password:** `admin123`

### Estructura del Proyecto
```text
src/
 ├── components/     # Componentes reusables (Layout, Sidebar, StatusBadge)
 ├── context/        # Estado global (AuthContext, EmployeeContext)
 ├── hooks/          # Custom hooks (useEmployees, useAuth)
 ├── pages/          # Vistas principales (Login, Dashboard, List, Detail, Register)
 ├── services/       # Comunicación con capa de datos (Localstorage)
 └── utils/          # Constantes y funciones de validación de negocio
```

### Funcionalidades Core
- **Login Seguro:** Autenticación de usuarios.
- **Dashboard:** Métricas generales en tiempo real de la organización.
- **CRUD Empleados:** Alta de empleados con validación en tiempo real.
- **Gestión de Contratos:** Desvinculación de personal (Cambio a estado INACTIVE) con validación obligatoria de fecha lógica de finalización.
