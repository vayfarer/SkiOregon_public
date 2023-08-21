import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';

export const EditResortsPage = ({resort}) => {

    const navigate = useNavigate();

    const id = resort.id;
    const [name, setName] = useState(resort.name);
    const [vert, setVert] = useState(resort.vert);
    const [avg_snowpack, setAvgSnowpack] = useState(resort.avg_snowpack);
    const [rate, setRate] = useState(resort.rate);

    const editResort = async () => {
        try {
            const response = await api.put(`/resorts/${id}`, {
                name: name,
                vert: vert,
                avg_snowpack: avg_snowpack,
                rate: rate
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

        navigate('/resorts');
    };

    return (
        <div>
            <h1>Edit Resort</h1>
            <table className='crud'>
                <tr>
                    <td>id: </td>
                    <td>{id}</td>
                </tr>
                <tr>
                    <td>name: </td>
                    <td>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>vert: </td>
                    <td>
                        <input
                            type="number"
                            value={vert}
                            onChange={e => setVert(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>avg_snowpack: </td>
                    <td>
                        <input
                            type="number"
                            value={avg_snowpack}
                            onChange={e => setAvgSnowpack(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>rate: </td>
                    <td>
                        <input 
                            type="number" 
                            value={rate}
                            onChange={e => setRate(e.target.value)} />
                    </td>
                </tr>
            </table>
            <button
                onClick={editResort}
            >Save</button>
        </div>
    );
}

export default EditResortsPage;