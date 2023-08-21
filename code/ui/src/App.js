// Michael Chen and Christian Kesting
// CS340 Project

// React front end code citations
// Axios API elements adapted from:

// PedroTech (Nov 2020), Beginners CRUD Tutorial - ReactJS, MySQL, NodeJS 
// https://www.youtube.com/watch?v=re3OIOr9dJI

// Dave Gray (Aug 2021), React Axios API Requests | Axios with React JS Tutorial 
// https://www.youtube.com/watch?v=ZEKBDXGnD4s

// Accessed May 2023

import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomePage from './pages/HomePage';
import Navigation from './components/Navigation';

import ResortsPage from './pages/ResortsPage';
import EditResortsPage from './pages/EditResortsPage';

import RunsPage from './pages/RunsPage';

import CustomersPage from './pages/CustomersPage';
import EditCustomersPage from './pages/EditCustomersPage';

import TransactionsPage from './pages/TransactionsPage';
import AddTransactionPage from './pages/AddTransactionPage';

import PassesPage from './pages/PassesPage';
import AddPassesPage from './pages/AddPassesPage';
import EditPassesPage from './pages/EditPassesPage';

// `api` is the axios client to the express server.
import api from './api/api';

function App() {

  // variables for passing data around the various pages.
  const [online, setOnline] = useState([]);

  const [customer, setCustomer] = useState('');
  const [transaction, setTransaction] = useState('');
  
  const [resort, setResort] = useState('');

  const [pass, setPass] = useState('');

  // server status check.
  const serverStatus = async () =>{
      try {
          const response = await api.get('/status');
          if (response.data.online){
              setOnline(`Database server is online.`)
          }
      } catch (err) {
          if (err.response) {
              console.log(err.response.status);
              console.log(err.response.data);
          } else {
              console.log(err.message);
          }
          setOnline("Database server is offline.")
      }
  };
          
  useEffect(() => {
    serverStatus();
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}

      <Router>
      <Navigation />
        <div className="App-header">
		      <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/resorts" element={<ResortsPage setResort={setResort}/>}/>
            <Route path="/edit_resort" element={<EditResortsPage resort={resort} />}/>
            <Route path="/runs" element={<RunsPage />}/>
            <Route path="/customers" element={<CustomersPage setCustomer={setCustomer}/>}/>
            <Route path="/edit_customer" element={<EditCustomersPage customer={customer} setCustomer={setCustomer}/>}/>
            <Route path="/transactions" element={<TransactionsPage customer={customer} setCustomer={setCustomer} transaction={transaction} setTransaction={setTransaction}/>}/>
            <Route path="/add_transaction" element={<AddTransactionPage customer={customer} setCustomer={setCustomer} />}/>
            <Route path="/passes" element={<PassesPage pass={pass} setPass={setPass} transaction={transaction} setTransaction={setTransaction} />}/>
            <Route path="/edit_pass" element={<EditPassesPage pass={pass} />} />
            <Route path="/add_passes" element={<AddPassesPage transaction={transaction} setTransaction={setTransaction} />}/>
		      </Routes>
        </div>
      </Router>


      <footer>
        <p>{online}<br />
        Spring 2023 OSU CS340 project.</p>
        <p>Christian Kesting and Michael Chen (c) 2023</p>
        </footer>
    </div>
  );
}

export default App;
