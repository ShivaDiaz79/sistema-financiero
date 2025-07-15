"use client";

import React, { useState } from "react";
import { firestore } from "@/utils/firebase";
import Inventory from "@/components/Inventory";
import Questions from "@/components/Question";
import ProductList from "@/app/ejemplo/components/ProductList";
import FinancialDashboard from "@/app/ejemplo/components/FinancialDashboard";
import ProductUploader from "@/app/ejemplo/components/ProductUploader";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [answers, setAnswers] = useState(Array(20).fill(""));
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const questions = [
    {
      question: "Pregunta 1 sobre el producto",
      options: ["Opción 1", "Opción 2", "Opción 3"],
    },
    {
      question: "Pregunta 2 sobre el producto",
      options: ["Opción 1", "Opción 2", "Opción 3"],
    },
  ];

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleClientInfoChange = (e) => {
    const { name, value } = e.target;
    setClientInfo({ ...clientInfo, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await firestore.collection("ventas").add({
        product: selectedProduct,
        answers,
        clientInfo,
      });
      alert("Datos enviados a Firebase");
    } catch (error) {
      console.error("Error al enviar datos: ", error);
    }
  };

  return (
    // <div className="p-4">
    //   <Inventory onSelectProduct={setSelectedProduct} />
    //   {selectedProduct && (
    //     <>
    //       <h2 className="text-xl font-semibold mb-2">
    //         Producto Seleccionado: {selectedProduct.name}
    //       </h2>
    //       <Questions
    //         questions={questions}
    //         onAnswerChange={handleAnswerChange}
    //       />
    //       <div className="p-4">
    //         <h1 className="text-2xl font-bold mb-4">Información del Cliente</h1>
    //         <div className="mb-4">
    //           <input
    //             type="text"
    //             placeholder="Nombre"
    //             name="name"
    //             value={clientInfo.name}
    //             onChange={handleClientInfoChange}
    //             className="p-2 border border-gray-300 rounded mb-2 w-full"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <input
    //             type="text"
    //             placeholder="Teléfono"
    //             name="phone"
    //             value={clientInfo.phone}
    //             onChange={handleClientInfoChange}
    //             className="p-2 border border-gray-300 rounded mb-2 w-full"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <input
    //             type="text"
    //             placeholder="Dirección"
    //             name="address"
    //             value={clientInfo.address}
    //             onChange={handleClientInfoChange}
    //             className="p-2 border border-gray-300 rounded mb-2 w-full"
    //           />
    //         </div>
    //         <button
    //           onClick={handleSubmit}
    //           className="p-2 bg-blue-500 text-white rounded"
    //         >
    //           Enviar a Firebase
    //         </button>
    //       </div>
    //     </>
    //   )}
    <div>

      <FinancialDashboard />
      {/* <ProductList /> */}
      {/* <ProductUploader/> */}
    </div>
  );
};

export default Index;
