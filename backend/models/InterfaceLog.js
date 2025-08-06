
const mongoose = require('mongoose');

const interfaceLogSchema = new mongoose.Schema({
  interfaceName: String,
  integrationKey: String,
  status: { type: String, enum: ['Success', 'Failure', 'Warning'] },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InterfaceLog', interfaceLogSchema);
