import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import api from '../api/api';
import PassesList from './components/PassesList';

export const PassesPage = ({setPass, transaction, setTransaction}) => {

    const navigate = useNavigate();

    const [passes, setPasses] = useState([]);
    const [passesFields, setPassesFields] = useState([]);
    const [viewing, setViewing] = useState('all transactions');

    const loadPasses = async (transaction) =>{
        // READ passes table depending on transaction id.
        if (transaction === '') {
            try {
                const response = await api.get('/passes');
                // console.log(response.data.fields);
                setPasses(response.data.rows);
                setPassesFields(response.data.fields);
                setViewing('all transactions');
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
                const response = await api.post(`/passes/${transaction.id}`);
                console.log(response.data.fields);
                setPasses(response.data.rows);
                setPassesFields(response.data.fields);
                setViewing(`transaction id ${transaction.id}`);

            } catch (err) {
                if (err.response) {
                    console.log(err.response.status);
                    console.log(err.response.data);
                } else {
                    console.log(err.message);
                }
            }
            setTransaction('');
        };
    };

    const onDelete = async (id) => {
        try {
            const responseDelete = await api.delete(`/passes/${id}`);
            if (responseDelete.status === 204) {
                loadPasses('');
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

    const onUseOne = async (id) => {
        // Use one pass.
        try {
            const response = await api.put(`/passes/${id}`, { use_one:true
            });
            loadPasses(transaction);
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

    const changeResort = async (pass) => {
        // Change resort of pass.
        setPass(pass);
        navigate('/edit_pass');
    };

    useEffect(() => {
        // console.log(`Transactions_id: ${transaction.id}`);
        loadPasses(transaction);
    }, []);

    return (
        <div>
            <h1>Passes</h1>
            <p>Intersection table between Transactions and Resorts. Deleting a transaction will CASCADE DELETE related passes. Deleting a resort will CASCADE SET NULL the Resorts FK in related passes.<br/>
            Change resort function is included to fulfill project requirement to UPDATE a M:N relationship such that a FK value is altered/updated.</p>
            <p>Viewing passes for {viewing}. <Link onClick={()=>loadPasses(transaction)}>Reload all passes</Link>. </p>
            <p>To create passes, go to <Link to='/transactions'>Transactions</Link>.</p>
            <PassesList changeResort={changeResort} passes={passes} fields={passesFields} onDelete={onDelete} onUseOne={onUseOne}></PassesList>
        </div>
    );
}

export default PassesPage;