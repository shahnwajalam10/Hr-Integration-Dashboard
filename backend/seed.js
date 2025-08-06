const mongoose = require('mongoose');
const dotenv = require('dotenv');
const InterfaceLog = require('./models/InterfaceLog');

dotenv.config();

const statuses = ['Success', 'Failure', 'Warning'];
const interfaces = ['Employee Sync', 'Payroll Push', 'Leave Update', 'Timesheet Pull'];

const seedLogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await InterfaceLog.deleteMany(); // Optional: clean up first

    const logs = [];

    for (let i = 0; i < 100; i++) {
      logs.push({
        interfaceName: interfaces[Math.floor(Math.random() * interfaces.length)],
        integrationKey: `INT_KEY_${i}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        message: `Sample log message ${i}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // random past 30 days
      });
    }

    await InterfaceLog.insertMany(logs);
    console.log('Seeded 100 interface logs');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding logs:', err.message);
    process.exit(1);
  }
};

seedLogs();
