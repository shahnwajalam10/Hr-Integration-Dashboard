import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { fetchMetrics } from '../services/api';
import { FiTrendingUp, FiTrendingDown, FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import TimeRangePicker from '../components/TimeRangePicker';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [range, setRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    const getMetrics = async () => {
      setLoading(true);
      try {
        const data = await fetchMetrics(range);
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    getMetrics();
    let interval;
    if (autoRefresh) interval = setInterval(getMetrics, 10000);
    return () => clearInterval(interval);
  }, [range, autoRefresh]);

  const downloadCSV = () => {
    const rows = metrics?.trend || [];
    const csvContent = [
      ['Date', 'Success', 'Failure'],
      ...rows.map(item => [item.date, item.success, item.failure])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'metrics_trend.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-muted px-6 py-10">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Performance Dashboard</h1>
          <p className="text-muted-foreground">Monitor your system metrics in real time</p>
        </div>
        <div className="flex gap-4 items-center">
          <TimeRangePicker selected={range} onChange={setRange} />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={autoRefresh} onChange={() => setAutoRefresh(!autoRefresh)} className="accent-black" />
            Auto-Refresh
          </label>
          <button
            onClick={downloadCSV}
            className="bg-black text-white hover:bg-zinc-800 px-4 py-2 rounded-md text-sm"
          >
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <StatCard title="Success Rate" value={metrics?.success || 0} change={metrics?.successChange || 0} icon={<FiTrendingUp className="text-green-500" />} color="green" />
            <StatCard title="Failure Rate" value={metrics?.failure || 0} change={metrics?.failureChange || 0} icon={<FiTrendingDown className="text-red-500" />} color="red" />
            <StatCard title="Warnings" value={metrics?.warning || 0} change={metrics?.warningChange || 0} icon={<FiAlertTriangle className="text-yellow-500" />} color="yellow" />
            <StatCard title="System Health" value={metrics?.healthStatus || 'Good'} icon={metrics?.healthStatus === 'Critical' ? <FiAlertTriangle className="text-red-500" /> : <FiTrendingUp className="text-green-500" />} color={metrics?.healthStatus === 'Critical' ? 'red' : 'green'} />
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">Success vs. Failure Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics?.trend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="success" stroke="#22c55e" fill="#bbf7d0" />
                  <Area type="monotone" dataKey="failure" stroke="#ef4444" fill="#fecaca" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white border rounded-xl p-6 shadow-sm lg:col-span-2">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {metrics?.recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-start border-b border-gray-200 pb-4 last:border-0">
                    <div className={`p-2 rounded-md mr-4 ${
                      activity.type === 'success' ? 'bg-green-100 text-green-600' :
                      activity.type === 'failure' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'success' ? <FiTrendingUp /> : activity.type === 'failure' ? <FiTrendingDown /> : <FiAlertTriangle />}
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">Status Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={[
                      { name: 'Success', value: metrics?.success || 0 },
                      { name: 'Failure', value: metrics?.failure || 0 },
                      { name: 'Warning', value: metrics?.warning || 0 },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#ef4444" />
                    <Cell fill="#fbbf24" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Top Errors</h2>
            <div className="space-y-3 text-sm text-red-700">
              {metrics?.topErrors?.map((err, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  <span>{err.message}</span>
                  <span className="font-semibold">{err.count}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
