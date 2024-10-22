import React, { useState, useEffect } from 'react';

const Client = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = "http://localhost:4000/clients/";

  useEffect(() => {
    if (clientId) {
      fetchClientData();
    } else {
      setError("Invalid client ID");
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
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        <img src="/src/resources/icons/pencil-minus.svg" alt="editClient" />
      </button>
    </div>
  );
};

export default Client;
