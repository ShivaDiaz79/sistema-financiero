"use client";

import React, { useState } from "react";
import { firestore, storage } from "@/utils/firebase"; // Asegúrate de importar tu configuración de Firebase

const ProductUploader = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    color: "",
    size: "",
    stock: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length + imageFiles.length > 3) {
      alert("Puedes cargar un máximo de 3 imágenes");
    } else {
      setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleUpload = async () => {
    try {
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = storage.ref();
          const fileRef = storageRef.child(`productos/${file.name}`);
          await fileRef.put(file);
          return await fileRef.getDownloadURL();
        })
      );

      await firestore.collection("Producto").add({
        ...product,
        images: imageUrls,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
      });
      alert("Producto creado exitosamente");
      setProduct({
        name: "",
        price: "",
        description: "",
        color: "",
        size: "",
        stock: "",
        images: [],
      });
      setImageFiles([]);
    } catch (error) {
      console.error("Error al crear el producto: ", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Precio"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleChange}
          placeholder="Color"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="text"
          name="size"
          value={product.size}
          onChange={handleChange}
          placeholder="Talla"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Cantidad en stock"
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
      </div>
      <button
        onClick={handleUpload}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Crear Producto
      </button>
    </div>
  );
};

export default ProductUploader;
