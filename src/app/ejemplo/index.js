import React from "react";
import SistenPrueba from "./components/SistenPrueba";
import FinancialDashboard from "./components/FinancialDashboard";
import ProductUploader from "./components/ProductUploader";
import ProductList from "./components/ProductList";

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema de Gestión de Ventas</h1>

      <FinancialDashboard />
      <ProductUploader />
      <ProductList />
    </div>
  );
};

export default Index;
