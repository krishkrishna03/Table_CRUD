import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DataTable.css';

const DataTable = ({ data, fetchData }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', description: '' });

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(data[index]);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormData({ name: '', email: '', phoneNumber: '', description: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (index) => {
    fetch(`http://localhost:5000/edit/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          setEditIndex(null);
          setFormData({ name: '', email: '', phoneNumber: '', description: '' });
          fetchData();
        } else {
          console.error('Failed to save data');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = (index) => {
    fetch(`http://localhost:5000/delete/${index}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchData();
        } else {
          console.error('Failed to delete data');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.description}</td>
              <td className="action-buttons">
  {editIndex === index ? (
    <>
      <button onClick={() => handleSave(index)}>Save</button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </>
  ) : (
    <>
      <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
      <button onClick={() => handleDelete(index)}>Delete</button>
    </>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
      {editIndex !== null && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelEdit}>&times;</span>
            <form>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label>
                Phone Number:
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </label>
              <label>
                Description:
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
              </label>
              <div>
                <button onClick={() => handleSave(editIndex)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default DataTable;
