import * as mariadb from "mariadb";
import { Sequelize } from "sequelize";

const globalForSequelize = globalThis;

const sequelize =
  globalForSequelize._sequelizeInstance ||
  new Sequelize({
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Shashi@123",
    database: process.env.DB_NAME || "cpur",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    dialect: "mariadb",
    dialectModule: mariadb,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
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

if (process.env.NODE_ENV !== "production") {
  globalForSequelize._sequelizeInstance = sequelize;
}

// 🔥 Important: Cache the connection to prevent multiple instances
let isConnected = false;
let connectionPromise = null;

export const connectToDatabase = async () => {
  if (isConnected) return;
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ DB authenticated successfully');

      // 1. Import centralized models and associations
      await import('@/models/index.js');

      // 🚀 2. The Bulletproof Sync (Universal for DEV & PROD)
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await sequelize.sync({ alter: false });
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      console.log('✅ DB Auto-Synced (Tables verified/created)');

      isConnected = true; // 🔓 Set true BEFORE seeding to avoid circular deadlock
      console.log('🚀 Database initialization complete');

      // 🏁 3. Plug & Play Auto-Seed (Universal for DEV & PROD)
      const db = await import('@/models/index.js');
      const { Navigation } = db;
      
      // Check if the core table is empty. If it fails (e.g., table not fully ready), default to 0.
      // const navCount = await Navigation.count().catch(() => 0);
      
      // if (navCount === 0) {
      //   console.log('🌱 Fresh Database Detected. Auto-feeding initial data...');
      //   const { seedDatabase } = await import('@/lib/actions/seedActions.js');
      //   await seedDatabase().catch(err => {
      //     console.error('❌ Auto-Seed Failed:', err.message);
      //   });
      // }
      
    } catch (error) {
      console.error('❌ DB connection/sync error:', error.message);
      throw error;
    } finally {
      connectionPromise = null;
    }
  })();

  return connectionPromise;
};

export default sequelize;