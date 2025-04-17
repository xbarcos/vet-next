import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest, res: NextResponse) {
  const cookieStore = await cookies();
  cookieStore.delete('token');

  res = NextResponse.redirect(new URL('/', req.url));
  return res;
}

