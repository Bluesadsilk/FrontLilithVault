import React, { useState } from 'react';

const AddClientModal = ({ onClose, onAdd }) => {
  const [clientData, setClientData] = useState({
    clientId: 0, // Cambia esto según cómo manejes el ID en tu API
    clientNif: '',
    clientName: '',
    clientLastName: '',
    clientEmail: '',
    clientDirLine1: '',
    clientDirLine2: '',
    clientPhoneNumber: '',
    orders: [], // Inicializa como un array vacío
    bills: []   // Inicializa como un array vacío
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error(`Error al agregar cliente: ${response.statusText}`);
      }

      const newClient = await response.json();
      onAdd(newClient); // Pasa el nuevo cliente al componente padre
      onClose(); // Cierra el modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Agregar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">NIF:</label>
            <input
              type="text"
              name="clientNif"
              value={clientData.clientNif}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nombre:</label>
            <input
              type="text"
              name="clientName"
              value={clientData.clientName}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Apellido:</label>
            <input
              type="text"
              name="clientLastName"
              value={clientData.clientLastName}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="clientEmail"
              value={clientData.clientEmail}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Dirección Línea 1:</label>
            <input
              type="text"
              name="clientDirLine1"
              value={clientData.clientDirLine1}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Dirección Línea 2:</label>
            <input
              type="text"
              name="clientDirLine2"
              value={clientData.clientDirLine2}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Teléfono:</label>
            <input
              type="text"
              name="clientPhoneNumber"
              value={clientData.clientPhoneNumber}
              onChange={handleChange}
              required
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Agregar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
