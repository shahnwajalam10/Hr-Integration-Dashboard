import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchLogs = async () => {
  const res = await axios.get(`${API_BASE}/logs`);
  return res.data;
};

export const fetchMetrics = async () => {
  const res = await axios.get(`${API_BASE}/logs/metrics`);
  return res.data;
};
