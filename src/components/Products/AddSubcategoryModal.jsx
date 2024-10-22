import { useState } from "react";

const AddSubcategoryModal = ({ onClose, onAddSubcategory }) => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSubcategory = { subcategoryName, categoryId };
    try {
      const response = await fetch("http://localhost:4000/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubcategory),
      });
      if (!response.ok) {
        throw new Error("Error al añadir la subcategoría");
      }
      const data = await response.json();
      onAddSubcategory(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Añadir Subcategoría</h2>
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
          <button type="submit">Añadir</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubcategoryModal;
