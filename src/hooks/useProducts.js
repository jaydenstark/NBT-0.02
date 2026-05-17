'use client';

import { useState, useEffect } from 'react';
import { products as defaultProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from LocalStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('nbt_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // If no data exists, seed it with the default static data
      setProducts(defaultProducts);
      localStorage.setItem('nbt_products', JSON.stringify(defaultProducts));
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever products change
  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('nbt_products', JSON.stringify(newProducts));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // Generate a unique ID
    };
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    saveProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    saveProducts(products.filter(p => p.id !== id));
  };

  return {
    products,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct
  };
}
