import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../axios-instance';
const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    api.get(`/user/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error!', error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Detail</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Price: {user.price}</p>
      <p>Quantity: {user.quantity}</p>
      <p>Category: {user.category}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetail;