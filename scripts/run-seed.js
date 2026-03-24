import { seedDatabase } from '../src/lib/actions/seedActions.js';
import sequelize from '../src/lib/db.js';

const runSeed = async () => {
  try {
    console.log('--- Database Seeding Script ---');
    const result = await seedDatabase();
    if (result.success) {
      console.log('✅ Success:', result.message);
    } else {
      console.log('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('💥 Unexpected Error:', error);
  } finally {
    process.exit(0);
  }
};

runSeed();
