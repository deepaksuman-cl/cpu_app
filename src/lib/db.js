import * as mariadb from "mariadb";
import { Sequelize } from "sequelize";

const globalForSequelize = globalThis;

const sequelize =
  globalForSequelize._sequelizeInstance ||
  new Sequelize(process.env.DATABASE_URL, {
    dialect: "mariadb",
    dialectModule: mariadb,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
      connectTimeout: 40000,
      allowPublicKeyRetrieval: true,
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

// 🔥 Important: cache connection
let isConnected = false;
let connectionPromise = null;

export const connectToDatabase = async () => {
  if (isConnected) return;
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ DB authenticated successfully');

      // Import centralized models and associations
      await import('@/models/index.js');

      if (process.env.NODE_ENV === 'development') {
        // 🚀 The Bulletproof Sync: Disable FK checks temporarily to prevent sequence errors
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ alter: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('✅ DB Auto-Synced');
      } else {
        await sequelize.sync();
      }

      isConnected = true; // 🔓 Set true BEFORE seeding to avoid circular deadlock
      console.log('🚀 Database initialization complete');

      if (process.env.NODE_ENV === 'development') {
        // 🏁 Plug & Play Auto-Seed: Detect fresh DB and populate it
        const { default: db } = await import('@/models/index.js');
        const { Navigation } = db;
        
        const navCount = await Navigation.count().catch(() => 0);
        
        if (navCount === 0) {
          console.log('🌱 Fresh Database Detected. Auto-feeding initial data...');
          const { seedDatabase } = await import('@/lib/actions/seedActions.js');
          await seedDatabase().catch(err => {
            console.error('❌ Auto-Seed Failed:', err.message);
          });
        }
      }
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

