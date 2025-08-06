import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-4 px-4">{children}</main>
    </div>
  );
};

export default MainLayout;
