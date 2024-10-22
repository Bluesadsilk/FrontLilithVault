import { useState, useEffect } from "react";
import Provider from "./Provider.jsx";
import AddProvider from "./AddProviderModal";

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProvider, setShowAddProvider] = useState(false);

  const loadProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/providers");
      if (!response.ok) {
        throw new Error("Error al cargar los proveedores");
      }
      const data = await response.json();
      setProviders(data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar los proveedores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProviders();
  }, []);

  const filteredProviders = providers.filter(
    (provider) =>
      (provider.providerName && provider.providerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (provider.providerId && provider.providerId.toString().includes(searchTerm))
  );

  const displayedProviders = filteredProviders.slice(0, 10);

  return (
    <div className="provider-container">
      <h1 className="text-2xl font-bold mb-4">Listado de Proveedores</h1>
      <div className="flex flex-row space-x-6 mb-4">
        <input
          type="text"
          placeholder="Buscar por ID o Nombre"
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1 mb-4"
        />
        <button
          onClick={loadProviders} // Función para recargar proveedores
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          <img src="/icons/reload.svg" alt="Recargar" />
        </button>
        <button
          onClick={() => setShowAddProvider(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Añadir Proveedor
        </button>
      </div>

      {loading ? (
        <p>Cargando proveedores...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {displayedProviders.map((provider) => (
            <div key={provider.providerId} className="p-2 m-2 w-72">
              <Provider providerId={provider.providerId} />
            </div>
          ))}
        </div>
      )}

      {showAddProvider && <AddProvider onClose={() => setShowAddProvider(false)} onAdd={loadProviders} />}
    </div>
  );
};

export default ProviderList;
