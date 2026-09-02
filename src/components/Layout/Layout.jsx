import React from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../../context/AuthContext";


export const Layout = ({children}) => {

    const {user, logout} = useAuth();
    return (
        <div className="app-layout">
            <Sidebar/>
            <main className="main-content">
                <div className="topbar">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar registros..." />
                    </div>
                    <div className="user-profile" style={{display: 'flex', gap: '1rem', alignItems: 'Center'}}>
                        <span style={{fontWeight: '500'}}>Hola, {user?.name}!</span>
                        <button
                            onClick={logout}
                            style={{
                                backgroundColor: 'var(--status-inactive-bg)',
                                color: 'var(--status-inactive-text)',
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: '600'
                            }}
                        >
                            Salir
                        </button>
                    </div>
                </div>

                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    )
}