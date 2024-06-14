import React, { useState } from 'react';
import NewRecordForm from './components/NewRecordForm';
import UpdateRecordForm from './components/UpdateRecordForm';

function App() {
  const [latestRecord, setLatestRecord] = useState(null);

  const handleRecordAdded = (newRecord) => {
    console.log('New record added:', newRecord);
    setLatestRecord(newRecord);
  };

  return (
    <div className="App">
      <h1>Insert New Record</h1>
      <NewRecordForm onRecordAdded={handleRecordAdded} />

      <h1>Update Latest Record</h1>
      {latestRecord ? <UpdateRecordForm record={latestRecord} /> : <p>No record to update</p>}
    </div>
  );
}

export default App;
