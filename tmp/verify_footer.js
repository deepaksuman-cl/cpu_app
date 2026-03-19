const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Simple mock for connectToDatabase if needed, but we'll try to use the real one
const { connectToDatabase } = require('../src/lib/db');
const Footer = require('../src/models/Footer').default || require('../src/models/Footer');

async function test() {
  try {
    await connectToDatabase();
    console.log('--- Connected to DB ---');

    // 1. Clear existing footer for clean test
    await Footer.deleteMany({});
    console.log('DB cleared.');

    // 2. Test getFooter manually (Logic only)
    console.log('\n--- Testing getFooter fallback ---');
    const footerCount = await Footer.countDocuments();
    if (footerCount === 0) {
      console.log('SUCCESS: DB is empty. (Real action would return default JSON)');
    }

    // 3. Test updateFooter (Upsert)
    console.log('\n--- Testing updateFooter (Upsert) ---');
    const testData = {
      aboutText: 'Test Footer Update',
      logo: 'test-logo.png'
    };

    const updated = await Footer.findOneAndUpdate(
      {}, 
      testData, 
      { upsert: true, new: true }
    );
    console.log('Updated/Created Footer aboutText:', updated.aboutText);

    // 4. Test Second Update (Should update same document)
    console.log('\n--- Testing Second Update (Stay Single Doc) ---');
    await Footer.findOneAndUpdate({}, { aboutText: 'Updated Again' }, { upsert: true });
    const finalCount = await Footer.countDocuments();
    const finalDoc = await Footer.findOne({});
    console.log('Doc Count:', finalCount);
    console.log('Final aboutText:', finalDoc.aboutText);

    if (finalCount === 1) {
      console.log('\nSUCCESS: Single footer document logic verified.');
    } else {
      console.log('\nFAILURE: Multiple footer documents found!');
    }

    process.exit(0);
  } catch (err) {
    console.error('Test Failed:', err);
    process.exit(1);
  }
}

test();
