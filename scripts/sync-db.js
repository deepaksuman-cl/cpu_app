import sequelize from '../src/lib/db.js';
import School from '../src/models/School.js';
import Course from '../src/models/Course.js';
import Page from '../src/models/Page.js';
import Footer from '../src/models/Footer.js';
import Navigation from '../src/models/Navigation.js';
import ProgrammeCategory from '../src/models/ProgrammeCategory.js';
import ProgrammeCourse from '../src/models/ProgrammeCourse.js';
import AcademicSidebarLink from '../src/models/AcademicSidebarLink.js';
import ProgrammeSettings from '../src/models/ProgrammeSettings.js';

const syncDB = async () => {
  try {
    console.log('🔄 Starting database synchronization...');
    
    // We already have associations defined in the model files where needed
    // (e.g. Course references School, ProgrammeCourse references Category)
    
    await sequelize.sync({ alter: true });
    
    console.log('✅ Database synchronized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    process.exit(1);
  }
};

syncDB();
