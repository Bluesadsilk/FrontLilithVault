import React, { useState, useEffect } from 'react';

const EditClientModal = ({ client, onClose }) => {
  const [formData, setFormData] = useState(client);

  useEffect(() => {
    setFormData(client);
  }, [client]);

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
      const response = await fetch(`http://localhost:4000/clients/${client.clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error al editar el cliente: ${response.status}`);
      }
      onClose(); // Cierra el modal después de editar
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold">Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="clientNif"
              value={formData.clientNif || ''}
              onChange={handleChange}
              placeholder="NIF"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="clientName"
              value={formData.clientName || ''}
              onChange={handleChange}
              placeholder="Nombre"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="clientLastName"
              value={formData.clientLastName || ''}
              onChange={handleChange}
              placeholder="Apellido"
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail || ''}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
              required
            />
            {/* Añade más campos según lo necesites */}
            <div className="flex justify-end space-x-2">
              <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
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

export default EditClientModal;
