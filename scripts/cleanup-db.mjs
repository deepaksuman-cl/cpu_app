import { Sequelize } from 'sequelize';
import * as mariadb from 'mariadb';

async function cleanup() {
  const sequelize = new Sequelize('cpu_database', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    dialectModule: mariadb,
    logging: console.log,
  });

  try {
    await sequelize.authenticate();
    console.log('--- Database Cleanup Started ---');

    const [results] = await sequelize.query("SHOW INDEX FROM Pages WHERE Key_name != 'PRIMARY'");
    console.log(`Found ${results.length} non-primary indexes.`);

    for (const row of results) {
      console.log(`Dropping index: ${row.Key_name}`);
      try {
        await sequelize.query(`ALTER TABLE Pages DROP INDEX \`${row.Key_name}\``);
      } catch (err) {
        console.warn(`Could not drop ${row.Key_name}: ${err.message}`);
      }
    }

    console.log('--- Cleanup Complete! Please restart your dev server. ---');

  } catch (error) {
    console.error('Cleanup failed:', error);
  } finally {
    await sequelize.close();
  }
}

cleanup();
