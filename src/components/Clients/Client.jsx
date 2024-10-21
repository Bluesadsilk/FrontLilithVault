import React, { useState, useEffect } from 'react';

const Client = ({ clientId }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect ejecutado"); // Log para verificar que el efecto se ejecuta
    const fetchClientData = async () => {
      try {
        console.log("Intentando obtener datos del cliente..."); // Log antes de la llamada
        const response = await fetch(`http://localhost:4000/clients/${clientId}`);
        console.log(`Estado de respuesta: ${response.status}`); // Log del estado de respuesta
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Datos del cliente obtenidos:", data); // Log para verificar datos
        setClient(data);
      } catch (error) {
        console.error('Error al obtener datos del cliente:', error);
        setError(error.message);
      } finally {
        setLoading(false); // Cambiar a false siempre que termine el intento de carga
      }
    };

    fetchClientData();
  }, [clientId]); // Asegúrate de que clientId esté en las dependencias

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!client) return <div>No client found.</div>;

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-wrap space-x-4">
        <span className="font-bold">ID:</span> <span>{client.clientId}</span>
        <span className="font-bold">NIF:</span> <span>{client.clientNif}</span>
        <span className="font-bold">Name:</span> <span>{client.clientName}</span>
        <span className="font-bold">Last Name:</span> <span>{client.clientLastName}</span>
        <span className="font-bold">Email:</span> <span>{client.clientEmail}</span>
        <span className="font-bold">Address Line 1:</span> <span>{client.clientDirLine1}</span>
        <span className="font-bold">Address Line 2:</span> <span>{client.clientDirLine2 || 'N/A'}</span>
        <span className="font-bold">Phone:</span> <span>{client.clientPhoneNumber || 'N/A'}</span>
      </div>
    </div>
  );
};

export default Client;
