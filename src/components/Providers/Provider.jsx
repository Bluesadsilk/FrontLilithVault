import React, { useState, useEffect } from 'react';
import DeleteProviderModal from './DeleteProviderModal.jsx';
import EditProviderModal from './EditProviderModal.jsx';
import ProviderModal from './ProviderModal';

const Provider = ({ providerId }) => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteProviderModal, setShowDeleteProviderModal] = useState(false);
  const [showEditProviderModal, setShowEditProviderModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);

  const url = "http://localhost:4000/providers/";

  const handleDelete = () => {
    setShowDeleteProviderModal(true);
  };

  const handleEdit = () => {
    setShowEditProviderModal(true);
  };

  const handleShow = () => {
    setShowProviderModal(true);
  };

  useEffect(() => {
    if (providerId) {
      fetchProviderData();
    } else {
      setError("ID de proveedor no vàlid");
      setLoading(false);
    }
  }, [providerId]);

  const fetchProviderData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${providerId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProvider(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProvider = () => {
    // Lógica para eliminar el proveedor
    setProvider(null); // Limpia el proveedor después de eliminar
    setShowDeleteProviderModal(false); // Cierra el modal
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!provider) return <div>No se encontró el proveedor.</div>;

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <div className="flex flex-col space-y-2">
        <span><strong>ID:</strong> {provider.providerId}</span>
        <span><strong>CIF:</strong> {provider.providerCif}</span>
        <span><strong>Nombre:</strong> {provider.providerName}</span>
        <span><strong>Email:</strong> {provider.providerEmail}</span>
        <span><strong>Dirección Línea 1:</strong> {provider.providerDirLine1}</span>
        <span><strong>Dirección Línea 2:</strong> {provider.providerDirLine2 || 'N/A'}</span>
        <span><strong>Teléfono:</strong> {provider.providerPhoneNumber || 'N/A'}</span>
      </div>
      <div className='flex flex-row space-x-4'>
        <button type="button" onClick={handleShow} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          <img src="/icons/open.svg" alt="showProvider" />
        </button>

        <button type="button" onClick={handleEdit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          <img src="/icons/pencil-minus.svg" alt="editProvider" />
        </button>

        <button type="button" onClick={handleDelete} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          <img src="/icons/delete.svg" alt="deleteProvider" />
        </button>
      </div>

      {showEditProviderModal && (
        <EditProviderModal 
          provider={provider} 
          onClose={() => setShowEditProviderModal(false)} 
        />
      )}
      {showDeleteProviderModal && (
        <DeleteProviderModal 
          providerId={provider.providerId} 
          onClose={() => setShowDeleteProviderModal(false)} 
          onDelete={handleDeleteProvider} // Llama a la función de eliminación
        />
      )}
      {showProviderModal && (
        <ProviderModal 
          provider={provider} 
          isOpen={true} 
          onClose={() => setShowProviderModal(false)} 
        />
      )}
    </div>
  );
};

export default Provider;
