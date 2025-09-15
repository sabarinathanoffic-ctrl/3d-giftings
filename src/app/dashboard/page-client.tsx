'use client';
import { useState } from 'react';
import type { Miniature } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { MiniatureForm } from './miniature-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteMiniature } from './actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

export function AdminPageClient({
  initialMiniatures,
}: {
  initialMiniatures: Miniature[];
}) {
  const [miniatures, setMiniatures] =
    useState<Miniature[]>(initialMiniatures);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMiniature, setSelectedMiniature] = useState<
    Miniature | undefined
  >(undefined);
  const { toast } = useToast();
  const router = useRouter();

  const handleOpenForm = (miniature?: Miniature) => {
    setSelectedMiniature(miniature);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedMiniature(undefined);
    setIsFormOpen(false);
  };

  const handleFormSubmit = (miniature: Miniature) => {
    if (selectedMiniature) {
      setMiniatures(
        miniatures.map((m) => (m.id === miniature.id ? miniature : m))
      );
    } else {
      setMiniatures([...miniatures, miniature]);
    }
    handleCloseForm();
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    const result = await deleteMiniature(id);
    if (result.success) {
      setMiniatures(miniatures.filter((m) => m.id !== id));
      toast({
        title: 'Success',
        description: 'Miniature deleted.',
      });
      router.refresh(); 
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };
  
  const renderActionButtons = (miniature: Miniature) => (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleOpenForm(miniature)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              miniature.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(miniature.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <Button onClick={() => handleOpenForm()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Miniature
        </Button>
      </div>

      <div className="mt-8 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {miniatures.map((miniature) => (
              <TableRow key={miniature.id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-md">
                    <Image
                      src={miniature.imageUrls[0]}
                      alt={miniature.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      data-ai-hint={miniature.imageHints[0]}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{miniature.name}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {miniature.description}
                </TableCell>
                <TableCell className="text-right">
                  ₹{miniature.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  {renderActionButtons(miniature)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <MiniatureForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        miniature={selectedMiniature}
      />
    </>
  );
}
