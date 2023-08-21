import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';
import ResortsList from './components/ResortsList';

export const ResortsPage = ( {setResort} ) => {

    const navigate = useNavigate();

    const [resorts, setResorts] = useState([]);
    const [resortsFields, setResortsFields] = useState([]);

    const loadResorts = async () =>{
        // READ resorts.
        try {
            const response = await api.get('/resorts');
            // console.log(response.data.fields);
            setResorts(response.data.rows);
            setResortsFields(response.data.fields);
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
        }
    };

    // add resort
    const [name, setName] = useState('');
    const [vert, setVert] = useState('');
    const [avg_snowpack, setAvgSnowpack] = useState('');
    const [rate, setRate] = useState('');

    const addResort = async () => {        
        try {
            const response = await api.post('/resorts', {
                name: name,
                vert: vert,
                avg_snowpack: avg_snowpack,
                rate: rate
            })
            if (response.status != 400){
                loadResorts();
            } else {
                alert("Add resort failed.");
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
            const responseDelete = await api.delete(`/resorts/${id}`);
            if (responseDelete.status === 204) {
                loadResorts();
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

    const onEdit = async (resort) => {
        setResort(resort);
        navigate('/edit_resort');
    };

    useEffect(() => {
        loadResorts();
    }, []);

    return (
        <>
        <div>
            <h1>Resorts</h1>
            <p>1:M relationship with Passes. Deleting a resort will CASCADE SET NULL the Resorts FK in related passes. <br />
            1:M relationship with Runs. Deleting a resort will CASCADE DELETE related passes.
            </p>
            <ResortsList resorts={resorts} fields={resortsFields} onDelete={onDelete} onEdit={onEdit}></ResortsList>
        </div>

        <div>
        <h2>Add Resorts</h2>
        <input
            type="text"
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)} />
        <input
            type="number"
            value={vert}
            placeholder="vert"
            onChange={e => setVert(e.target.value)} />
        <input
            type="number"
            placeholder="avg_snowpack"
            value={avg_snowpack}
            onChange={e => setAvgSnowpack(e.target.value)} />
        <input 
            type="number" 
            placeholder="rate"
            value={rate}
            onChange={e => setRate(e.target.value)} />
        <button
            onClick={addResort}
        >Add</button>
        </div>
        </>
    );
}

export default ResortsPage;