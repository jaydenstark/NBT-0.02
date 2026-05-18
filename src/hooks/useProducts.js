'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { products as defaultProducts } from '../data/products';
import Papa from 'papaparse';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [sheetProducts, setSheetProducts] = useState([]);
  const [firestoreProducts, setFirestoreProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFirestoreLoaded, setIsFirestoreLoaded] = useState(false);

  useEffect(() => {
    // 1. Fetch from Google Sheets
    const fetchGoogleSheets = async () => {
      try {
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/1pHzmSNsXpPdrJcGQ5kI4ZNsAaUNVeXt6knle7C_sNG0/export?format=csv&gid=1847675030';
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedProducts = [];
            for (const row of results.data) {
              if (!row.Name) continue;
              
              parsedProducts.push({
                id: `sheet_${row.Name}_${row.Size}`,
                name: row.Name,
                brand: row.Brand || 'Neat Product',
                type: row.Type?.toLowerCase() === 'industrial' ? 'industrial' : 'retail',
                category: row.Category || 'General',
                description: row.Description || '',
                image: row.Image || '/PRODUCTS%20/Neat/neat-all-purpose-floral-2l.png',
                sizes: [
                  {
                    size: row.Size || '1',
                    price: parseFloat(String(row.Price || '0').replace(/[^0-9.]/g, '')) || 0,
                    qtyInBox: parseInt(row['Qty In Box'] || row.QtyInBox) || 1
                  }
                ],
                source: 'sheet'
              });
            }
            setSheetProducts(parsedProducts);
          },
          error: (error) => {
            console.error("Error parsing Google Sheet CSV:", error);
          }
        });
      } catch (error) {
        console.error("Failed to fetch Google Sheet:", error);
      }
    };

    fetchGoogleSheets();

    // 2. Reference to the 'products' collection in Firestore
    const productsRef = collection(db, 'products');

    // Real-time listener for products
    const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
      if (!snapshot.empty) {
        const loadedProducts = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          source: 'firestore'
        }));
        setFirestoreProducts(loadedProducts);
      } else {
        setFirestoreProducts([]);
      }
      setIsFirestoreLoaded(true);
    }, (error) => {
      console.error("Error fetching products from Firestore:", error);
      setIsFirestoreLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  // Combine products whenever either source changes
  useEffect(() => {
    setProducts([...firestoreProducts, ...sheetProducts]);
    if (isFirestoreLoaded) setIsLoaded(true);
  }, [firestoreProducts, sheetProducts, isFirestoreLoaded]);

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
