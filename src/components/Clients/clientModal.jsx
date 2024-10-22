import React from 'react';

const ShowClientModal = ({ client, isOpen, onClose }) => {
  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4">Detalls del client</h2>
        <div className="space-y-2">
          <div><strong>ID:</strong> {client.clientId}</div>
          <div><strong>NIF:</strong> {client.clientNif}</div>
          <div><strong>Nombre:</strong> {client.clientName}</div>
          <div><strong>Apellido:</strong> {client.clientLastName}</div>
          <div><strong>Email:</strong> {client.clientEmail}</div>
          <div><strong>Dirección Linea 1:</strong> {client.clientDirLine1}</div>
          <div><strong>Dirección Linea 2:</strong> {client.clientDirLine2 || 'N/A'}</div>
          <div><strong>Telèfon:</strong> {client.clientPhoneNumber || 'N/A'}</div>

          {/* Mostrant les comandes */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Pedidos:</h3>
            {client.orders.length > 0 ? (
              client.orders.map((order) => (
                <div key={order.orderId} className="bg-gray-100 p-4 rounded mb-2">
                  <div><strong>ID Pedido:</strong> {order.orderId}</div>
                  <div><strong>Estado:</strong> {order.orderStatus}</div>
                  <div><strong>Tipo:</strong> {order.orderType}</div>
                  <div><strong>Fecha:</strong> {new Date(order.orderDate).toLocaleDateString()}</div>
                  <div><strong>Dirección Linea 1:</strong> {order.orderDirLine1}</div>
                  <div><strong>Dirección Linea 2:</strong> {order.orderDirLine2 || 'N/A'}</div>

                  {/* Mostrant les línies de comanda */}
                  <div className="mt-2">
                    <strong>Lineas de Pedido:</strong>
                    {order.orderLines.length > 0 ? (
                      order.orderLines.map((line) => (
                        <div key={line.orderLineId} className="ml-4">
                          <div><strong>Cantidad:</strong> {line.orderLineAmount}</div>
                          <div><strong>Producto:</strong> {line.product.productName}</div>
                          <div><strong>Descripcion:</strong> {line.product.productDescription}</div>
                          <img src={line.product.productImageLink} alt={line.product.productName} className="w-20 h-20 object-cover mt-2" />
                        </div>
                      ))
                    ) : (
                      <div>No hay lineas de pedido.</div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>No hay pedidos.</div>
            )}
          </div>

          {/* Mostrant les factures */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Facturas:</h3>
            {client.bills.length > 0 ? (
              client.bills.map((bill) => (
                <div key={bill.billId} className="bg-gray-100 p-4 rounded mb-2">
                  <div><strong>ID Factura:</strong> {bill.billId}</div>
                  <div><strong>Tipo:</strong> {bill.billEntityType}</div>
                  <div><strong>Importe:</strong> {bill.billAmount}</div>
                  <div><strong>Fecha:</strong> {new Date(bill.billDate).toLocaleDateString()}</div>
                  <div><strong>PDF:</strong> <img src={bill.billImageLink} alt={`Factura ${bill.billId}`} className="w-20 h-20 object-cover mt-2" /></div>

                  {/* Mostrant el proveïdor de la factura */}
                  {bill.provider && (
                    <div className="mt-2">
                      <strong>Proveedor:</strong> {bill.provider.providerName} ({bill.provider.providerCif})
                      <div><strong>Email:</strong> {bill.provider.providerEmail}</div>
                      <div><strong>Telefono:</strong> {bill.provider.providerPhoneNumber}</div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>No existen facturas de este cliente.</div>
            )}
          </div>
        </div>

        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Tancar</button>
      </div>
    </div>
  );
};

export default ShowClientModal;
