import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
