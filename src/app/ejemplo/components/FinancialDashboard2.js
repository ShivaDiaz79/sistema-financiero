import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Bar } from 'react-chartjs-2';

const FinancialDashboard2 = () => {
    const [formData, setFormData] = useState({
        numItems: '0',
        pricePerItem: '0',
        employeeCost: '0',
        additionalCosts: '0',
        standRent: '0',
        transportCost: '0',
        taxRate: '20',
        expectedSales: '80',
    });

    const [financialData, setFinancialData] = useState({
        totalCost: 0,
        numSold: 0,
        totalRevenue: 0,
        grossProfit: 0,
        taxes: 0,
        netProfit: 0,
        roi: 0,
    });

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const calculateResults = () => {
        const {
            numItems,
            pricePerItem,
            employeeCost,
            additionalCosts,
            standRent,
            transportCost,
            taxRate,
            expectedSales,
        } = formData;

        const totalCost = parseInt(employeeCost) + parseInt(additionalCosts) + parseInt(standRent) + parseInt(transportCost);
        const numSold = (parseInt(numItems) * parseInt(expectedSales)) / 100;
        const totalRevenue = numSold * parseInt(pricePerItem);
        const grossProfit = totalRevenue - totalCost;
        const taxes = (grossProfit * parseInt(taxRate)) / 100;
        const netProfit = grossProfit - taxes;
        const roi = (netProfit / totalCost) * 100;

        setFinancialData({
            totalCost,
            numSold,
            totalRevenue,
            grossProfit,
            taxes,
            netProfit,
            roi,
        });
    };

    const pieChartData = [
        { name: 'Ganancia Bruta', value: financialData.grossProfit },
        { name: 'Impuestos', value: financialData.taxes },
        { name: 'Beneficio Neto', value: financialData.netProfit },
    ];

    const barChartData = {
        labels: ['Ganancia Bruta', 'Impuestos', 'Beneficio Neto'],
        datasets: [
            {
                label: 'Resultados Financieros',
                backgroundColor: ['#0088FE', '#FFBB28', '#00C49F'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [financialData.grossProfit, financialData.taxes, financialData.netProfit],
            },
        ],
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard Financiero</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Ingresar Datos</h2>
                <div className="flex flex-col">
                    <label>
                        Número de ítems:
                        <input
                            type="number"
                            name="numItems"
                            value={formData.numItems}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Precio por ítem:
                        <input
                            type="number"
                            name="pricePerItem"
                            value={formData.pricePerItem}
                            onChange={handleChange}
                        />
                    </label>
                    {/* Agrega los demás campos del formulario aquí */}
                </div>
                <button onClick={calculateResults}>Calcular</button>
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Gráficos</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={pieChartData}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
                <Bar data={barChartData} />
            </div>
        </div>
    );
};

export default FinancialDashboard2;

