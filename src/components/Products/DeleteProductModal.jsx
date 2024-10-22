import React from "react";

const DeleteProductModal = ({ product, onClose, onDelete }) => {
  const handleDelete = async () => {
    // Aquí deberías enviar la petición para eliminar el producto
    await fetch(`http://localhost:4000/products/${product.productId}`, {
      method: "DELETE",
    });

    onDelete(product.productId); // Llamar a la función de eliminación
    onClose(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 w-96">
        <h2 className="text-xl font-bold mb-4">Eliminar Producto</h2>
        <p>¿Estás seguro de que deseas eliminar el producto "{product.productName}"?</p>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
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

export default DeleteProductModal;
