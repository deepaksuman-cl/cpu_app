import * as mariadb from "mariadb";
import { Sequelize } from "sequelize";

const globalForSequelize = globalThis;

function getDbConfig() {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    try {
      const parsedUrl = new URL(databaseUrl);

      return {
        username: decodeURIComponent(
          parsedUrl.username || process.env.MYSQL_USER || process.env.DB_USER || "root",
        ),
        password: decodeURIComponent(
          parsedUrl.password || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
        ),
        database:
          parsedUrl.pathname.replace(/^\//, "") ||
          process.env.MYSQL_DATABASE ||
          process.env.DB_NAME ||
          "cpur",
        host: parsedUrl.hostname || process.env.MYSQL_HOST || process.env.DB_HOST || "127.0.0.1",
        port: parsedUrl.port
          ? parseInt(parsedUrl.port, 10)
          : parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || "3306", 10),
      };
    } catch (error) {
      console.warn("Invalid DATABASE_URL. Falling back to individual DB env vars.", error);
    }
  }

  return {
    username: process.env.MYSQL_USER || process.env.DB_USER || "root",
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "cpur",
    host: process.env.MYSQL_HOST || process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || "3306", 10),
  };
}

function formatDbError(error) {
  const message = error?.message?.trim();
  if (message) return message;

  const originalMessage = error?.original?.message?.trim();
  if (originalMessage) return originalMessage;

  const errorCode = error?.original?.code || error?.parent?.code || error?.code;
  if (errorCode) {
    return `Database connection failed (${errorCode}). Check that MariaDB is running and your env values are correct.`;
  }

  return "Database connection failed. Check that MariaDB is running and your env values are correct.";
}

const dbConfig = getDbConfig();

const sequelize =
  globalForSequelize._sequelizeInstance ||
  new Sequelize({
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
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

// 🔥 GLOBAL INITIALIZATION (PERSISTS ACROSS RELOADS)
const globalState = globalThis;

export const connectToDatabase = async () => {
  // 1. Authenticate quickly every time (Fast)
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("DB authentication error:", formatDbError(error));
    throw error;
  }

  // 2. Heavy Setup (Run only ONCE per server session)
  if (globalState._dbInitialized) return;
  if (globalState._dbInitPromise) return globalState._dbInitPromise;

  globalState._dbInitPromise = (async () => {
    try {
      console.log("🚀 Initializing Database One-Time Setup...");

      // Import centralized models and associations
      await import('@/models/index.js');

      // The Bulletproof Sync (Universal for DEV & PROD)
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await sequelize.sync({ alter: false });
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      console.log('✅ DB Schema Verified & Synced');

      globalState._dbInitialized = true;
      console.log("🏁 Database configuration complete");
    } catch (error) {
      console.error("DB initialization error:", formatDbError(error));
      throw error;
    } finally {
      globalState._dbInitPromise = null;
    }
  })();

  return globalState._dbInitPromise;
};

export default sequelize;