import * as mariadb from "mariadb";
import { Sequelize } from "sequelize";

const globalForSequelize = globalThis;

const sequelize =
  globalForSequelize._sequelizeInstance ||
  new Sequelize({
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "cpur",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
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

export const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await sequelize.authenticate({ alter: true });
    console.log('✅ DB authenticated successfully');

    // Import models to ensure they are registered with Sequelize
    await import('@/models/Media.js');
    await import('@/models/HomePage.js');
    await import('@/models/Navigation.js');

    if (process.env.NODE_ENV === 'development') {
      // Syncing with alter: true is now safer because models have named indexes
      await sequelize.sync({ alter: true });
      console.log('✅ DB synced (alter: true)');
    } else {
      await sequelize.sync({ alter: false });
    }

    isConnected = true;
  } catch (error) {
    console.error('❌ DB connection/sync error:', error.message);
    // Don't set isConnected to true if it failed, so it can retry
    throw error;
  }
};


export default sequelize;

