import UserDetail from './page/userdetail';
import ProductDetails from './page/productdetails';
import Cart from '../src/page/cart';
import Home from './page/home';
import { createContext, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './page/login';


export const UserContext = createContext(undefined)
export const CartContext = createContext(undefined)

function App() {
  const [user,setUser] = useState()
  const [product, setProduct] = useState([])
  const addToCart = (newProduct) => {
    const exitProduct = product.find((item) => item.id === newProduct.id)
    if(exitProduct){
      setProduct((prevCart) =>
        prevCart.map((item) =>
          item.id === newProduct.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ))
    } else {
      setProduct([...product, { ...newProduct, amount: 1 }]);
    }
    
  };

  const removeFromCart = (productId) => { 
    setProduct(product.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setProduct([]);
  };
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user/:userId",
    element: <UserDetail />
  },
  {
    path: "/login",
    element: <Login /> 
  },
  {
    path:"/cart",
    element:<Cart />
  }
]);
   return (<CartContext.Provider value={{product,setProduct,addToCart, removeFromCart, clearCart}}> 
   <UserContext.Provider  value={{user,setUser}}>
    <RouterProvider router={router} />
   </UserContext.Provider> 
   </CartContext.Provider>) 
   
}

export default App;
