import React from "react";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-4 w-96">
        <h2 className="text-xl font-bold mb-4">{product.productName}</h2>
        <img
          src={product.productImageLink}
          alt={product.productName}
          className="w-full h-48 object-cover mb-2"
        />
        <p className="text-gray-600 mb-4">{product.productDescription}</p>
        <h3 className="text-lg font-medium mb-2">Variantes</h3>
        {product.variants.map((variant) => (
          <div key={variant.variantId} className="border rounded p-2 mb-2">
            <h4 className="text-md font-bold">{variant.variantName}</h4>
            {variant.sizes.map((size) => (
              <div key={size.sizeId} className="text-sm">
                {size.sizeName} - Stock: {size.sizeStock}
              </div>
            ))}
            {variant.prices.map((price) => (
              <div key={price.priceId} className="text-sm">
                Precio: {price.priceAmount} (Desde {new Date(price.priceActiveFrom).toLocaleDateString()} hasta {new Date(price.priceActiveUntil).toLocaleDateString()})
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
