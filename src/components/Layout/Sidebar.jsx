import React from 'react';
import './Layout.css';

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span className="brand-icon">🏢</span>
                <h2>Enterprise</h2>
            </div>

            <nav className="sidebar-nav">
                <a href="/" className="nav-item">
                    Dashboard
                </a>
                <a href="" className="nav-item active">
                    Employee List
                </a>
            </nav>
        </aside>
    );
};