'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      // 1. Seedha password hash karo
      const hashedPassword = await bcrypt.hash('password123', 12);

      // 2. Bina soche seedha insert karo
      await queryInterface.bulkInsert('users', [{
        id: uuidv4(),
        name: 'Super Admin',
        email: 'admin@cpu.com',
        password: hashedPassword,
        isActive: true,
        isVerified: true,
        role: 'super_admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      
      console.log('✅ Super Admin seeded successfully!');
      
    } catch (error) {
      // 3. Agar admin pehle se hoga, toh MariaDB 'ER_DUP_ENTRY' (Duplicate) error dega
      // Hum us error ko pakad lenge aur crash hone se bacha lenge
      if (error.original && (error.original.code === 'ER_DUP_ENTRY' || error.original.errno === 1062)) {
        console.log('⚠️ Super Admin already exists. Skipping...');
      } else {
        // Agar koi aur error hui toh dikhayenge
        console.error('❌ Seeder Error:', error.message);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin@cpu.com' }, {});
  }
};