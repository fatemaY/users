import React, { useState, useEffect } from 'react';
import UpdateUser from './UpdateUser';
import './user.css';

function User() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/haiku/');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3000/haiku/delete/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = (updatedUser) => {
    setEditingUser(null); // Close the update form
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="user-cards-container">
      {editingUser && (
        <UpdateUser
          user={editingUser}
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
        />
      )}
      {users.map(user => (
        <div className="user-card" key={user._id}>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
          <p>Email: {user.mail}</p>
          <p>Average: {user.avg}</p>
          <div className="user-card-buttons">
            <button onClick={() => handleEditClick(user)}>Update</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default User;
