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
import { createContext, useState } from 'react';


// export const UserContext = createContext(null)
export const CartContext = createContext(null)



function App() {
  const [user,setUser] = useState()
  const [product, setProduct] = useState([])
  const addToCart = (products) => {
    setProduct([...product, products]);
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
   {/* <UserContext.Provider  value={{user,setUser}}> */}
    <RouterProvider router={router} />
   {/* </UserContext.Provider>  */}
   </CartContext.Provider>) 
   
}

export default App;
