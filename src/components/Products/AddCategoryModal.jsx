import { useState } from "react";

const AddCategoryModal = ({ onClose, onAdd }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!categoryName.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    // Estructura de la solicitud POST basada en la documentación de Swagger
    const newCategory = {
      categoryName: categoryName.trim(),
      subcategories: [],
      products: [],
    };

    try {
      const response = await fetch("http://localhost:4000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error("Error al añadir la categoría");
      }

      const addedCategory = await response.json();
      onAdd(addedCategory); // Actualiza la lista de categorías con la nueva categoría
      onClose(); // Cierra el modal
    } catch (error) {
      console.error(error);
      setError("Error al añadir la categoría.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Añadir Categoría</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block mb-2">
              Nombre de la Categoría
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
