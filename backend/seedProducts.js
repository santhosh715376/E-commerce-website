const mongoose = require('mongoose');
const Product = require('./models/product');
require('dotenv').config();

const products = [
  {
    name: 'MacBook Pro 16"',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    category: 'Laptops'
  },
  {
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    category: 'Smartphones'
  },
  {
    name: 'AirPods Pro',
    price: 249,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
    category: 'Audio'
  },
  {
    name: 'iPad Air',
    price: 599,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    category: 'Tablets'
  },
  {
    name: 'Apple Watch Ultra',
    price: 799,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    category: 'Wearables'
  },
  {
    name: 'Canon EOS R5',
    price: 3899,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
    category: 'Cameras'
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();