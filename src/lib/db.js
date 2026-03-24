import { Sequelize } from 'sequelize';
import * as mariadb from 'mariadb';

// ─── SEQUELIZE INSTANCE ───
// We use 127.0.0.1 to avoid local DNS issues often found with 'localhost' in Node.js
const sequelize = new Sequelize('cpu_database', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mariadb',
  dialectModule: mariadb, // Force the use of the 'mariadb' package
  logging: false, // Set to console.log to see SQL queries during development
  dialectOptions: {
    connectTimeout: 60000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MariaDB connected via Sequelize');
    
    // Sync models (This will create tables if they don't exist)
    // We use alter: true to update tables without dropping data if possible
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

export default sequelize;