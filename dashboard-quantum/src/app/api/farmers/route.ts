import { NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/farmers/`);
    if (!response.ok) {
    return 'Failed to fetch farmers details' + response.text()
    }

    const farmers = await response.json();
    return NextResponse.json(farmers); 
  } catch (error) {
    console.error('Error fetching farmers:', error);
    return NextResponse.json({ error: 'Failed to fetch farmers' + (error as Error).message}, { status: 500 });
  }
}










