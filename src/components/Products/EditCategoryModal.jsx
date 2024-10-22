import { useState, useEffect } from "react";

const EditCategoryModal = ({ onClose, categoryId, onUpdate }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  // Cargar la información de la categoría al abrir el modal
  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await fetch(`http://localhost:4000/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error("Error al cargar la categoría");
        }
        const category = await response.json();
        setCategoryName(category.categoryName);
      } catch (error) {
        console.error(error);
        setError("Error al cargar la categoría");
      }
    };

    loadCategory();
  }, [categoryId]);

  const handleUpdate = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
      }

      onUpdate({ categoryId, categoryName }); // Llama a la función onUpdate para actualizar la lista de categorías
      onClose(); // Cierra el modal
    } catch (error) {
      console.error(error);
      setError("Error al actualizar la categoría");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Editar Categoría</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Nombre de la categoría"
          className="border rounded px-2 py-1 mb-4 w-full"
        />
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
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
