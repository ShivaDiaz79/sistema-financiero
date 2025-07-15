// import React from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell,
// } from 'recharts';

// const FinancialDashboard = () => {
//   // Datos para los gráficos
//   const salesData = [
//     { month: 'Jan', sales: 4000 },
//     { month: 'Feb', sales: 3000 },
//     { month: 'Mar', sales: 2000 },
//     { month: 'Apr', sales: 2780 },
//     { month: 'May', sales: 1890 },
//     { month: 'Jun', sales: 2390 },
//     { month: 'Jul', sales: 3490 },
//     { month: 'Aug', sales: 4000 },
//     { month: 'Sep', sales: 3000 },
//     { month: 'Oct', sales: 2000 },
//     { month: 'Nov', sales: 2780 },
//     { month: 'Dec', sales: 1890 },
//   ];

//   const costData = [
//     { name: 'Funcionarios', value: 10000 },
//     { name: 'Gastos adicionales', value: 5000 },
//     { name: 'Alquiler del stand', value: 25000 },
//     { name: 'Traslado de ejemplares', value: 5000 },
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   // Datos del caso de estudio
//   const studyData = {
//     headsToSell: 400,
//     employees: 10,
//     hostesses: 3,
//     disguisedSellers: 5,
//     others: 2,
//     employeeExpense: 10000,
//     additionalExpenses: 5000,
//     standRent: 25000,
//     transportCost: 5000,
//     salesPrice: 1000,
//     salesPercentage: 0.8
//   };

//   // Cálculos financieros
//   const totalCost = studyData.employeeExpense + studyData.additionalExpenses + studyData.standRent + studyData.transportCost;
//   const totalRevenue = studyData.headsToSell * studyData.salesPercentage * studyData.salesPrice;
//   const grossProfit = totalRevenue - totalCost;
//   const tax = grossProfit * 0.2;
//   const netProfit = grossProfit - tax;
//   const margin = (grossProfit / totalRevenue) * 100;
//   const conversionRate = studyData.salesPercentage * 100;
//   const ROI = (netProfit / totalCost) * 100;

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard Financiero</h1>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Ventas Mensuales</h2>
//         <LineChart
//           width={600}
//           height={300}
//           data={salesData}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Distribución de Costos</h2>
//         <PieChart width={400} height={400}>
//           <Pie
//             data={costData}
//             cx={200}
//             cy={200}
//             labelLine={false}
//             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//             outerRadius={150}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {costData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//         </PieChart>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Estado de Resultados</h2>
//         <div className="p-4 bg-gray-100 rounded shadow-md">
//           <p>Ingresos Totales: ${totalRevenue}</p>
//           <p>Costos Totales: ${totalCost}</p>
//           <p>Ganancia Bruta: ${grossProfit}</p>
//           <p>Impuestos (20%): ${tax}</p>
//           <p>Beneficio Neto: ${netProfit}</p>
//         </div>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Flujo de Caja</h2>
//         <div className="p-4 bg-gray-100 rounded shadow-md">
//           <p>Ingresos: ${totalRevenue}</p>
//           <p>Egresos:</p>
//           <ul>
//             <li>Gasto en funcionarios: ${studyData.employeeExpense}</li>
//             <li>Gastos adicionales: ${studyData.additionalExpenses}</li>
//             <li>Alquiler del stand: ${studyData.standRent}</li>
//             <li>Traslado de ejemplares: ${studyData.transportCost}</li>
//             <li>Impuestos: ${tax}</li>
//           </ul>
//           <p>Flujo de Caja Neto: ${netProfit}</p>
//         </div>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Métricas Clave</h2>
//         <div className="p-4 bg-gray-100 rounded shadow-md">
//           <p>Margen de Utilidad: {margin.toFixed(2)}%</p>
//           <p>Tasa de Conversión: {conversionRate}%</p>
//           <p>ROI: {ROI.toFixed(2)}%</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinancialDashboard;


// import React, { useState } from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell,
// } from 'recharts';

// const FinancialDashboard = () => {
//   const [inputs, setInputs] = useState({
//     headsToSell: '',
//     employees: '',
//     hostesses: '',
//     disguisedSellers: '',
//     others: '',
//     employeeExpense: '',
//     additionalExpenses: '',
//     standRent: '',
//     transportCost: '',
//     salesPrice: '',
//     salesPercentage: '',
//   });

//   const [calculatedData, setCalculatedData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...inputs, [name]: value });
//   };

//   const handleCalculate = () => {
//     const {
//       headsToSell, employees, hostesses, disguisedSellers, others,
//       employeeExpense, additionalExpenses, standRent, transportCost,
//       salesPrice, salesPercentage
//     } = inputs;

//     const totalCost = parseFloat(employeeExpense) + parseFloat(additionalExpenses) + parseFloat(standRent) + parseFloat(transportCost);
//     const totalRevenue = parseFloat(headsToSell) * parseFloat(salesPercentage) * parseFloat(salesPrice);
//     const grossProfit = totalRevenue - totalCost;
//     const tax = grossProfit * 0.2;
//     const netProfit = grossProfit - tax;
//     const margin = (grossProfit / totalRevenue) * 100;
//     const conversionRate = parseFloat(salesPercentage) * 100;
//     const ROI = (netProfit / totalCost) * 100;

//     setCalculatedData({
//       totalCost, totalRevenue, grossProfit, tax, netProfit, margin, conversionRate, ROI
//     });
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard Financiero</h1>
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Ingrese sus datos</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {Object.keys(inputs).map((key) => (
//             <div key={key} className="flex flex-col">
//               <label className="mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
//               <input
//                 type="number"
//                 name={key}
//                 value={inputs[key]}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded"
//               />
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={handleCalculate}
//           className="mt-4 p-2 bg-blue-500 text-white rounded"
//         >
//           Calcular
//         </button>
//       </div>

//       {calculatedData && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Ventas Mensuales</h2>
//             <LineChart
//               width={600}
//               height={300}
//               data={[...Array(12)].map((_, index) => ({ month: `Mes ${index + 1}`, sales: Math.random() * 5000 }))}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
//             </LineChart>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Distribución de Costos</h2>
//             <PieChart width={400} height={400}>
//               <Pie
//                 data={[
//                   { name: 'Funcionarios', value: parseFloat(inputs.employeeExpense) },
//                   { name: 'Gastos adicionales', value: parseFloat(inputs.additionalExpenses) },
//                   { name: 'Alquiler del stand', value: parseFloat(inputs.standRent) },
//                   { name: 'Traslado de ejemplares', value: parseFloat(inputs.transportCost) },
//                 ]}
//                 cx={200}
//                 cy={200}
//                 labelLine={false}
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={150}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {[
//                   { name: 'Funcionarios', value: parseFloat(inputs.employeeExpense) },
//                   { name: 'Gastos adicionales', value: parseFloat(inputs.additionalExpenses) },
//                   { name: 'Alquiler del stand', value: parseFloat(inputs.standRent) },
//                   { name: 'Traslado de ejemplares', value: parseFloat(inputs.transportCost) },
//                 ].map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Estado de Resultados</h2>
//             <div className="p-4 bg-gray-100 rounded shadow-md">
//               <p>Ingresos Totales: ${calculatedData.totalRevenue}</p>
//               <p>Costos Totales: ${calculatedData.totalCost}</p>
//               <p>Ganancia Bruta: ${calculatedData.grossProfit}</p>
//               <p>Impuestos (20%): ${calculatedData.tax}</p>
//               <p>Beneficio Neto: ${calculatedData.netProfit}</p>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Flujo de Caja</h2>
//             <div className="p-4 bg-gray-100 rounded shadow-md">
//               <p>Ingresos: ${calculatedData.totalRevenue}</p>
//               <p>Egresos:</p>
//               <ul>
//                 <li>Gasto en funcionarios: ${inputs.employeeExpense}</li>
//                 <li>Gastos adicionales: ${inputs.additionalExpenses}</li>
//                 <li>Alquiler del stand: ${inputs.standRent}</li>
//                 <li>Traslado de ejemplares: ${inputs.transportCost}</li>
//                 <li>Impuestos: ${calculatedData.tax}</li>
//               </ul>
//               <p>Flujo de Caja Neto: ${calculatedData.netProfit}</p>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Métricas Clave</h2>
//             <div className="p-4 bg-gray-100 rounded shadow-md">
//               <p>Margen de Utilidad: {calculatedData.margin.toFixed(2)}%</p>
//               <p>Tasa de Conversión: {calculatedData.conversionRate}%</p>
//               <p>ROI: {calculatedData.ROI.toFixed(2)}%</p>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default FinancialDashboard;

// "use client";

// import React, { useState } from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell,
// } from 'recharts';

// const FinancialDashboard = () => {
//   const [inputs, setInputs] = useState({
//     headsToSell: '',
//     employees: '',
//     hostesses: '',
//     disguisedSellers: '',
//     others: '',
//     employeeExpense: '',
//     additionalExpenses: '',
//     standRent: '',
//     transportCost: '',
//     salesPrice: '',
//     salesPercentage: '',
//   });

//   const [calculatedData, setCalculatedData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...inputs, [name]: value });
//   };

//   const handleCalculate = () => {
//     const {
//       headsToSell, employees, hostesses, disguisedSellers, others,
//       employeeExpense, additionalExpenses, standRent, transportCost,
//       salesPrice, salesPercentage
//     } = inputs;

//     const totalCost = parseFloat(employeeExpense) + parseFloat(additionalExpenses) + parseFloat(standRent) + parseFloat(transportCost);
//     const totalRevenue = parseFloat(headsToSell) * parseFloat(salesPercentage) * parseFloat(salesPrice);
//     const grossProfit = totalRevenue - totalCost;
//     const tax = grossProfit * 0.2;
//     const netProfit = grossProfit - tax;
//     const margin = (grossProfit / totalRevenue) * 100;
//     const conversionRate = parseFloat(salesPercentage) * 100;
//     const ROI = (netProfit / totalCost) * 100;

//     setCalculatedData({
//       totalCost, totalRevenue, grossProfit, tax, netProfit, margin, conversionRate, ROI
//     });
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard Financiero</h1>
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Ingrese sus datos</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {Object.keys(inputs).map((key) => (
//             <div key={key} className="flex flex-col">
//               <label className="mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
//               <input
//                 type="number"
//                 name={key}
//                 value={inputs[key]}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded"
//               />
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={handleCalculate}
//           className="mt-4 p-2 bg-blue-500 text-white rounded"
//         >
//           Calcular
//         </button>
//       </div>

//       {calculatedData && (
//         <>
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Ventas Mensuales</h2>
//             <LineChart
//               width={600}
//               height={300}
//               data={[...Array(12)].map((_, index) => ({ month: `Mes ${index + 1}`, sales: Math.random() * 5000 }))}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
//             </LineChart>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Distribución de Costos</h2>
//             <PieChart width={400} height={400}>
//               <Pie
//                 data={[
//                   { name: 'Funcionarios', value: parseFloat(inputs.employeeExpense) },
//                   { name: 'Gastos adicionales', value: parseFloat(inputs.additionalExpenses) },
//                   { name: 'Alquiler del stand', value: parseFloat(inputs.standRent) },
//                   { name: 'Traslado de ejemplares', value: parseFloat(inputs.transportCost) },
//                 ]}
//                 cx={200}
//                 cy={200}
//                 labelLine={false}
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={150}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {[
//                   { name: 'Funcionarios', value: parseFloat(inputs.employeeExpense) },
//                   { name: 'Gastos adicionales', value: parseFloat(inputs.additionalExpenses) },
//                   { name: 'Alquiler del stand', value: parseFloat(inputs.standRent) },
//                   { name: 'Traslado de ejemplares', value: parseFloat(inputs.transportCost) },
//                 ].map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Estado de Resultados</h2>
//             <div className="p-4 bg-gray-100 rounded shadow-md">
//               <p>Ingresos Totales: ${calculatedData.totalRevenue}</p>
//               <p>Costos Totales: ${calculatedData.totalCost}</p>
//               <p>Ganancia Bruta: ${calculatedData.grossProfit}</p>
//               <p>Impuestos (20%): ${calculatedData.tax}</p>
//               <p>Beneficio Neto: ${calculatedData.netProfit}</p>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Flujo de Caja</h2>
//             <div className="p-4 bg-gray-100 rounded shadow-md">
//               <p>Ingresos: ${calculatedData.totalRevenue}</p>
//               <p>Egresos:</p>
//               <ul>
//                 <li>Gasto en funcionarios: ${inputs.employeeExpense}</li>
//                 <li>Gastos adicionales: ${inputs.additionalExpenses}</li>
//                 <li>Alquiler del stand: ${inputs.standRent}</li>
//                 <li>Traslado de ejemplares: ${inputs.transportCost}</li>
//                 <li>Impuestos: ${calculatedData.tax}</li>
//               </ul>
//               <p>Flujo de Caja Neto: ${calculatedData.netProfit}</p>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Métricas Clave</h2>
//             <div className="p-4 bg-gray-100 rounded shadow-md">
//               <p>Margen de Utilidad: {calculatedData.margin.toFixed(2)}%</p>
//               <p>Tasa de Conversión: {calculatedData.conversionRate}%</p>
//               <p>ROI: {calculatedData.ROI.toFixed(2)}%</p>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default FinancialDashboard;

// "use client";

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
// } from 'recharts';

// const FinancialDashboard = () => {
//   const [inputs, setInputs] = useState({
//     headsToSell: '',
//     employees: '',
//     hostesses: '',
//     disguisedSellers: '',
//     others: '',
//     employeeExpense: '',
//     additionalExpenses: '',
//     standRent: '',
//     transportCost: '',
//     salesPrice: '',
//     salesPercentage: '',
//   });

//   const [calculatedData, setCalculatedData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...inputs, [name]: value });
//   };

//   const handleCalculate = () => {
//     const {
//       headsToSell, employees, hostesses, disguisedSellers, others,
//       employeeExpense, additionalExpenses, standRent, transportCost,
//       salesPrice, salesPercentage
//     } = inputs;

//     const totalCost = parseFloat(employeeExpense) + parseFloat(additionalExpenses) + parseFloat(standRent) + parseFloat(transportCost);
//     const totalRevenue = parseFloat(headsToSell) * parseFloat(salesPercentage) * parseFloat(salesPrice);
//     const grossProfit = totalRevenue - totalCost;
//     const tax = grossProfit * 0.2;
//     const netProfit = grossProfit - tax;
//     const margin = (grossProfit / totalRevenue) * 100;
//     const conversionRate = parseFloat(salesPercentage) * 100;
//     const ROI = (netProfit / totalCost) * 100;

//     setCalculatedData({
//       totalCost, totalRevenue, grossProfit, tax, netProfit, margin, conversionRate, ROI
//     });
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } }
//   };

//   const borderAnimation = {
//     initial: { borderColor: '#FF0000' },
//     animate: { borderColor: ['#FF0000', '#0000FF'], transition: { duration: 2, repeat: Infinity } }
//   };

//   return (
//     <motion.div className="flex flex-col items-center justify-center p-4"
//       initial="hidden" animate="visible" variants={containerVariants}>
//       <h1 className="text-2xl font-bold mb-4">Dashboard Financiero</h1>

//       <div className="mb-8 w-full max-w-4xl">
//         <motion.div className="p-4 bg-orange-500 text-black rounded shadow-md"
//           initial="hidden" animate="visible" variants={borderAnimation}>
//           <h2 className="text-xl font-semibold mb-2">Cargar Datos</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {Object.keys(inputs).map((key) => (
//               <div key={key} className="flex flex-col">
//                 <label className="mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
//                 <input
//                   type="number"
//                   name={key}
//                   value={inputs[key]}
//                   onChange={handleChange}
//                   className="p-2 border border-black rounded"
//                 />
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={handleCalculate}
//             className="mt-4 p-2 bg-blue-500 text-black rounded"
//           >
//             Calcular
//           </button>
//         </motion.div>
//       </div>

//       {calculatedData && (
//         <div className="mb-8 w-full max-w-4xl">
//           <motion.div className="p-4 bg-orange-500 text-black rounded shadow-md"
//             initial="hidden" animate="visible" variants={borderAnimation}>
//             <h2 className="text-xl font-semibold mb-2">Análisis de Datos</h2>
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-2">Ventas Mensuales</h2>
//               <LineChart
//                 width={600}
//                 height={300}
//                 data={[...Array(12)].map((_, index) => ({ month: `Mes ${index + 1}`, sales: Math.random() * 5000 }))}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
//               </LineChart>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-2">Distribución de Costos</h2>
//               <PieChart width={400} height={400}>
//                 <Pie
//                   data={[
//                     { name: 'Funcionarios', value: parseFloat(inputs.employeeExpense) },
//                     { name: 'Gastos adicionales', value: parseFloat(inputs.additionalExpenses) },
//                     { name: 'Alquiler del stand', value: parseFloat(inputs.standRent) },
//                     { name: 'Traslado de ejemplares', value: parseFloat(inputs.transportCost) },
//                   ]}
//                   cx={200}
//                   cy={200}
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={150}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {[
//                     { name: 'Funcionarios', value: parseFloat(inputs.employeeExpense) },
//                     { name: 'Gastos adicionales', value: parseFloat(inputs.additionalExpenses) },
//                     { name: 'Alquiler del stand', value: parseFloat(inputs.standRent) },
//                     { name: 'Traslado de ejemplares', value: parseFloat(inputs.transportCost) },
//                   ].map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-2">Estado de Resultados</h2>
//               <div className="p-4 bg-gray-100 rounded shadow-md">
//                 <p>Ingresos Totales: ${calculatedData.totalRevenue}</p>
//                 <p>Costos Totales: ${calculatedData.totalCost}</p>
//                 <p>Ganancia Bruta: ${calculatedData.grossProfit}</p>
//                 <p>Impuestos (20%): ${calculatedData.tax}</p>
//                 <p>Beneficio Neto: ${calculatedData.netProfit}</p>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-2">Flujo de Caja</h2>
//               <div className="p-4 bg-gray-100 rounded shadow-md">
//                 <p>Ingresos: ${calculatedData.totalRevenue}</p>
//                 <p>Egresos:</p>
//                 <ul>
//                   <li>Gasto en funcionarios: ${inputs.employeeExpense}</li>
//                   <li>Gastos adicionales: ${inputs.additionalExpenses}</li>
//                   <li>Alquiler del stand: ${inputs.standRent}</li>
//                   <li>Traslado de ejemplares: ${inputs.transportCost}</li>
//                   <li>Impuestos: ${calculatedData.tax}</li>
//                 </ul>
//                 <p>Flujo de Caja Neto: ${calculatedData.netProfit}</p>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-xl font-semibold mb-2">Métricas Clave</h2>
//               <div className="p-4 bg-gray-100 rounded shadow-md">
//                 <p>Margen de Utilidad: {calculatedData.margin.toFixed(2)}%</p>
//                 <p>Tasa de Conversión: {calculatedData.conversionRate}%</p>
//                 <p>ROI: {calculatedData.ROI.toFixed(2)}%</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default FinancialDashboard;
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from 'recharts';

const DashboardFinanciero = () => {
  const [inputs, setInputs] = useState({
    cabezasParaVender: '',
    empleados: '',
    anfitrionas: '',
    vendedoresDisfrazados: '',
    otros: '',
    gastoEmpleados: '',
    gastosAdicionales: '',
    alquilerStand: '',
    costoTransporte: '',
    precioVenta: '',
    porcentajeVenta: '',
  });

  const [datosCalculados, setDatosCalculados] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCalculate = () => {
    const {
      cabezasParaVender, empleados, anfitrionas, vendedoresDisfrazados, otros,
      gastoEmpleados, gastosAdicionales, alquilerStand, costoTransporte,
      precioVenta, porcentajeVenta
    } = inputs;

    const costoTotal = parseFloat(gastoEmpleados) + parseFloat(gastosAdicionales) + parseFloat(alquilerStand) + parseFloat(costoTransporte);
    const ingresosTotales = parseFloat(cabezasParaVender) * parseFloat(porcentajeVenta) * parseFloat(precioVenta);
    const gananciaBruta = ingresosTotales - costoTotal;
    const impuestos = gananciaBruta * 0.2;
    const beneficioNeto = gananciaBruta - impuestos;
    const margen = (gananciaBruta / ingresosTotales) * 100;
    const tasaConversion = parseFloat(porcentajeVenta) * 100;
    const ROI = (beneficioNeto / costoTotal) * 100;

    setDatosCalculados({
      costoTotal, ingresosTotales, gananciaBruta, impuestos, beneficioNeto, margen, tasaConversion, ROI
    });
  };

  const COLORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } }
  };

  const borderAnimation = {
    initial: { borderColor: '#FF0000' },
    animate: { borderColor: ['#FF0000', '#0000FF'], transition: { duration: 2, repeat: Infinity } }
  };

  return (
    <motion.div className="flex flex-col items-center justify-center p-4"
      initial="hidden" animate="visible" variants={containerVariants}>
      <h1 className="text-2xl font-bold mb-4">Dashboard Financiero</h1>

      <div className="mb-8 w-full max-w-4xl">
        <motion.div className="p-4 bg-orange-500 text-black rounded shadow-md"
          initial="hidden" animate="visible" variants={borderAnimation}>
          <h2 className="text-xl font-semibold mb-2">Cargar Datos</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(inputs).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="number"
                  name={key}
                  value={inputs[key]}
                  onChange={handleChange}
                  className="p-2 border border-black rounded"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleCalculate}
            className="mt-4 p-2 bg-blue-500 text-black rounded"
          >
            Calcular
          </button>
        </motion.div>
      </div>

      {datosCalculados && (
        <div className="mb-8 w-full max-w-4xl">
          <motion.div className="p-4 bg-orange-500 text-black rounded shadow-md"
            initial="hidden" animate="visible" variants={borderAnimation}>
            <h2 className="text-xl font-semibold mb-2">Análisis de Datos</h2>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Ventas Mensuales</h2>
              <LineChart
                width={600}
                height={300}
                data={[...Array(12)].map((_, index) => ({ mes: `Mes ${index + 1}`, ventas: Math.random() * 5000 }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventas" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Distribución de Costos</h2>
              <PieChart width={400} height={400}>
                <Pie
                  data={[
                    { name: 'Funcionarios', value: parseFloat(inputs.gastoEmpleados) },
                    { name: 'Gastos adicionales', value: parseFloat(inputs.gastosAdicionales) },
                    { name: 'Alquiler del stand', value: parseFloat(inputs.alquilerStand) },
                    { name: 'Traslado de ejemplares', value: parseFloat(inputs.costoTransporte) },
                  ]}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Funcionarios', value: parseFloat(inputs.gastoEmpleados) },
                    { name: 'Gastos adicionales', value: parseFloat(inputs.gastosAdicionales) },
                    { name: 'Alquiler del stand', value: parseFloat(inputs.alquilerStand) },
                    { name: 'Traslado de ejemplares', value: parseFloat(inputs.costoTransporte) },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Estado de Resultados</h2>
              <div className="p-4 bg-gray-100 rounded shadow-md">
                <p>Ingresos Totales: ${datosCalculados.ingresosTotales}</p>
                <p>Costos Totales: ${datosCalculados.costoTotal}</p>
                <p>Ganancia Bruta: ${datosCalculados.gananciaBruta}</p>
                <p>Impuestos (20%): ${datosCalculados.impuestos}</p>
                <p>Beneficio Neto: ${datosCalculados.beneficioNeto}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Flujo de Caja</h2>
              <div className="p-4 bg-gray-100 rounded shadow-md">
                <p>Ingresos: ${datosCalculados.ingresosTotales}</p>
                <p>Egresos:</p>
                <ul>
                  <li>Gasto en funcionarios: ${inputs.gastoEmpleados}</li>
                  <li>Gastos adicionales: ${inputs.gastosAdicionales}</li>
                  <li>Alquiler del stand: ${inputs.alquilerStand}</li>
                  <li>Traslado de ejemplares: ${inputs.costoTransporte}</li>
                  <li>Impuestos: ${datosCalculados.impuestos}</li>
                </ul>
                <p>Flujo de Caja Neto: ${datosCalculados.beneficioNeto}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Métricas Clave</h2>
              <div className="p-4 bg-gray-100 rounded shadow-md">
                <p>Margen de Utilidad: {datosCalculados.margen.toFixed(2)}%</p>
                <p>Tasa de Conversión: {datosCalculados.tasaConversion}%</p>
                <p>ROI: {datosCalculados.ROI.toFixed(2)}%</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardFinanciero;
