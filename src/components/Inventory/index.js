// "use client";

// import React, { useState, useEffect } from 'react';
// import { firestore } from "@/utils/firebase";

// const Inventory = ({ onSelectProduct }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const generatedProducts = Array.from({ length: 100 }, (_, i) => ({
//       id: i + 1,
//       name: `Producto ${i + 1}`,
//       price: (Math.random() * 100).toFixed(2)
//     }));
//     setProducts(generatedProducts);
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
//       <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
//         {products.map((product) => (
//           <button
//             key={product.id}
//             onClick={() => onSelectProduct(product)}
//             className="p-2 bg-blue-500 text-white rounded text-center text-xs"
//           >
//             {product.name} - ${product.price}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Inventory;

"use client";

import React, { useState, useEffect } from 'react';
import { firestore } from '@/utils/firebase';

const Inventory = ({ onSelectProduct }) => {
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
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="p-2 bg-blue-500 text-white rounded text-center text-xs"
          >
            {product.name} - ${product.price.toFixed(2)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
