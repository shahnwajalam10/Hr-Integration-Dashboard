import React from 'react';

const StatusTag = ({ status }) => {
  const baseClass =
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition duration-200';

  const statusStyles = {
    Success: 'bg-green-100 text-green-700 ring-1 ring-green-300',
    Failure: 'bg-red-100 text-red-700 ring-1 ring-red-300',
    Warning: 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300 animate-pulse',
    Pending: 'bg-blue-100 text-blue-700 ring-1 ring-blue-300',
  };

  const defaultStyle = 'bg-gray-100 text-gray-700 ring-1 ring-gray-300';

  return (
    <span className={`${baseClass} ${statusStyles[status] || defaultStyle}`}>
      {status}
    </span>
  );
};

export default StatusTag;
