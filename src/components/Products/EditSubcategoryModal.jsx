import { useState } from "react";

const EditSubcategoryModal = ({ subcategory, onClose, onEditSubcategory }) => {
  const [subcategoryName, setSubcategoryName] = useState(subcategory.subcategoryName);
  const [categoryId, setCategoryId] = useState(subcategory.category.categoryId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSubcategory = { ...subcategory, subcategoryName, categoryId };
    try {
      const response = await fetch(`http://localhost:4000/subcategories/${subcategory.subcategoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSubcategory),
      });
      if (!response.ok) {
        throw new Error("Error al editar la subcategoría");
      }
      const data = await response.json();
      onEditSubcategory(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Subcategoría</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre de la Subcategoría:
            <input
              type="text"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              required
            />
          </label>
          <label>
            ID de la Categoría:
            <input
              type="text"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            />
          </label>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSubcategoryModal;
