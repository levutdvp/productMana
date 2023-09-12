import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import React, { useState, useEffect,useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../axios-instance';
import { UserContext } from "../App";
import { CartContext } from "../App";
const Home = () =>{
    const { control, handleSubmit, reset, setValue } = useForm();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchItem, setSearchItem] = useState('')
  const [tasks, setTasks] = useState([])
  const apiUrl = new URL('https://64f71de99d77540849531e37.mockapi.io/user')
  const defaultPage = 1;
  const defaultLimit = 10;
   const [page, setPage] = useState(defaultPage);
  const [limit, setLimit] = useState(defaultLimit);
 useEffect(() => {
    const fetchData = async () => {
      const url = new URL(apiUrl);
      url.searchParams.append('email', searchItem);
      url.searchParams.append('page', page);
      url.searchParams.append('limit', limit);
      try {
        const response = await axios.get(url.toString(), {
          headers: { 'content-type': 'application/json' },
        });

        if (response.status === 200) {
          setTasks(response.data);
        }
      } catch (error) {
       alert('Error!', error);
      }
    };

    fetchData();
  }, [searchItem,page,limit]);



  useEffect(() => {
    api.get('/user')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        alert('Error!', error);
      });
  }, []);

  const onSubmit = (data) => {
    if (editingUserId) {
      api.put(`/user/${editingUserId}`, data)
        .then(response => {
         
          setUsers(users.map(user => (user.id === editingUserId ? response.data : user)));
          reset();
          setEditingUserId(null);
        })
        .catch(error => {
          alert('Error!', error);
        });
    } else {
     
      api.post('/user', data)
        .then(response => {
          setUsers([...users, response.data]);
          reset();
        })
        .catch(error => {
          alert('Error!', error);
        });
    }
  };

  const editUser = (user) => {
    setValue('id', user.id);
    setValue('name', user.name);
    setValue('price', user.price);
    setValue('quantity', user.quantity);
    setValue('category', user.category);
    setValue('email', user.email);
    setEditingUserId(user.id);
  };

  const deleteUser = (userId) => {   
    api.delete(`/user/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        alert('Error!', error);
      });
  };
 const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };
  const userContext = useContext(UserContext)
  const navigate = useNavigate();


  const  {addToCart}  = useContext(CartContext);
  const navigates = useNavigate();

  const handleOrder = (product) => {
    addToCart(product);
    navigates('/cart'); 
  };

  useEffect(() => {
    if (!userContext.user) {
      navigate('/login')
    }
  }, [userContext?.user])
  return (
    <div className="App">
      <h1>User Management</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="id" ref={control} />
        <div>
          <label>Name:</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
        </div>
        <div>
          <label>Price:</label>
          <Controller
            name="price"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <Controller
            name="quantity"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
        </div>
        <div>
          <label>Category:</label>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
        </div>
        <div>
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
        </div>
        <div>
          <button type="submit">{editingUserId ? 'Update' : 'Create'}</button>
        </div>
      </form>
      <div>
        <label>Search:</label>
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
       <div>
        <label>Page:</label>
        <input
          type="number"
          value={page}
          onChange={(e) => handlePageChange(e.target.value)}
        />
      </div>
      <div>
        <label>Limit:</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => handleLimitChange(e.target.value)}
        />
      </div>
      <ul>
        {tasks.map(task => ( 
          <li style={{listStyleType:'none'}}> 
            {task.name} - price {task.price} - quantity {task.quantity} - {task.category} - {task.email} 
             <button onClick={() => editUser(task)}>Edit</button>
            <button onClick={() => deleteUser(task.id)}>Delete</button>
            <Link to={`/user/${task.id}`}>Details</Link>
            <button onClick={handleOrder(task)}>Order</button>
          </li>
        ))}
      </ul>

    </div>
  );
}
export default Home
