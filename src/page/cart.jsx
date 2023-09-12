import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - price {item.price} - quantity {item.quantity} 
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
