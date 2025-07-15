"use client";

import React, { useState } from 'react';
import { firestore } from "@/utils/firebase";

const Descriptions = () => {
  const [descriptions, setDescriptions] = useState(Array(10).fill(''));

  const handleChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleSubmit = async () => {
    try {
      await firestore.collection('descripciones').add({ descriptions });
      alert('Datos enviados a Firebase');
    } catch (error) {
      console.error("Error al enviar datos: ", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Descripciones de Tipos de Cosas</h1>
      {descriptions.map((item, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder={`Descripción ${index + 1}`}
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      ))}
      <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">Enviar a Firebase</button>
    </div>
  );
};

export default Descriptions;
