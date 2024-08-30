import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.css';

const FormComponent = ({ fetchData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Data saved successfully');
        fetchData();
      } else {
        setMessage('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error saving data');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

FormComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

export default FormComponent;
