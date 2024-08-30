// App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataTable from './DataTable.js';
import FormComponent from './FormComponent.js';
import Navbar from './Navbar.js';

function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="Main">
          <Routes>
            <Route path="/form" element={<FormComponent fetchData={fetchData} />} />
            <Route path="/data" element={<DataTable data={data} fetchData={fetchData} />} />
            <Route path="/" element={<FormComponent fetchData={fetchData} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
