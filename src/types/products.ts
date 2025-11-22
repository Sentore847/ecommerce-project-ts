export type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
};

export type Electronics = BaseProduct & {
  category: 'electronics';
  brand: string;
  warranty: number;
  powerConsumption?: string;
};

export type Clothing = BaseProduct & {
  category: 'clothing';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  material: string;
  gender: 'male' | 'female' | 'unisex';
};

export type Book = BaseProduct & {
  category: 'books';
  author: string;
  pages: number;
  isbn: string;
  language: string;
};

export type Product = Electronics | Clothing | Book;

export type CartItem<T extends BaseProduct> = {
  product: T;
  quantity: number;
};