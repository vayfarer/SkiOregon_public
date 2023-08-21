import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import api from '../api/api';
import TransactionsList from './components/TransactionsList';

export const TransactionsPage = ({customer, setCustomer, setTransaction}) => {

    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [transactionsFields, setTransactionsFields] = useState([]);

    const [viewing, setViewing] = useState('All Customers');

    const loadTransactions = async (customer) =>{
        // READ Transactions table, depending on customer id.
        if (customer === '') {
            try {
                const response = await api.get('/transactions');
                // console.log(response.data.fields);
                setTransactions(response.data.rows);
                setTransactionsFields(response.data.fields);
                setViewing('All Customers')
            } catch (err) {
                if (err.response) {
                    console.log(err.response.status);
                    console.log(err.response.data);
                } else {
                    console.log(err.message);
                }
            }
        } else {
            try {
                if (customer.id === null){
                    customer.id = 'null';
                }
                const response = await api.post(`/transactions/${customer.id}`);
                console.log(response.data.fields);
                setTransactions(response.data.rows);
                setTransactionsFields(response.data.fields);
                setViewing(customer.first_name + ' ' + customer.last_name);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.status);
                    console.log(err.response.data);
                } else {
                    console.log(err.message);
                }
            }
            setCustomer('');
        }
    };

    const onDelete = async (id) => {
        try {
            const responseDelete = await api.delete(`/transactions/${id}`);
            if (responseDelete.status === 204) {
                loadTransactions('');
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

    const onAddPasses = async (transaction) => {
        setTransaction(transaction);
        navigate('/add_passes');
    };

    const onViewPasses = async (transaction) => {
        setTransaction(transaction);
        navigate('/passes');
    };

    const setNull = async(transaction) => {
        // Sends a PUT request to set a Customers_id FK to null for a particular transaction.
        try {
            const response = await api.put(`/transactions/${transaction.id}`, {
                id: transaction.id,
                Customers_id: null,
                date: transaction.date,
            })

        } catch (err) {
            if (err.response) {
                alert(`Error Status ${err.response.status}: ${err.response.data}`);
                console.log(err.response.status);
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
        }
        loadTransactions('');
    }

    const onEdit = async() =>{};

    useEffect(() => {
        loadTransactions(customer);
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            <p>M:1 relationship with Customers. Relationship with Customers is NULLABLE. Deleting a customer will CASCADE SET NULL the Customers FK in related transactions.<br/>
            M:M relationship to Resorts on Passes intersection table. Deleting a transaction will CASCADE DELETE all related passes. 
            </p>
            <p>Viewing transactions for {viewing}. <Link onClick={()=>loadTransactions(customer)}>Reload all transactions</Link>. </p>
            <p>To create transactions for a customer, go to <Link to='/customers'>Customers</Link>.<br/>
            NULL customer operations: <Link to='/add_transaction'>create transaction</Link>, <Link onClick={()=>loadTransactions({id:null, first_name:'NULL', last_name:''})}>view</Link>. </p>
            <TransactionsList transactions={transactions} fields={transactionsFields}
            onAddPasses={onAddPasses} onViewPasses={onViewPasses}
            onDelete={onDelete} setNull={setNull}></TransactionsList>
        </div>
    );
}


export default TransactionsPage;