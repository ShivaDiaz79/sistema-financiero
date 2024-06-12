import React from 'react'
import SistenPrueba from './components/SistenPrueba'
import FinancialDashboard from './components/FinancialDashboard'
import FinancialDashboard2 from './components/FinancialDashboard2'

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema de Gestión de Ventas</h1>
      <SistenPrueba/>
      <FinancialDashboard/>
    </div>
  )
}

export default Index
