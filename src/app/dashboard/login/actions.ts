'use server';

import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/components/auth/session';

export async function login(prevState: { error: string | undefined } | undefined, formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'root' && password === 'root@321') {
    await createSession({ isAdmin: true });
    redirect('/dashboard');
  }

  return { error: 'Invalid username or password' };
}

export async function logout() {
  await deleteSession();
  redirect('/dashboard/login');
}
