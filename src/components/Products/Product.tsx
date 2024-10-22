import {React, useState, useEffect } from "react";
import ProductModal from "./ProductModal"
function Product({ productId, url : URL}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClicked, setisClicked] = useState(false)
  const apiUrl = `${url}/products/${productId}`;
  const handleModalClick = () =>{
    setisClicked(true)
  }

  const handleModalClose = () =>{
    setisClicked(false)
  }
  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, url, apiUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Asegúrate de que los nombres de las propiedades coincidan con los de la API

  const imgLink= data.productImageLink
  const productName= data.productName

  return (<>
    <div className="productContainer" onClick={handleModalClick}>
      <h3 className="productName">{productName}</h3>
      <div className="productImgContainer"><img className="productImg" src={imgLink} alt="productImage" /></div>
    </div>

    {isClicked && <ProductModal closeModal={handleModalClose} productData={data}
    />} 
    </>
  );
}

export default Product;