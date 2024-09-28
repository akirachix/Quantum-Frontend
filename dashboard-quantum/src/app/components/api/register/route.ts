import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL;
  
  try {
    const { firstname, lastname, email, password , role } = await request.json();
    
    const response = await fetch(`${baseUrl}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, password, role }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText, 'Status:', response.status);
      return NextResponse.json(
        { error: errorText || 'Failed to create user' },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('User created successfully:', result);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. ' + (error as Error).message },
      { status: 500 }
    );
  }
}
