"use client";

import React, { useState, useEffect } from 'react';
import { firestore, storage } from '@/utils/firebase'; // Asegúrate de importar tu configuración de Firebase

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = await firestore.collection('Producto').get();
      setProducts(productsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <a href="#" key={product.id} className="group block overflow-hidden">
            <div className="relative h-[350px] sm:h-[450px]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                />
              )}
            </div>
            <div className="relative bg-white pt-3">
              <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                {product.name}
              </h3>
              <p className="mt-1.5 tracking-wide text-gray-900">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
