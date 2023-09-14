import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
const Cart = () => {
  const { product, removeFromCart, clearCart } = useContext(CartContext);
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {product.map((item) => (
          <li key={item.id} style={{listStyle:'none'}}>
            {item.name} - price {item.price} - Amount {item.amount}
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
