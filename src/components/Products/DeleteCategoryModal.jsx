import { useState } from "react";

const DeleteCategoryModal = ({ onClose, categoryId, onDelete }) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la categoría");
      }

      onDelete(categoryId); // Llama a la función onDelete para actualizar la lista de categorías
      onClose(); // Cierra el modal
    } catch (error) {
      console.error(error);
      setError("Error al eliminar la categoría");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Eliminar Categoría</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
