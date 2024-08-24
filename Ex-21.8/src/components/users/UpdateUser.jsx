import React, { useState, useEffect } from 'react';

function UpdateUser({ user, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await fetch('http://localhost:3000/haiku/update/'+user._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response)

      if (response.ok) {;
        const result = await response.json();
        onUpdate(result); 
      } else {
        const errorText = await response.text(); 
        throw new Error(`Failed to update user: ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please check the console for details.');
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.mail || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Average:
          <input
            type="number"
            name="average"
            value={formData.avg || ''}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateUser;
