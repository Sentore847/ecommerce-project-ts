import { Electronics, Clothing, Book, CartItem } from './types/products';
import {
  findProduct,
  filterByPrice,
  filterInStock,
  sortByPrice,
  searchByName
} from './utils/productUtils';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  calculateTotal,
  getCartItemsCount
} from './utils/cartUtils';

const electronics: Electronics[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 35000,
    description: 'Флагманський смартфон від Apple',
    inStock: true,
    category: 'electronics',
    brand: 'Apple',
    warranty: 12,
    powerConsumption: '20W'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    price: 28000,
    description: 'Потужний Android смартфон',
    inStock: true,
    category: 'electronics',
    brand: 'Samsung',
    warranty: 24
  },
  {
    id: 3,
    name: 'MacBook Pro 14"',
    price: 65000,
    description: 'Професійний ноутбук для роботи',
    inStock: false,
    category: 'electronics',
    brand: 'Apple',
    warranty: 12,
    powerConsumption: '96W'
  }
];

const clothing: Clothing[] = [
  {
    id: 4,
    name: 'Джинси Levis 501',
    price: 2500,
    description: 'Класичні джинси',
    inStock: true,
    category: 'clothing',
    size: 'M',
    color: 'Синій',
    material: 'Бавовна 100%',
    gender: 'male'
  },
  {
    id: 5,
    name: 'Футболка Nike',
    price: 850,
    description: 'Спортивна футболка',
    inStock: true,
    category: 'clothing',
    size: 'L',
    color: 'Чорний',
    material: 'Поліестер 80%, Бавовна 20%',
    gender: 'unisex'
  },
  {
    id: 6,
    name: 'Сукня Zara',
    price: 1800,
    description: 'Елегантна вечірня сукня',
    inStock: true,
    category: 'clothing',
    size: 'S',
    color: 'Червоний',
    material: 'Віскоза 70%, Еластан 30%',
    gender: 'female'
  }
];

const books: Book[] = [
  {
    id: 7,
    name: 'Чистий код',
    price: 650,
    description: 'Мистецтво написання якісного коду',
    inStock: true,
    category: 'books',
    author: 'Роберт Мартін',
    pages: 464,
    isbn: '978-0132350884',
    language: 'Українська'
  },
  {
    id: 8,
    name: 'JavaScript: Повне керівництво',
    price: 890,
    description: 'Вичерпний посібник з JavaScript',
    inStock: true,
    category: 'books',
    author: 'Девід Флаган',
    pages: 1096,
    isbn: '978-1491952023',
    language: 'Українська'
  }
];

console.log('='.repeat(60));
console.log('🛍️  ІНТЕРНЕТ-МАГАЗИН З TYPESCRIPT GENERICS');
console.log('='.repeat(60));

console.log('\n📱 1. ПОШУК ТОВАРУ ЗА ID');
console.log('-'.repeat(60));
const foundPhone = findProduct(electronics, 1);
console.log('Знайдено:', foundPhone?.name, '- ціна:', foundPhone?.price, 'грн');

console.log('\n💰 2. ФІЛЬТРАЦІЯ ЗА ЦІНОЮ (до 3000 грн)');
console.log('-'.repeat(60));
const affordableClothing = filterByPrice(clothing, 3000);
affordableClothing.forEach(item => {
  console.log(`- ${item.name}: ${item.price} грн (розмір: ${item.size})`);
});

console.log('\n✅ 3. ТОВАРИ В НАЯВНОСТІ (Електроніка)');
console.log('-'.repeat(60));
const availableElectronics = filterInStock(electronics);
availableElectronics.forEach(item => {
  console.log(`- ${item.name} від ${item.brand}: ${item.price} грн`);
});

console.log('\n📊 4. СОРТУВАННЯ КНИГ ЗА ЦІНОЮ (від дешевих до дорогих)');
console.log('-'.repeat(60));
const sortedBooks = sortByPrice(books, 'asc');
sortedBooks.forEach(book => {
  console.log(`- ${book.name} (${book.author}): ${book.price} грн`);
});

console.log('\n🔍 5. ПОШУК ЗА НАЗВОЮ "Nike"');
console.log('-'.repeat(60));
const searchResults = searchByName(clothing, 'Nike');
searchResults.forEach(item => {
  console.log(`- ${item.name}: ${item.price} грн`);
});

console.log('\n🛒 6. РОБОТА З КОШИКОМ');
console.log('-'.repeat(60));

let cart: CartItem<Electronics | Clothing | Book>[] = [];

if (foundPhone) {
  cart = addToCart(cart, foundPhone, 1);
  console.log(`✓ Додано: ${foundPhone.name} (кількість: 1)`);
}

const tshirt = findProduct(clothing, 5);
if (tshirt) {
  cart = addToCart(cart, tshirt, 2);
  console.log(`✓ Додано: ${tshirt.name} (кількість: 2)`);
}

const book = findProduct(books, 7);
if (book) {
  cart = addToCart(cart, book, 1);
  console.log(`✓ Додано: ${book.name} (кількість: 1)`);
}

console.log('\n📦 ВМІСТ КОШИКА:');
console.log('-'.repeat(60));
cart.forEach(item => {
  const itemTotal = item.product.price * item.quantity;
  console.log(`- ${item.product.name}`);
  console.log(`  Ціна: ${item.product.price} грн × ${item.quantity} шт = ${itemTotal} грн`);
});

const total = calculateTotal(cart);
const itemsCount = getCartItemsCount(cart);
console.log('-'.repeat(60));
console.log(`📊 Всього товарів: ${itemsCount} шт`);
console.log(`💳 Загальна сума: ${total} грн`);

console.log('\n🔄 7. ОНОВЛЕННЯ КІЛЬКОСТІ ТОВАРУ');
console.log('-'.repeat(60));
if (tshirt) {
  cart = updateQuantity(cart, tshirt.id, 3);
  console.log(`✓ Кількість "${tshirt.name}" оновлено до 3 шт`);
  const newTotal = calculateTotal(cart);
  console.log(`💳 Нова сума: ${newTotal} грн`);
}

console.log('\n🗑️  8. ВИДАЛЕННЯ ТОВАРУ З КОШИКА');
console.log('-'.repeat(60));
if (book) {
  cart = removeFromCart(cart, book.id);
  console.log(`✓ Видалено: ${book.name}`);
  const finalTotal = calculateTotal(cart);
  console.log(`💳 Фінальна сума: ${finalTotal} грн`);
}

console.log('\n🔒 9. ДЕМОНСТРАЦІЯ ТИПОБЕЗПЕЧНОСТІ');
console.log('-'.repeat(60));
console.log('Generic типи гарантують, що:');
console.log('✓ Можна працювати з різними типами товарів');
console.log('✓ Зберігається інформація про специфічні поля');
console.log('✓ TypeScript перевіряє типи на етапі компіляції');

if (foundPhone) {
  console.log(`\nПриклад: ${foundPhone.name}`);
  console.log(`- Бренд: ${foundPhone.brand}`);
  console.log(`- Гарантія: ${foundPhone.warranty} місяців`);
}

console.log('\n' + '='.repeat(60));
console.log('✅ ДЕМОНСТРАЦІЯ ЗАВЕРШЕНА');
console.log('='.repeat(60));