import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';

export const EditCustomersPage = ({customer, setCustomer}) => {

    const navigate = useNavigate();

    const [id, setID] = useState(customer.id);
    const [fname, setFName] = useState(customer.first_name);
    const [lname, setLName] = useState(customer.last_name);
    const [age, setAge] = useState(customer.age);
    const [phone, setPhone] = useState(customer.phone);
    const [email, setEmail] = useState(customer.email);

    setCustomer('');

    const editCustomer = async () => {
        try {
            const response = await api.put(`/customers/${id}`, {
                fname: fname,
                lname: lname,
                age: age,
                phone: phone,
                email: email
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

        navigate('/customers');
    };

    return (
        <div>
            <h1>Edit Customer</h1>
            <table className='crud'>
                <tr>
                    <td>id: </td>
                    <td>{id}</td>
                </tr>
                <tr>
                    <td>first_name: </td>
                    <td>
                    <input
                        type="text"
                        value={fname}
                        onChange={e => setFName(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>last_name: </td>
                    <td>
                        <input
                            type="text"
                            value={lname}
                            onChange={e => setLName(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>age: </td>
                    <td>
                        <input
                            type="number"
                            value={age}
                            onChange={e => setAge(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>phone: </td>
                    <td>
                        <input 
                            type="text" 
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>email: </td>
                    <td>
                        <input
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </td>
                </tr>
            </table>
            <button
                onClick={editCustomer}
            >Save</button>
        </div>
    );
}

export default EditCustomersPage;