

import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/farmers/`);
    
    if (!response.ok) {
      const errorMessage = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch farmers details: ' + errorMessage },
        { status: response.status }
      );
    }

    const farmers = await response.json();
    return NextResponse.json(farmers);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch farmers: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    console.log('Sending request to:', `${baseURL}/api/farmers/`);
    console.log('Request data:', JSON.stringify(requestData));
    
    const response = await fetch(`${baseURL}/api/farmers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
      signal: AbortSignal.timeout(10000),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers)));

    const responseText = await response.text();
    console.log('Raw response text:', responseText);

    if (!response.ok) {
      return NextResponse.json(
        { error: responseText || 'Failed to create user' },
        { status: response.status }
      );
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON response from server' },
        { status: 500 }
      );
    }

    console.log('User created successfully:', result);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error during farmer creation:', error);
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out. The server took too long to respond.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
