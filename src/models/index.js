import sequelize from '../lib/db.js';
import Media from './Media.js';
import HomePage from './HomePage.js';
import Navigation from './Navigation.js';
import Page from './Page.js';
import School from './School.js';
import Course from './Course.js';
import Footer from './Footer.js';
import ProgrammeCategory from './ProgrammeCategory.js';
import ProgrammeCourse from './ProgrammeCourse.js';
import ProgrammeSettings from './ProgrammeSettings.js';
import AcademicSidebarLink from './AcademicSidebarLink.js';

// Define Associations here to ensure correct initialization order
// School & Course
School.hasMany(Course, { foreignKey: 'schoolId', as: 'courses' });
Course.belongsTo(School, { foreignKey: 'schoolId', as: 'school' });

// ProgrammeCategory & ProgrammeCourse
ProgrammeCategory.hasMany(ProgrammeCourse, { foreignKey: 'categoryId', as: 'courses' });
ProgrammeCourse.belongsTo(ProgrammeCategory, { foreignKey: 'categoryId', as: 'category' });

const db = {
  sequelize,
  Media,
  HomePage,
  Navigation,
  Page,
  School,
  Course,
  Footer,
  ProgrammeCategory,
  ProgrammeCourse,
  ProgrammeSettings,
  AcademicSidebarLink
};

export {
  Media,
  HomePage,
  Navigation,
  Page,
  School,
  Course,
  Footer,
  ProgrammeCategory,
  ProgrammeCourse,
  ProgrammeSettings,
  AcademicSidebarLink
};

export default db;
