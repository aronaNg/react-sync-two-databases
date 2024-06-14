import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateRecordForm = ({ record }) => {
  const [name, setName] = useState(record.name);
  const [mobile, setMobile] = useState(record.mobile);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setName(record.name);
    setMobile(record.mobile);
  }, [record]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile) {
      setMessage('Please fill in all fields.');
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      setMessage('Please enter a valid mobile number.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/new_table/${record.id}`, {
        name,
        mobile,
      });
      console.log('Record updated:', response.data);
      setMessage('Record updated successfully!');
    } catch (error) {
      console.error('There was an error updating the record!', error);
      setMessage('There was an error updating the record!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Mobile:</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateRecordForm;
