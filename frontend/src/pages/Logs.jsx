import React, { useEffect, useState } from 'react';
import { fetchLogs } from '../services/api';
import StatusTag from '../components/StatusTag';
import { FiFilter, FiX } from 'react-icons/fi';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    interfaceName: '',
    integrationKey: '',
    status: '',
    message: '',
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    const getLogs = async () => {
      const data = await fetchLogs();
      setLogs(data);
      setFilteredLogs(data);
    };
    getLogs();
  }, []);

  useEffect(() => {
    let filtered = logs.filter((log) => {
      const matchesSearch =
        log.interfaceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.integrationKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters =
        log.interfaceName.toLowerCase().includes(filters.interfaceName.toLowerCase()) &&
        log.integrationKey.toLowerCase().includes(filters.integrationKey.toLowerCase()) &&
        log.status.toLowerCase().includes(filters.status.toLowerCase()) &&
        log.message.toLowerCase().includes(filters.message.toLowerCase());

      return matchesSearch && matchesFilters;
    });
    setFilteredLogs(filtered);
  }, [searchQuery, filters, logs]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Live Interface Logs
        </h1>
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search all columns..."
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg shadow hover:bg-gray-900 transition"
          >
            {showAdvancedFilters ? (
              <>
                <FiX className="text-white" /> Hide Filters
              </>
            ) : (
              <>
                <FiFilter className="text-white" /> Advanced Filters
              </>
            )}
          </button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Filter by Interface Name"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={filters.interfaceName}
            onChange={(e) => handleFilterChange('interfaceName', e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Integration Key"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={filters.integrationKey}
            onChange={(e) => handleFilterChange('integrationKey', e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Status"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Message"
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={filters.message}
            onChange={(e) => handleFilterChange('message', e.target.value)}
          />
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3">Interface Name</th>
              <th className="p-3">Integration Key</th>
              <th className="p-3">Status</th>
              <th className="p-3">Message</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-3">{log.interfaceName}</td>
                  <td className="p-3">{log.integrationKey}</td>
                  <td className="p-3">
                    <StatusTag status={log.status} />
                  </td>
                  <td className="p-3">{log.message}</td>
                  <td className="p-3 text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
