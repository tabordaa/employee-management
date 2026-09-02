import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span className="brand-icon">🏢</span>
                <h2>BUK</h2>
            </div>

            <nav className="sidebar-nav">
                <Link
                    to="/"
                    className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
                >
                    Dashboard
                </Link>
                <Link
                    to="/employees"
                    className={`nav-item ${location.pathname === '/employees' ? 'active' : ''}`}
                >
                    Employee list
                </Link>
            </nav>
        </aside>
    );
};