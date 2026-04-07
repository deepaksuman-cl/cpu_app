import { NextResponse } from 'next/server';
import db from '../../../../../models';

const AboutPageContent = db.AboutPageContent;

export async function GET() {
  try {
    const contents = await AboutPageContent.findAll();
    const data = contents.reduce((acc, curr) => {
      acc[curr.section_key] = curr.content;
      return acc;
    }, {});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Fetch About Content Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { section_key, content } = await req.json();
    
    if (!section_key || !content) {
      return NextResponse.json({ success: false, error: 'Missing section_key or content' }, { status: 400 });
    }

    const [record, created] = await AboutPageContent.findOrCreate({
      where: { section_key },
      defaults: { content }
    });

    if (!created) {
      await record.update({ content });
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error('Update About Content Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
