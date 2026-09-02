import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { ProtectedRoute } from "./components/Layout/ProtectedRoute";
import { Login } from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard/>
            </Layout>
          </ProtectedRoute>
          }
        />
        <Route path="/employees" element={
          <ProtectedRoute>
            <Layout>
              <h1>Employee Page (Soon) </h1>
            </Layout>
          </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 - Not foun</h1>}></Route>
      </Routes>
    </AuthProvider>
  )
}

export default App;