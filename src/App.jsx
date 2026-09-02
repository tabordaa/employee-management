import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>Dashboard Page (Soon) </h1>}></Route>
        <Route path="/employees" element={<h1>Employee Page (Soon) </h1>}></Route>
        <Route path="*" element={<h1>404 - Not foun</h1>}></Route>
      </Routes>
    </Layout>
  )
}

export default App;