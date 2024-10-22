import React, { useState, useEffect } from 'react';
import DeleteClientModal from './DeleteClientModal';
import EditClientModal from './EditClientModal';
import ClientModal from './ClientModal.jsx';

const Client = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const url = "http://localhost:4000/clients/";

  const handleDelete = () => {
    setShowDeleteClientModal(true);
  };

  const handleEdit = () => {
    setShowEditClientModal(true);
  };

  const handleShow = () => {
    setShowClientModal(true);
  };

  useEffect(() => {
    if (clientId) {
      fetchClientData();
    } else {
      setError("ID de client no vàlid");
      setLoading(false);
    }
  }, [clientId]);

  const fetchClientData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${clientId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClient(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = () => {
    // Lógica para eliminar el cliente
    setClient(null); // Limpia el cliente después de eliminar
    setShowDeleteClientModal(false); // Cierra el modal
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!client) return <div>No se encontró el cliente.</div>;

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <div className="flex flex-col space-y-2">
        <span><strong>ID:</strong> {client.clientId}</span>
        <span><strong>NIF:</strong> {client.clientNif}</span>
        <span><strong>Nombre:</strong> {client.clientName}</span>
        <span><strong>Apellido:</strong> {client.clientLastName}</span>
        <span><strong>Email:</strong> {client.clientEmail}</span>
        <span><strong>Dirección Línea 1:</strong> {client.clientDirLine1}</span>
        <span><strong>Dirección Línea 2:</strong> {client.clientDirLine2 || 'N/A'}</span>
        <span><strong>Teléfono:</strong> {client.clientPhoneNumber || 'N/A'}</span>
      </div>
      <div className='flex flex-row space-x-4'>
        <button type="button" onClick={handleShow} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          <img src="/icons/open.svg" alt="showClient" />
        </button>

        <button type="button" onClick={handleEdit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          <img src="/icons/pencil-minus.svg" alt="editClient" />
        </button>

        <button type="button" onClick={handleDelete} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          <img src="/icons/delete.svg" alt="deleteClient" />
        </button>
      </div>

      {showEditClientModal && (
        <EditClientModal 
          client={client} 
          onClose={() => setShowEditClientModal(false)} 
        />
      )}
      {showDeleteClientModal && (
        <DeleteClientModal 
          clientId={client.clientId} 
          onClose={() => setShowDeleteClientModal(false)} 
          onDelete={handleDeleteClient} // Llama a la función de eliminación
        />
      )}
      {showClientModal && (
        <ClientModal 
          client={client} 
          isOpen={true} 
          onClose={() => setShowClientModal(false)} 
        />
      )}
    </div>
  );
};

export default Client;
