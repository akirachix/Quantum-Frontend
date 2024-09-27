
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/farmers/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return new NextResponse(`Failed to fetch farmers: ${errorMessage}`, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
