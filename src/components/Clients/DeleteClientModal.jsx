import React from 'react';

const DeleteClientModal = ({ clientId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/clients/${clientId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el cliente: ${response.status}`);
      }
      onDelete(); // Llama a la función para actualizar el estado en el componente padre
      onClose(); // Cierra el modal
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold">Eliminar Cliente</h2>
        <p>¿Estás seguro de que deseas eliminar este cliente?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;
