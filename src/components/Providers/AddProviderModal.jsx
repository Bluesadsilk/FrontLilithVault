import React, { useState } from 'react';

const AddProviderModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    providerCif: '',
    providerName: '',
    providerEmail: '',
    providerDirLine1: '',
    providerDirLine2: '',
    providerPhoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/providers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error al añadir el proveedor: ${response.status}`);
      }
      onAdd(); // Llama a la función para recargar proveedores
      onClose(); // Cierra el modal después de añadir
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold">Añadir Proveedor</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="providerCif"
              value={formData.providerCif}
              onChange={handleChange}
              placeholder="CIF"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="providerName"
              value={formData.providerName}
              onChange={handleChange}
              placeholder="Nombre"
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="providerEmail"
              value={formData.providerEmail}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="providerDirLine1"
              value={formData.providerDirLine1}
              onChange={handleChange}
              placeholder="Dirección Línea 1"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="providerDirLine2"
              value={formData.providerDirLine2}
              onChange={handleChange}
              placeholder="Dirección Línea 2 (opcional)"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="providerPhoneNumber"
              value={formData.providerPhoneNumber}
              onChange={handleChange}
              placeholder="Teléfono"
              className="border p-2 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancelar
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Añadir
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProviderModal;
