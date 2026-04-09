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
import Testimonial from './Testimonial.js';
import FAQ from './FAQ.js';
import PlacementPartner from './PlacementPartner.js';
import Facility from './Facility.js';
import User from './User.js';
import Flipbook from './Flipbook.js';
import Payment from './payment.js';
import AboutPageContent from './AboutPageContent.js';
import Redirect from './Redirect.js';

// Define Associations here to ensure correct initialization order
// School & Course
School.hasMany(Course, { foreignKey: 'schoolId', as: 'courses', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Course.belongsTo(School, { foreignKey: 'schoolId', as: 'school' });

// ProgrammeCategory & ProgrammeCourse
ProgrammeCategory.hasMany(ProgrammeCourse, { foreignKey: 'categoryId', as: 'courses', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProgrammeCourse.belongsTo(ProgrammeCategory, { foreignKey: 'categoryId', as: 'category' });

School.hasMany(ProgrammeCourse, { foreignKey: 'schoolId', as: 'programmeCourses', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ProgrammeCourse.belongsTo(School, { foreignKey: 'schoolId', as: 'schoolRel' });

// --- JSON EXTRACTION V2 (CHUNK 2) ---

// Testimonials
School.hasMany(Testimonial, { foreignKey: 'schoolId', as: 'testimonialsRel', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Course.hasMany(Testimonial, { foreignKey: 'courseId', as: 'testimonialsRel', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Testimonial.belongsTo(School, { foreignKey: 'schoolId', as: 'schoolRel' });
Testimonial.belongsTo(Course, { foreignKey: 'courseId', as: 'courseRel' });

// FAQs
School.hasMany(FAQ, { foreignKey: 'schoolId', as: 'faqsRel', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Course.hasMany(FAQ, { foreignKey: 'courseId', as: 'faqsRel', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
FAQ.belongsTo(School, { foreignKey: 'schoolId', as: 'schoolRel' });
FAQ.belongsTo(Course, { foreignKey: 'courseId', as: 'courseRel' });

// Placement Partners
School.hasMany(PlacementPartner, { foreignKey: 'schoolId', as: 'placementPartnersRel', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PlacementPartner.belongsTo(School, { foreignKey: 'schoolId', as: 'schoolRel' });

// Facilities
School.hasMany(Facility, { foreignKey: 'schoolId', as: 'facilitiesRel', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Facility.belongsTo(School, { foreignKey: 'schoolId', as: 'schoolRel' });

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
  AcademicSidebarLink,
  Testimonial,
  FAQ,
  PlacementPartner,
  Facility,
  User,
  Flipbook,
  Payment,
  AboutPageContent,
  Redirect
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
  AcademicSidebarLink,
  Testimonial,
  FAQ,
  PlacementPartner,
  Facility,
  User,
  Flipbook,
  Payment,
  AboutPageContent,
  Redirect
};

export default db;
