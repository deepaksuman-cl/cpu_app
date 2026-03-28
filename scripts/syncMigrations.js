
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
  logging: false
});

async function sync() {
  try {
    const [results] = await sequelize.query("SHOW TABLES LIKE 'SequelizeMeta'");
    if (results.length === 0) {
      await sequelize.query("CREATE TABLE SequelizeMeta (name VARCHAR(255) PRIMARY KEY)");
    }
    
    const migrations = [
      '20260327055451-init-schema.js',
      '20260327063000-create-system-tables.js'
    ];

    for (const m of migrations) {
      await sequelize.query("INSERT IGNORE INTO SequelizeMeta (name) VALUES (?)", {
        replacements: [m]
      });
      console.log(`Marked ${m} as completed.`);
    }
    
    console.log("Migration sync complete.");
    process.exit(0);
  } catch (err) {
    console.error("Sync failed:", err);
    process.exit(1);
  }
}

sync();
