const DeleteSubcategoryModal = ({ subcategory, onClose, onDeleteSubcategory }) => {
    const handleDelete = async () => {
      try {
        const response = await fetch(`http://localhost:4000/subcategories/${subcategory.subcategoryId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error al eliminar la subcategoría");
        }
        onDeleteSubcategory(subcategory.subcategoryId);
        onClose();
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Eliminar Subcategoría</h2>
          <p>¿Estás seguro de que deseas eliminar la subcategoría "{subcategory.subcategoryName}"?</p>
          <button type="button" onClick={handleDelete}>
            Eliminar
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    );
  };
  
  export default DeleteSubcategoryModal;
  