import React from "react";
import './StatusBagde.css';

// Recibe un status que puede ser ACTIVE o INACTIVE
export const StatusBadge = ({status}) => {
    const isActive = status === 'ACTIVE';

    return (
        <span className={`status-badge ${isActive} ? 'active' : 'inactive'`}>
            {isActive ? 'Active' : 'Inactive'}
        </span>
    )
}