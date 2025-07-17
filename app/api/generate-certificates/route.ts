import { NextRequest, NextResponse } from 'next/server';
import { generateCertificateDesigns } from '../../lib/certificateService';

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();
    
    if (!category || typeof category !== 'string') {
      return NextResponse.json(
        { error: 'Category is required and must be a string' },
        { status: 400 }
      );
    }

    const designs = await generateCertificateDesigns(category);
    
    return NextResponse.json({ designs });
  } catch (error) {
    console.error('Error generating certificates:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificates' },
      { status: 500 }
    );
  }
}
