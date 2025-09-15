export type Miniature = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  imageHints: string[];
  isFeatured?: boolean;
  onSale?: {
    label: string;
  };
};

export type CartItem = Miniature & {
  quantity: number;
};
