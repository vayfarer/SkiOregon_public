import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';

export const AddTransactionPage = ({customer, setCustomer}) => {

    const navigate = useNavigate();

    if (customer === ''){
        customer = {
            id:null,
            first_name:'NULL',
            last_name:''
        };
    } 

    const [id, setID] = useState(customer.id);
    const [first_name, setFirstName] = useState(customer.first_name);
    const [last_name, setLastName] = useState(customer.last_name);
    const today = new Date().toISOString().substring(0,10);
    const [date, setDate] = useState(today);
    const [temp_customer, setTempCustomer] = useState(customer);

    setCustomer('');

    const addTransaction = async () => {
        try {
            const response = await api.post(`/Transactions`, {
                Customers_id: id,
                date: date,
            })
            setCustomer(temp_customer);
            navigate('/transactions');
            console.log('Should go to transactions...');

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

    return (
        <div>
            <h1>Add Transaction</h1>
            <table className='crud'>
                <tr>
                    <td>Customer: </td>
                    <td>{first_name} {last_name}</td>
                </tr>
                <tr>
                    <td>date: </td>
                    <td>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)} />
                    </td>
                </tr>
            </table>
            <button
                onClick={addTransaction}
            >Save</button>
        </div>
    );
}

export default AddTransactionPage;