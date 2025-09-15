'use server';

import { z } from 'zod';
import type { Miniature } from '@/lib/types';
import {
  addMiniatureDb,
  updateMiniatureDb,
  deleteMiniatureDb,
} from '@/lib/data-store';
import { revalidatePath } from 'next/cache';

const miniatureSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  imageUrls: z.array(z.string().url()),
  imageHints: z.array(z.string()),
  isFeatured: z.boolean().optional(),
  onSale: z.object({ label: z.string() }).optional(),
});

export async function addMiniature(
  data: Miniature
): Promise<{ success: boolean; data?: Miniature; error?: string }> {
  const validation = miniatureSchema.safeParse(data);
  if (!validation.success) {
    console.error('Validation failed:', validation.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid data provided.' };
  }
  try {
    const newMiniature = await addMiniatureDb(validation.data);
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { success: true, data: newMiniature };
  } catch (error) {
    return { success: false, error: 'Failed to add miniature.' };
  }
}

export async function updateMiniature(
  data: Miniature
): Promise<{ success: boolean; data?: Miniature; error?: string }> {
  const validation = miniatureSchema.safeParse(data);
  if (!validation.success) {
    console.error('Validation failed:', validation.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid data provided.' };
  }
  try {
    const updatedMiniature = await updateMiniatureDb(validation.data);
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { success: true, data: updatedMiniature };
  } catch (error) {
    return { success: false, error: 'Failed to update miniature.' };
  }
}

export async function deleteMiniature(
  id: string
): Promise<{ success: boolean; error?: string }> {
  if (!id) {
    return { success: false, error: 'No ID provided for deletion.' };
  }
  try {
    await deleteMiniatureDb(id);
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete miniature.' };
  }
}
