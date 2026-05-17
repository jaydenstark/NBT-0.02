'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { products as defaultProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reference to the 'products' collection in Firestore
    const productsRef = collection(db, 'products');

    // Real-time listener for products
    const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
      if (snapshot.empty) {
        // If Firestore is completely empty, seed it with the default static data
        console.log("Database empty, seeding default products...");
        const seedPromises = defaultProducts.map(async (prod) => {
          // Use the original static ID as the document ID for consistency
          const docRef = doc(db, 'products', prod.id.toString());
          await setDoc(docRef, prod);
        });
        await Promise.all(seedPromises);
      } else {
        // Load data from Firestore
        const loadedProducts = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id // Use Firestore document ID as the product ID
        }));
        
        // Sort or process if needed, here we just set them
        setProducts(loadedProducts);
        setIsLoaded(true);
      }
    }, (error) => {
      console.error("Error fetching products from Firestore:", error);
      // Fallback to local data if there's an error (e.g. offline or missing config)
      setProducts(defaultProducts);
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (product) => {
    try {
      const productsRef = collection(db, 'products');
      // Remove any existing id so Firestore generates a new unique one
      // eslint-disable-next-line no-unused-vars
      const { id, ...productData } = product;
      await addDoc(productsRef, productData);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const docRef = doc(db, 'products', updatedProduct.id.toString());
      await updateDoc(docRef, updatedProduct);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const docRef = doc(db, 'products', id.toString());
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return {
    products,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct
  };
}
