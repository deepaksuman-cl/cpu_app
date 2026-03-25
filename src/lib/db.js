import * as mariadb from 'mariadb';
import { Sequelize } from 'sequelize';

const globalForSequelize = globalThis;

const sequelize =
  globalForSequelize._sequelizeInstance ||
  new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mariadb',
    dialectModule: mariadb,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      connectTimeout: 40000,
    },
    pool: {
      max: 15,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForSequelize._sequelizeInstance = sequelize;
}

// 🔥 Important: cache connection
let isConnected = false;

export const connectToDatabase = async () => {
  try {
    if (isConnected) return;

    await sequelize.authenticate();
    console.log('✅ DB connected');

    await import('../models/Media.js');
    await import('../models/HomePage.js');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
    }

    isConnected = true;
  } catch (error) {
    console.error('❌ DB error:', error.message);
  }
};

export default sequelize;