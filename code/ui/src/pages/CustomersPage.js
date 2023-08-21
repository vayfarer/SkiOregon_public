import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomersList from './components/CustomersList';

import api from '../api/api';

export const CustomersPage = ( {setCustomer} ) => {

    const navigate = useNavigate();

    // load all customers:

    const [customers, setCustomers] = useState([]);
    const [customersFields, setCustomersFields] = useState([]);

    const loadCustomers = async () =>{
        // READ Customers table.
        try {
            const response = await api.get('/customers');
            console.log(response.data.fields);
            setCustomers(response.data.rows);
            setCustomersFields(response.data.fields);
        } catch (err) {
            if (err.response) {
                alert(`Error Status ${err.response.status}: ${err.response.data}`);
                console.log(err.response.status);
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
        }
    };

    // add customer

    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const addCustomer = async () => {        
        try {
            const response = await api.post('/customers', {
                fname: fname,
                lname: lname,
                age: age,
                phone: phone,
                email: email
            })
            if (response.status != 400){
                loadCustomers();
                // setCustomers(response.data.rows);
            } else {
                alert("Add customer failed.");
            }

        } catch (err) {
            if (err.response) {
                alert(`Error Status ${err.response.status}: ${err.response.data}`);
                console.log(err.response.status);
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
        }
    };

    const onDelete = async (id) => {
        try {
            const responseDelete = await api.delete(`/customers/${id}`);
            if (responseDelete.status === 204) {
                loadCustomers();
            }
        } catch(err) {
            if (err.response) {
                alert(`Error Status ${err.response.status}: ${err.response.data}`);
                console.log(err.response.status);
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
        }
    };

    const onEdit = async (customer) => {
        setCustomer(customer);
        navigate('/edit_customer');
    };

    const onAddTransaction = async (customer) => {
        setCustomer(customer);
        navigate('/add_transaction');
    };

    const onViewTransactions = async (customer) => {
        setCustomer(customer);
        navigate('/transactions');
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <>
        <div>
            <h1>Customers</h1>
            <p>1:M relationship with Transactions. Deleting a customer will CASCADE SET NULL the Customers FK in related transactions.</p>
            <CustomersList customers={customers} fields={customersFields} onDelete={onDelete} onEdit={onEdit}
            onAddTransaction={onAddTransaction} onViewTransactions={onViewTransactions}></CustomersList>
        </div>

        <div>
            <h2>Add Customer</h2>
            <input
                type="text"
                placeholder="First name"
                value={fname}
                onChange={e => setFName(e.target.value)} />
            <input
                type="text"
                value={lname}
                placeholder="Last name"
                onChange={e => setLName(e.target.value)} />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={e => setAge(e.target.value)} />
            <input 
                type="text" 
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)} />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            <button
                onClick={addCustomer}
            >Add</button>
        </div>

        </>
    );
}

export default CustomersPage;