import React, { useState } from 'react';
import axios from 'axios';

const NewRecordForm = ({ onRecordAdded }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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
      const response = await axios.post('http://127.0.0.1:8000/api/new_table', {
        name,
        mobile,
      });
      console.log('Record inserted:', response.data);
      setMessage('Record inserted successfully!');
      // Call the onRecordAdded callback
      onRecordAdded(response.data);
      // Clear form fields
      setName('');
      setMobile('');
    } catch (error) {
      console.error('There was an error inserting the record!', error);
      setMessage('There was an error inserting the record!');
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
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default NewRecordForm;
