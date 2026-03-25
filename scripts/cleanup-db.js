const { Sequelize } = require('sequelize');
const mariadb = require('mariadb');

async function cleanup() {
  const sequelize = new Sequelize('cpu_database', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    dialectModule: mariadb,
    logging: console.log,
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to database for cleanup.');

    // 1. Get all indexes for the Pages table
    const [results] = await sequelize.query("SHOW INDEX FROM Pages WHERE Key_name != 'PRIMARY'");
    
    console.log(`Found ${results.length} non-primary indexes.`);

    // 2. Drop all non-primary indexes
    const dropPromises = results.map(row => {
      console.log(`Dropping index: ${row.Key_name}`);
      return sequelize.query(`ALTER TABLE Pages DROP INDEX \`${row.Key_name}\``).catch(err => {
        console.warn(`Could not drop ${row.Key_name}: ${err.message}`);
      });
    });

    await Promise.all(dropPromises);
    console.log('Cleanup complete! Please restart your dev server.');

  } catch (error) {
    console.error('Cleanup failed:', error);
  } finally {
    await sequelize.close();
  }
}
cleanup();
