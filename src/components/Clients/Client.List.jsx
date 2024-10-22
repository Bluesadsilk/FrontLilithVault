import { useState, useEffect } from "react";
import Client from "./Client.jsx"; // Asegúrate de que esta ruta sea correcta
import AddClientModal from "./AddClientModal"; // Asegúrate de que la ruta sea correcta

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false); // Estado para manejar el modal

  // Función para cargar los clientes
  const loadClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/clients");
      if (!response.ok) {
        throw new Error("Error al cargar los clientes");
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  // Llama a loadClients cuando el componente se monta
  useEffect(() => {
    loadClients();
  }, []);

  // Filtrar clientes por ID o NIF
  const filteredClients = clients.filter(
    (client) =>
      (client.clientNif && client.clientNif.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.clientId && client.clientId.toString().includes(searchTerm))
  );

  // Limitar a los primeros diez clientes
  const displayedClients = filteredClients.slice(0, 10);

  const handleAddClient = (newClient) => {
    setClients((prevClients) => [...prevClients, newClient]);
    loadClients(); // Opcional: Recargar la lista de clientes después de añadir uno nuevo
  };

  return (
    <div className="client-container">
      <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>
      <div className="flex flex-row space-x-6 mb-4">
        <input
          type="text"
          placeholder="Buscar por ID o NIF"
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.target.value)}
          id="searchInput"
          className="border rounded px-2 py-1"
        />
        <button
          type="button"
          onClick={loadClients}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          <img src="/icons/reload.svg" alt="Reload" />
        </button>
        <button
          type="button"
          onClick={() => setShowAddClientModal(true)} // Abre el modal para añadir cliente
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Añadir Cliente
        </button>
      </div>

      {loading ? (
        <p>Cargando clientes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {displayedClients.map((client) => (
            <div key={client.clientId} className="p-2 m-2 w-72">
              <Client clientId={client.clientId} />
            </div>
          ))}
        </div>
      )}

      {showAddClientModal && (
        <AddClientModal
          onClose={() => setShowAddClientModal(false)}
          onAdd={handleAddClient}
        />
      )}
    </div>
  );
};

export default ClientList;
