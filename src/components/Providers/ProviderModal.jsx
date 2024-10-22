import React from 'react';

const ProviderModal = ({ provider, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Detalles del Proveedor</h2>
        <p><strong>ID:</strong> {provider.providerId}</p>
        <p><strong>CIF:</strong> {provider.providerCif}</p>
        <p><strong>Nombre:</strong> {provider.providerName}</p>
        <p><strong>Email:</strong> {provider.providerEmail}</p>
        <p><strong>Dirección Línea 1:</strong> {provider.providerDirLine1}</p>
        <p><strong>Dirección Línea 2:</strong> {provider.providerDirLine2 || 'N/A'}</p>
        <p><strong>Teléfono:</strong> {provider.providerPhoneNumber || 'N/A'}</p>
        <div className="flex justify-end mt-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" 
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderModal;
