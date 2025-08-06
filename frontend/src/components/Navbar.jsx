import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiZap } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) =>
    `relative px-2 py-1 transition-all duration-200 font-medium text-sm ${
      isActive(path) ? 'text-white font-semibold' : 'text-gray-400'
    } hover:text-white`;

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FiZap className="text-yellow-400 text-xl" />
        <h1 className="text-white text-lg font-semibold tracking-tight">
          HR Interface Monitor
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/" className={linkStyle('/')}>
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
              isActive('/') ? 'bg-yellow-400' : 'bg-transparent'
            }`}
          ></span>
          Dashboard
        </Link>
        <Link to="/logs" className={linkStyle('/logs')}>
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
              isActive('/logs') ? 'bg-yellow-400' : 'bg-transparent'
            }`}
          ></span>
          Interface Logs
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
