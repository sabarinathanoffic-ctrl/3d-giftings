'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import type { Miniature } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface MiniatureCardProps {
  miniature: Miniature;
}

export function MiniatureCard({ miniature }: MiniatureCardProps) {
  const { addToCart } = useCart();
  const { name, description, price, imageUrls, imageHints, onSale, isFeatured } =
    miniature;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Carousel
          className="relative w-full"
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={url}
                    alt={`${name} image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    data-ai-hint={imageHints[index] || imageHints[0]}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {imageUrls.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
            </>
          )}
          {onSale && (
            <Badge
              variant="destructive"
              className="absolute right-2 top-2 animate-subtle-bob"
            >
              {onSale.label}
            </Badge>
          )}
          {isFeatured && (
            <Badge className="absolute left-2 top-2 animate-subtle-bob bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </Carousel>
        <div className="p-6 pb-0">
          <CardTitle>{name}</CardTitle>
          <CardDescription className="mt-2 h-10 overflow-hidden">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6"></CardContent>
      <CardFooter className="flex items-center justify-between p-6 pt-0">
        <p className="text-2xl font-bold text-primary">₹{price.toFixed(2)}</p>
        <Button onClick={() => addToCart(miniature)}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
