
// import { ErrorBoundaryHandler } from 'next/dist/client/components/error-boundary';
// import { NextRequest, NextResponse } from 'next/server';

// const baseUrl=process.env.BASE_URL;

// export async function POST(request: NextRequest) {
//   if (!baseUrl) {
//     console.error('BASE_URL environment variable is not set.');
//     return NextResponse.json(
//       { error: 'BASE_URL environment variable is not set.' },
//       { status: 500 }
//     );
//   }
//   try {
//     const { email, password } = await request.json();
//     if (!email || !password) {
//       console.error('Validation failed: Missing username or password');
//       return NextResponse.json(
//         { error: 'Username and password are required.'},
//         { status: 400 }
//       );
//     }
//     const response = await fetch(`${baseUrl}/api/login/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     const textResponse = await response.text();
//     console.log('Backend response:', textResponse, 'Status:', response.status);
//     if (!response.ok) {
//       try {
//         const errorData = textResponse
//         return NextResponse.json(
//           { error: errorData || 'Login failed. Invalid credentials.' },
//           { status: response.status }
//         );
//       } catch (error) {
//         return NextResponse.json(
//           { error: (error as Error).message },
//           { status: response.status }
//         );
//       }
//     }
//     const result = JSON.parse(textResponse);
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error:'An error occurred. Please try again later.' },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  // Check if BASE_URL is set
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not set.' },
      { status: 500 }
    );
  }

  try {
    // Parse JSON body from the request
    const { email, password } = await request.json();

    // Validate email and password
    if (!email || !password) {
      console.error('Validation failed: Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Make the POST request to the backend
    const response = await fetch(`${baseUrl}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);

    if (!response.ok) {
      return NextResponse.json(
        { error: textResponse || 'Login failed. Invalid credentials.' },
        { status: response.status }
      );
    }

    const result = JSON.parse(textResponse);
    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error('Error occurred:', (error as Error).message);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

