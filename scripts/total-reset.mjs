import { Sequelize } from 'sequelize';
import * as mariadb from 'mariadb';

async function totalReset() {
  const sequelize = new Sequelize('cpu_database', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    dialectModule: mariadb,
    logging: console.log,
  });

  try {
    await sequelize.authenticate();
    console.log('--- TOTAL DATABASE RESET STARTED ---');

    // List of tables to drop based on the "Too many keys" issues seen
    const tables = ['Pages', 'Footers', 'Navigations', 'Media'];
    
    for (const table of tables) {
      console.log(`Dropping table: ${table}...`);
      await sequelize.query(`DROP TABLE IF EXISTS ${table}`).catch(err => {
        console.error(`Failed to drop ${table}: ${err.message}`);
      });
    }

    console.log('--- TOTAL RESET COMPLETE! ---');
    console.log('--- All managed tables have been cleared. ---');
    console.log('--- Re-run "npm run dev" to recreate the schema cleanly. ---');

  } catch (error) {
    console.error('Total reset failed:', error);
  } finally {
    await sequelize.close();
  }
}

totalReset();
