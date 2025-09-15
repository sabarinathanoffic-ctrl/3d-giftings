'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.SESSION_SECRET || 'your-secret-key-that-is-long-enough';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // Token expires in 1 hour
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // This will be caught by the middleware if the token is invalid
    return null;
  }
}

export async function createSession(payload: any) {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const session = await encrypt(payload);

  cookies().set('session', session, { expires, httpOnly: true });
}

export async function verifySession(sessionCookie: string | undefined) {
    if (!sessionCookie) return null;
    return await decrypt(sessionCookie);
}

export async function deleteSession() {
  cookies().set('session', '', { expires: new Date(0) });
}
