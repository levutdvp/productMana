import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { CartContext } from '../App';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart,clearCart } from '../slices/cartShopping';
const Cart = (product) => {
  // const { product, removeFromCart, clearCart } = useSelector(state => state.cartShopping);
  const dispatch = useDispatch();
    const handelRemoveFromCart = () =>{
      dispatch(removeFromCart(product.id))
    }
    const handleClearCart =() =>{
      dispatch(clearCart())
    }
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {product.map((item) => (
          <li key={item.id} style={{listStyle:'none'}}>
            {item.name} - price {item.price} - Amount {item.amount}
            <button onClick={() => handelRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      
      <button onClick={handleClearCart}>Clear Cart</button>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
