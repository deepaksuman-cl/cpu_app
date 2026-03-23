import mongoose from 'mongoose';
import Page from '../src/models/Page.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const chancellorData = {
      title: 'Message from the Chairperson',
      slug: 'chancellor',
      meta: {
        title: 'Message from the Chairperson | Career Point University',
        description: 'Guiding Career Point University with three decades of passion for education'
      },
      hero: {
        title: 'Message from the Chairperson',
        bgImage: '', // Can be set in admin
        badge: 'Leadership & Vision',
        hideHero: false
      },
      blocks: [
        {
          blockType: 'HeroWithStats',
          heroStats: {
            badgeText: 'Leadership & Vision',
            titleMain: 'Message from the ',
            titleHighlight: 'Chairperson',
            subtitle: 'Guiding Career Point University with three decades of passion for education',
            stats: [
              { icon: 'Users', label: 'Students Mentored', value: '1M+' },
              { icon: 'Award', label: 'Years of Leadership', value: '30+' },
              { icon: 'BookOpen', label: 'Institutions Led', value: '10+' },
              { icon: 'Star', label: 'Industry Recognition', value: '50+' }
            ]
          }
        },
        {
          blockType: 'LeaderProfile',
          leaderProfile: {
            image: 'https://cpur.in/wp-content/uploads/2024/05/pm-sir_008-768x803.jpeg',
            name: 'Pramod Maheshwari',
            role: 'Chairperson',
            organization: 'Career Point University',
            qualifications: [
              { icon: 'GraduationCap', degree: 'B.Tech.', institute: 'IIT Delhi' },
              { icon: 'Building2', degree: 'OPM', institute: 'Harvard Business School' },
              { icon: 'Globe', degree: 'Harvard University', institute: 'USA' }
            ],
            greeting: 'Dear Student,',
            welcomeHeadline: 'Welcome to Career Point University!',
            messageHTML: '<p>In our efforts to deliver quality & career education, we put more emphasis on determining one-to-one contact and also be very much attentive to the vital needs of each student. Our faculty team relentlessly monitors the progress of every student and guides them accordingly on the way to achieve all success in their life and career ahead.</p>',
            visionQuote: 'Education is not just about degrees — it is about building character, capability, and the confidence to face the world.',
            signatureQuals: 'B.Tech., IIT Delhi • OPM, Harvard Business School'
          }
        }
      ]
    };

    await Page.findOneAndUpdate({ slug: 'chancellor' }, chancellorData, { upsert: true, new: true });
    console.log('Chancellor page seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
