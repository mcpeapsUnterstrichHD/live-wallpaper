import { type NextRequest, NextResponse } from 'next/server';
import { example_flag } from './flags';

export async function middleware(request: NextRequest) {
  const example_flag_local = example_flag();
  console.log(example_flag_local);

  const response = NextResponse.rewrite(request.url);

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE',
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight response for 1 day
    return new NextResponse(null, { headers: response.headers });
  }

  return response;
}