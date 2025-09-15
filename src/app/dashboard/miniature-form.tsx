'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { Miniature } from '@/lib/types';
import { addMiniature, updateMiniature } from './actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  imageUrls: z.string().url('Must be a valid URL.'), // This will be a comma-separated string
  imageHints: z.string(), // This will be a comma-separated string
  isFeatured: z.boolean().default(false),
  onSaleLabel: z.string().optional(),
});

type MiniatureFormValues = z.infer<typeof formSchema>;

interface MiniatureFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (miniature: Miniature) => void;
  miniature?: Miniature;
}

export function MiniatureForm({
  isOpen,
  onClose,
  onSubmit,
  miniature,
}: MiniatureFormProps) {
  const { toast } = useToast();
  const form = useForm<MiniatureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      imageUrls: '',
      imageHints: '',
      isFeatured: false,
      onSaleLabel: '',
    },
  });

  useEffect(() => {
    if (miniature) {
      form.reset({
        name: miniature.name,
        description: miniature.description,
        price: miniature.price,
        imageUrls: miniature.imageUrls.join(','),
        imageHints: miniature.imageHints.join(','),
        isFeatured: miniature.isFeatured,
        onSaleLabel: miniature.onSale?.label || '',
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        imageUrls: 'https://picsum.photos/seed/new/600/400',
        imageHints: '',
        isFeatured: false,
        onSaleLabel: '',
      });
    }
  }, [miniature, form, isOpen]);

  const handleFormSubmit = async (values: MiniatureFormValues) => {
    const action = miniature ? updateMiniature : addMiniature;
    const miniatureData: Miniature = {
      id: miniature?.id || new Date().toISOString(),
      name: values.name,
      description: values.description,
      price: values.price,
      imageUrls: values.imageUrls.split(',').map(s => s.trim()).filter(Boolean),
      imageHints: values.imageHints.split(',').map(s => s.trim()).filter(Boolean),
      isFeatured: values.isFeatured,
      onSale: values.onSaleLabel ? { label: values.onSaleLabel } : undefined,
    };

    const result = await action(miniatureData);

    if (result.success && result.data) {
      toast({
        title: `Success: Miniature ${miniature ? 'updated' : 'added'}`,
        description: `${result.data.name} has been saved.`,
      });
      onSubmit(result.data);
    } else {
      toast({
        title: 'Error saving miniature',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {miniature ? 'Edit Miniature' : 'Add New Miniature'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the miniature. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Dragon Knight" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="2499" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A fierce warrior..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URLs</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png,..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="imageHints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Hints</FormLabel>
                  <FormControl>
                    <Input placeholder="fantasy knight, dragon armor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="onSaleLabel"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Sale Label</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 20% OFF" {...field} value={field.value ?? ''} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Miniature</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
