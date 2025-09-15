'use server';

import { getSettings, updateSettings } from '@/lib/data-store';
import { revalidatePath } from 'next/cache';

export async function getWhatsAppNumber(): Promise<string> {
  const settings = await getSettings();
  return settings.whatsAppNumber;
}

export async function updateWhatsAppNumber(
  newNumber: string
): Promise<{ success: boolean; error?: string }> {
  if (!/^\d+$/.test(newNumber)) {
    return { success: false, error: 'Invalid WhatsApp number. It should contain only digits.' };
  }
  try {
    await updateSettings({ whatsAppNumber: newNumber });
    revalidatePath('/dashboard/settings');
    revalidatePath('/'); // Revalidate home page where checkout sheet is used
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update WhatsApp number.' };
  }
}
