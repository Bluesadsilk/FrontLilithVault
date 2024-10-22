import React, { useState } from "react";

const AddProductModal = ({ onClose, onAdd }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImageLink, setProductImageLink] = useState("");
  const [variants, setVariants] = useState([]);

  const handleAddVariant = () => {
    const newVariant = {
      variantId: Date.now(), // Generar un ID único temporalmente
      variantName: "",
      variantImageLink: "",
      sizes: [],
      prices: [],
    };
    setVariants((prevVariants) => [...prevVariants, newVariant]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      productId: Date.now(), // Generar un ID único temporalmente
      productName,
      productDescription,
      productImageLink,
      variants,
    };

    // Aquí deberías enviar newProduct a tu API
    await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    onAdd(newProduct); // Añadir el nuevo producto a la lista
    onClose(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 w-96">
        <h2 className="text-xl font-bold mb-4">Añadir Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nombre del Producto</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="border rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Enlace de la Imagen</label>
            <input
              type="text"
              value={productImageLink}
              onChange={(e) => setProductImageLink(e.target.value)}
              className="border rounded w-full px-2 py-1"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">Variantes</h3>
          {variants.map((variant, index) => (
            <div key={variant.variantId} className="border rounded p-2 mb-2">
              <label className="block text-sm font-medium">Nombre de la Variante</label>
              <input
                type="text"
                value={variant.variantName}
                onChange={(e) => {
                  const newVariants = [...variants];
                  newVariants[index].variantName = e.target.value;
                  setVariants(newVariants);
                }}
                className="border rounded w-full px-2 py-1"
              />
              {/* Aquí puedes agregar más campos para tamaños, precios, etc. */}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddVariant}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mb-2"
          >
            Añadir Variante
          </button>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
            >
              Añadir Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
