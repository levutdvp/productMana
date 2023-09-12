import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';

const ProductDetail = ({ product }) => {
  const addToCart  = useContext(CartContext);
    console.log(useContext(CartContext));
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div>
      <h2>Product Detail</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ProductDetail;
