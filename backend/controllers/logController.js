const InterfaceLog = require('../models/InterfaceLog');
const { subHours, subDays, isAfter } = require('date-fns');

const getLogs = async (req, res) => {
  try {
    const { status, interfaceName, start, end } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (interfaceName) filter.interfaceName = interfaceName;

    if (start || end) {
      filter.timestamp = {};
      if (start) filter.timestamp.$gte = new Date(start);
      if (end) filter.timestamp.$lte = new Date(end);
    }

    const logs = await InterfaceLog.find(filter).sort({ timestamp: -1 }).limit(500);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

const createLog = async (req, res) => {
  try {
    const newLog = new InterfaceLog(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create log' });
  }
};

const getDashboardMetrics = async (req, res) => {
  try {
    const logs = await InterfaceLog.find({
      timestamp: {
        $gte: subDays(new Date(), 30)
      }
    });

    const metrics = { success: 0, failure: 0, warning: 0, trend: [] };

    logs.forEach(log => {
      metrics[log.status.toLowerCase()]++;
    });

    // Daily trend
    const trendMap = {};

    logs.forEach(log => {
      const day = log.timestamp.toISOString().split('T')[0];
      if (!trendMap[day]) trendMap[day] = { date: day, success: 0, failure: 0 };
      if (log.status === 'Success') trendMap[day].success++;
      if (log.status === 'Failure') trendMap[day].failure++;
    });

    metrics.trend = Object.values(trendMap).sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
};

module.exports = { getLogs, createLog, getDashboardMetrics };
