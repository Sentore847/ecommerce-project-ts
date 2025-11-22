import { BaseProduct } from '../types/products';


export const findProduct = <T extends BaseProduct>(
  products: T[],
  id: number
): T | undefined => {
  if (!Array.isArray(products)) {
    console.error('Помилка: products має бути масивом');
    return undefined;
  }

  if (typeof id !== 'number' || id <= 0) {
    console.error('Помилка: id має бути додатнім числом');
    return undefined;
  }

  return products.find(product => product.id === id);
};

export const filterByPrice = <T extends BaseProduct>(
  products: T[],
  maxPrice: number
): T[] => {
  if (!Array.isArray(products)) {
    console.error('Помилка: products має бути масивом');
    return [];
  }

  if (typeof maxPrice !== 'number' || maxPrice < 0) {
    console.error('Помилка: maxPrice має бути невід\'ємним числом');
    return [];
  }

  return products.filter(product => product.price <= maxPrice);
};

export const filterInStock = <T extends BaseProduct>(
  products: T[]
): T[] => {
  if (!Array.isArray(products)) {
    console.error('Помилка: products має бути масивом');
    return [];
  }

  return products.filter(product => product.inStock);
};

export const sortByPrice = <T extends BaseProduct>(
  products: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  if (!Array.isArray(products)) {
    console.error('Помилка: products має бути масивом');
    return [];
  }

  const sorted = [...products];
  
  return sorted.sort((a, b) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });
};

export const searchByName = <T extends BaseProduct>(
  products: T[],
  searchTerm: string
): T[] => {
  if (!Array.isArray(products)) {
    console.error('Помилка: products має бути масивом');
    return [];
  }

  if (typeof searchTerm !== 'string') {
    console.error('Помилка: searchTerm має бути рядком');
    return [];
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerSearchTerm)
  );
};