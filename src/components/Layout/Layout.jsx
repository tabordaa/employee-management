import React from "react";
import { Sidebar } from "./Sidebar";


export const Layout = ({children}) => {
    return (
        <div className="app-layout">
            <Sidebar/>
            <main className="main-content">
                <div className="topbar">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar registros..." />
                    </div>
                    <div className="user-profile">👤</div>
                </div>

                <div className="page-conten">
                    {children}
                </div>
            </main>
        </div>
    )
}