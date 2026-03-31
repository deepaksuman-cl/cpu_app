import { NextResponse } from 'next/server';
import { Flipbook } from '@/models';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  try {
    await connectToDatabase();
    const flipbooks = await Flipbook.findAll({
      order: [['createdAt', 'DESC']]
    });
    return NextResponse.json({
      success: true,
      message: "Flipbooks fetched successfully",
      data: flipbooks
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      data: null
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    // Check if slug exists
    if (data.slug) {
      const existing = await Flipbook.findOne({ where: { slug: data.slug } });
      if (existing) {
        return NextResponse.json({
          success: false,
          message: "Slug already exists",
          data: null
        }, { status: 400 });
      }
    }

    const flipbook = await Flipbook.create(data);
    return NextResponse.json({
      success: true,
      message: "Flipbook created successfully",
      data: flipbook
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      data: null
    }, { status: 500 });
  }
}
