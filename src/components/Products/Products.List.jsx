import { useState, useEffect } from "react";
import Product from "./Product.jsx";
import AddProductModal from "./AddProductModal";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import AddSubcategoryModal from "./AddSubcategoryModal";
import EditSubcategoryModal from "./EditSubcategoryModal";
import DeleteSubcategoryModal from "./DeleteSubCategoryModal.jsx";
import EditProductModal from "./EditProductModal.jsx";
import DeleteProductModal from "./DeleteProductModal.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [showEditSubcategoryModal, setShowEditSubcategoryModal] = useState(false);
  const [showDeleteSubcategoryModal, setShowDeleteSubcategoryModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Añadido para manejar productos seleccionados

  // Funciones para cargar productos, categorías y subcategorías
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/products");
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/categories");
      if (!response.ok) {
        throw new Error("Error al cargar las categorías");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  const loadSubcategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/subcategories");
      if (!response.ok) {
        throw new Error("Error al cargar las subcategorías");
      }
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar las subcategorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadSubcategories();
  }, []);

  // Filtrar productos por ID o nombre
  const filteredProducts = products.filter(
    (product) =>
      product && // Asegura que 'product' no sea undefined
      (
        (product.productId && product.productId.toString().includes(searchTerm)) ||
        (product.productName && product.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.category?.categoryId && product.category.categoryId.toString().includes(searchTerm))
      )
  );

  // Filtrar subcategorías por categoría seleccionada
  const filteredSubcategories = selectedCategory
    ? subcategories.filter((subcat) => subcat.category?.categoryId === selectedCategory.categoryId)
    : [];

  // Filtrar productos por subcategoría seleccionada
  const filteredBySubcategory = selectedSubcategory
    ? filteredProducts.filter((product) => product.subcategory?.subcategoryId === selectedSubcategory.subcategoryId)
    : filteredProducts;

  // Limitar a los primeros diez productos
  const displayedProducts = filteredBySubcategory.slice(0, 10);

  // Manejo de añadir/editar/eliminar subcategorías
  const handleAddSubcategory = (newSubcategory) => {
    setSubcategories((prevSubcategories) => [...prevSubcategories, newSubcategory]);
    loadSubcategories();
  };

  const handleEditSubcategory = (updatedSubcategory) => {
    setSubcategories((prevSubcategories) =>
      prevSubcategories.map((subcategory) =>
        subcategory.subcategoryId === updatedSubcategory.subcategoryId ? updatedSubcategory : subcategory
      )
    );
    loadSubcategories();
    setShowEditSubcategoryModal(false);
  };

  const handleDeleteSubcategory = (subcategoryId) => {
    setSubcategories((prevSubcategories) =>
      prevSubcategories.filter((subcategory) => subcategory.subcategoryId !== subcategoryId)
    );
    loadSubcategories();
    setShowDeleteSubcategoryModal(false);
  };

  // Manejo de añadir productos
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    loadProducts();
  };

  return (
    <div className="product-container">
      <h1 className="text-2xl font-bold mb-4">Listado de Productos</h1>
      <div className="flex flex-row space-x-6 mb-4">
        <input
          type="text"
          placeholder="Buscar por ID o nombre"
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          type="button"
          onClick={loadProducts}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          <img src="/icons/reload.svg" alt="Reload" />
        </button>
        <button
          type="button"
          onClick={() => setShowAddProductModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Añadir Producto
        </button>
        <button
          type="button"
          onClick={() => setShowAddCategoryModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Añadir Categoría
        </button>
        <button
          type="button"
          onClick={() => setShowEditCategoryModal(true)}
          disabled={!selectedCategory}
          className={`bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200 ${!selectedCategory && "opacity-50 cursor-not-allowed"}`}
        >
          Editar Categoría
        </button>
        <button
          type="button"
          onClick={() => setShowDeleteCategoryModal(true)}
          disabled={!selectedCategory}
          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ${!selectedCategory && "opacity-50 cursor-not-allowed"}`}
        >
          Eliminar Categoría
        </button>
      </div>

      {/* Filtrar por categoría */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Filtrar por Categoría</h2>
        <select
          onChange={(e) => {
            const categoryId = Number(e.target.value);
            const category = categories.find((cat) => cat.categoryId === categoryId);
            setSelectedCategory(category || null);
            setSelectedSubcategory(null); // Resetear la subcategoría al cambiar de categoría
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Filtrar por subcategoría */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Filtrar por Subcategoría</h2>
        <select
          onChange={(e) => {
            const subcategoryId = Number(e.target.value);
            const subcategory = subcategories.find((subcat) => subcat.subcategoryId === subcategoryId);
            setSelectedSubcategory(subcategory || null);
          }}
          className="border rounded px-2 py-1"
          disabled={!selectedCategory}
        >
          <option value="">Todas las subcategorías</option>
          {filteredSubcategories.map((subcategory) => (
            <option key={subcategory.subcategoryId} value={subcategory.subcategoryId}>
              {subcategory.subcategoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : displayedProducts.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          displayedProducts.map((product) => (
            <Product
              key={product.productId}
              product={product}
              onEdit={() => {
                setSelectedProduct(product);
                setShowEditProductModal(true);
              }}
              onDelete={() => {
                setSelectedProduct(product);
                setShowDeleteProductModal(true);
              }}
            />
          ))
        )}
      </div>

      {/* Modales */}
      {showAddProductModal && (
        <AddProductModal
          onClose={() => setShowAddProductModal(false)}
          onSave={handleAddProduct}
        />
      )}

      {showEditProductModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowEditProductModal(false)}
          onSave={() => {
            loadProducts();
            setSelectedProduct(null);
          }}
        />
      )}

      {showDeleteProductModal && selectedProduct && (
        <DeleteProductModal
          productId={selectedProduct.productId}
          onClose={() => setShowDeleteProductModal(false)}
          onDelete={() => {
            loadProducts();
            setSelectedProduct(null);
          }}
        />
      )}

      {showAddCategoryModal && (
        <AddCategoryModal onClose={() => setShowAddCategoryModal(false)} onSave={loadCategories} />
      )}
      {showEditCategoryModal && selectedCategory && (
        <EditCategoryModal category={selectedCategory} onClose={() => setShowEditCategoryModal(false)} onSave={loadCategories} />
      )}
      {showDeleteCategoryModal && selectedCategory && (
        <DeleteCategoryModal categoryId={selectedCategory.categoryId} onClose={() => setShowDeleteCategoryModal(false)} onDelete={loadCategories} />
      )}
      {showAddSubcategoryModal && selectedCategory && (
        <AddSubcategoryModal categoryId={selectedCategory.categoryId} onClose={() => setShowAddSubcategoryModal(false)} onSave={handleAddSubcategory} />
      )}
      {showEditSubcategoryModal && selectedSubcategory && (
        <EditSubcategoryModal subcategory={selectedSubcategory} onClose={() => setShowEditSubcategoryModal(false)} onSave={handleEditSubcategory} />
      )}
      {showDeleteSubcategoryModal && selectedSubcategory && (
        <DeleteSubcategoryModal subcategoryId={selectedSubcategory.subcategoryId} onClose={() => setShowDeleteSubcategoryModal(false)} onDelete={handleDeleteSubcategory} />
      )}
    </div>
  );
};

export default ProductList;
