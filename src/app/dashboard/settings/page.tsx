'use client';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getWhatsAppNumber, updateWhatsAppNumber } from './actions';

type SettingsFormValues = {
  whatsappNumber: string;
};

export default function SettingsPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SettingsFormValues>();
  const [currentNumber, setCurrentNumber] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    async function fetchNumber() {
      const number = await getWhatsAppNumber();
      setCurrentNumber(number);
      setValue('whatsappNumber', number);
    }
    fetchNumber();
  }, [setValue]);

  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    const result = await updateWhatsAppNumber(data.whatsappNumber);
    if (result.success) {
      setCurrentNumber(data.whatsappNumber);
      toast({
        title: 'Success',
        description: 'WhatsApp number updated successfully.',
      });
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage application settings here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">Order WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                type="text"
                {...register('whatsappNumber', { required: 'WhatsApp number is required' })}
              />
              {errors.whatsappNumber && <p className="text-sm text-red-500">{errors.whatsappNumber.message}</p>}
              <p className="text-sm text-muted-foreground">Current number: {currentNumber}</p>
            </div>
            <Button type="submit">Save Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
