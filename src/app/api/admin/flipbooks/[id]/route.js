import { NextResponse } from 'next/server';
import { Flipbook } from '@/models';
import { connectToDatabase } from '@/lib/db';
import { Op } from 'sequelize';

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();

    // Check slug uniqueness excluding self
    if (data.slug) {
      const existing = await Flipbook.findOne({ 
        where: { 
          slug: data.slug,
          id: { [Op.ne]: id }
        } 
      });
      if (existing) {
        return NextResponse.json({
          success: false,
          message: "Slug already exists",
          data: null
        }, { status: 400 });
      }
    }

    const [updatedRows] = await Flipbook.update(data, {
      where: { id }
    });

    if (updatedRows === 0) {
      const exists = await Flipbook.findByPk(id);
      if (!exists) {
        return NextResponse.json({
          success: false,
          message: "Flipbook not found",
          data: null
        }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: "No changes detected",
        data: exists
      });
    }

    const updatedFlipbook = await Flipbook.findByPk(id);
    return NextResponse.json({
      success: true,
      message: "Flipbook updated successfully",
      data: updatedFlipbook
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      data: null
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deleted = await Flipbook.destroy({ where: { id } });
    
    if (!deleted) {
      return NextResponse.json({
        success: false,
        message: "Flipbook not found",
        data: null
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Flipbook deleted successfully",
      data: null
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      data: null
    }, { status: 500 });
  }
}
