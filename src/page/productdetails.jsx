import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import { useSelector } from 'react-redux/es/hooks/useSelector';
const ProductDetail = ({ product }) => {
  const addToCart = useSelector(store => store.cartShopping)
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div>
      <h2>Product Detail</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ProductDetail;
