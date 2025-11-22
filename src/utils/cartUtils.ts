import { BaseProduct, CartItem } from '../types/products';

export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  if (!Array.isArray(cart)) {
    console.error('Помилка: cart має бути масивом');
    return [];
  }

  if (!product || typeof product !== 'object') {
    console.error('Помилка: product має бути об\'єктом');
    return cart;
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    console.error('Помилка: quantity має бути додатнім числом');
    return cart;
  }

  if (!product.inStock) {
    console.warn(`Товар "${product.name}" відсутній на складі`);
    return cart;
  }

  const updatedCart = [...cart];
  
  const existingItemIndex = updatedCart.findIndex(
    item => item.product.id === product.id
  );

  if (existingItemIndex !== -1) {
    updatedCart[existingItemIndex] = {
      ...updatedCart[existingItemIndex],
      quantity: updatedCart[existingItemIndex].quantity + quantity
    };
  } else {
    updatedCart.push({ product, quantity });
  }

  return updatedCart;
};

export const removeFromCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  productId: number
): CartItem<T>[] => {
  if (!Array.isArray(cart)) {
    console.error('Помилка: cart має бути масивом');
    return [];
  }

  if (typeof productId !== 'number' || productId <= 0) {
    console.error('Помилка: productId має бути додатнім числом');
    return cart;
  }

  return cart.filter(item => item.product.id !== productId);
};

export const updateQuantity = <T extends BaseProduct>(
  cart: CartItem<T>[],
  productId: number,
  quantity: number
): CartItem<T>[] => {
  if (!Array.isArray(cart)) {
    console.error('Помилка: cart має бути масивом');
    return [];
  }

  if (typeof productId !== 'number' || productId <= 0) {
    console.error('Помилка: productId має бути додатнім числом');
    return cart;
  }

  if (typeof quantity !== 'number' || quantity < 0) {
    console.error('Помилка: quantity має бути невід\'ємним числом');
    return cart;
  }

  if (quantity === 0) {
    return removeFromCart(cart, productId);
  }

  return cart.map(item =>
    item.product.id === productId
      ? { ...item, quantity }
      : item
  );
};

export const calculateTotal = <T extends BaseProduct>(
  cart: CartItem<T>[]
): number => {
  if (!Array.isArray(cart)) {
    console.error('Помилка: cart має бути масивом');
    return 0;
  }

  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

export const getCartItemsCount = <T extends BaseProduct>(
  cart: CartItem<T>[]
): number => {
  if (!Array.isArray(cart)) {
    console.error('Помилка: cart має бути масивом');
    return 0;
  }

  return cart.reduce((count, item) => count + item.quantity, 0);
};

export const clearCart = <T extends BaseProduct>(): CartItem<T>[] => {
  return [];
};