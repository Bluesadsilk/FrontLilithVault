import React, { useState, useEffect } from 'react';

const EditProviderModal = ({ provider, onClose, onEdit }) => {
  const [formData, setFormData] = useState(provider);

  useEffect(() => {
    setFormData(provider);
  }, [provider]);

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
      const response = await fetch(`http://localhost:4000/providers/${provider.providerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error al editar el proveedor: ${response.status}`);
      }
      onEdit(); // Llama a la función para recargar proveedores
      onClose(); // Cierra el modal después de editar
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold">Editar Proveedor</h2>
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
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProviderModal;
