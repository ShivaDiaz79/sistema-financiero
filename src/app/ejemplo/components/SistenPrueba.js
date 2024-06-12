// components/SistenPrueba.js
import React, { useState } from 'react';
import { firestore } from "@/utilss/firebase";
import { motion } from 'framer-motion';

const SistenPrueba = () => {
  const [formData, setFormData] = useState({
    vendedor: '',
    azafata: '',
    limpieza: '',
    comestible: '',
    viaticos: '',
    periodo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('ventas').add(formData);
      alert('Datos guardados exitosamente');
    } catch (error) {
      console.error("Error guardando los datos: ", error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Vendedor</label>
            <input
              type="text"
              name="vendedor"
              value={formData.vendedor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Azafata</label>
            <input
              type="text"
              name="azafata"
              value={formData.azafata}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Limpieza</label>
            <input
              type="text"
              name="limpieza"
              value={formData.limpieza}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Comestible</label>
            <input
              type="text"
              name="comestible"
              value={formData.comestible}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Viaticos</label>
            <input
              type="text"
              name="viaticos"
              value={formData.viaticos}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Periodo (días)</label>
            <input
              type="number"
              name="periodo"
              value={formData.periodo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Guardar
        </button>
      </form>
    </motion.div>
  );
};

export default SistenPrueba;
