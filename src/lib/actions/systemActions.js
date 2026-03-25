'use server';

import sequelize from "@/lib/db";

export default async function syncSystemDatabase() {
  try {
    await sequelize.sync({
      alter: true,
    });
    return {
      success: true,
      message: 'Database synced successfully',
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
} 