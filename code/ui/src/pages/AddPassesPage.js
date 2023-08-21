import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';

export const AddPassesPage = ({transaction, setTransaction}) => {

    const navigate = useNavigate();

    const [id, setID] = useState(transaction.id);
    const [temp_transaction, setTempTransaction] = useState(transaction);
    setTransaction('');
    const [quantity, setQuantity] = useState('');
    const [available, setAvailable] = useState('');

    const [resorts, setResorts] = useState([]);
    const [resortID, setResortID] = useState('');


    const addPasses = async () => {
        try {
            const response = await api.post(`/Passes`, {
                Transactions_id: id,
                Resorts_id: resortID,
                quantity: quantity,
                available: available
            })
            setTransaction(temp_transaction);
            navigate('/passes');
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

    const loadResorts = async () =>{
        try {
            const response = await api.get('/resorts');
            // console.log(response.data.fields);
            setResorts(response.data.rows);
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
        }
    };

    useEffect(() => {
        loadResorts();
    }, []);

    return (
        <div>
            <h1>Add Passes</h1>
            <table className='crud'>
                <tr>
                    <td>Transaction id: </td>
                    <td>{id}</td>
                </tr>
                <tr>
                    <td>Resort: </td>
                    <td>
                        <select onChange={e => setResortID(e.target.value)}>
                        <option value=''>Choose Resort</option>
                            {resorts.map((resorts, i) => (
                        <option key={i} value={resorts.id}>{resorts.name}</option>
                        ))}
                                               
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>quantity: </td>
                    <td>
                        <input
                            type="number"
                            placeholder='quantity'
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>available: </td>
                    <td>
                        <input
                            type="number"
                            placeholder='available'
                            value={available}
                            onChange={e => setAvailable(e.target.value)} />
                    </td>
                </tr>
            </table>
            <button
                onClick={addPasses}
            >Save</button>
        </div>
    );
}

export default AddPassesPage;