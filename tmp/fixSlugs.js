const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config(); // Fallback if regular .env

async function fixSlugs() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
    const db = mongoose.connection.db;
    
    const pages = await db.collection('pages').find({}).toArray();
    let updatedCount = 0;

    for (const page of pages) {
      if (page.slug && page.slug.startsWith('/')) {
        const newSlug = page.slug.replace(/^\//, ''); // Clean leading slash
        await db.collection('pages').updateOne(
          { _id: page._id }, 
          { $set: { slug: newSlug } }
        );
        console.log(`[FIXED] Cleaned slug for Page "${page.title}": ${page.slug} -> ${newSlug}`);
        updatedCount++;
      }
    }

    console.log(`\nOperation Complete. Fixed ${updatedCount} pages.`);
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    process.exit(0);
  }
}

fixSlugs();
