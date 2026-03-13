// File: src/app/api/navigation/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Navigation from '@/models/Navigation';
import fs from 'fs';
import path from 'path';

// GET: Data laane ke liye (Auto-seed ke sath)
export async function GET() {
  try {
    await connectToDatabase();
    
    // Check karte hain ki database me pehle se data hai ya nahi
    let navData = await Navigation.findOne({ documentName: 'main_header' });
    
    // 🔴 AUTO-SEED MAGIC: Agar data nahi mila, toh local navigation.json padh ke save kar do
    if (!navData) {
      console.log("Database is empty. Auto-seeding from navigation.json...");
      const filePath = path.join(process.cwd(), 'src', 'data', 'navigation.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const defaultData = JSON.parse(fileContents);

      navData = await Navigation.create({
        documentName: 'main_header',
        data: defaultData
      });
    }

    return NextResponse.json({ success: true, data: navData.data });
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Admin Panel se data Save/Update karne ke liye
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const updatedNav = await Navigation.findOneAndUpdate(
      { documentName: 'main_header' },
      { data: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, message: 'Header Updated Successfully!', data: updatedNav });
  } catch (error) {
    console.error("Database Update Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}