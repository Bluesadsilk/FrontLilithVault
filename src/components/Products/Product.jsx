import React from "react";

const Product = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow">
      <img
        src={product.productImageLink}
        alt={product.productName}
        className="w-full h-48 object-cover mb-2"
      />
      <h2 className="text-xl font-semibold">{product.productName}</h2>
      <p className="text-gray-600">{product.productDescription}</p>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Variantes</h3>
        {product.variants.map((variant) => (
          <div key={variant.variantId} className="border rounded p-2 mt-2">
            <h4 className="text-md font-bold">{variant.variantName}</h4>
            {variant.sizes.map((size) => (
              <div key={size.sizeId} className="text-sm">
                {size.sizeName} - Stock: {size.sizeStock}
              </div>
            ))}
            {variant.prices.map((price) => (
              <div key={price.priceId} className="text-sm">
                Precio: {price.priceAmount} (Activa desde {new Date(price.priceActiveFrom).toLocaleDateString()} hasta {new Date(price.priceActiveUntil).toLocaleDateString()})
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
