import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';

export const EditPassesPage = ({pass}) => {

    const navigate = useNavigate();

    const id = pass.id;
    const [Resorts_id, setResortsID] = useState(pass.Resorts_id);

    const editPass = async () => {
        // set PUT to change a pass.Resorts_id FK.
        try {
            const response = await api.put(`/passes/${id}`, {
                id: id,
                Resorts_id: Resorts_id,
                use_one: false
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
        navigate('/passes');
    };

    // READ resorts to populate drop down.
    const [resorts, setResorts] = useState([]);
    const loadResorts = async () =>{
        try {
            const response = await api.get('/resorts');
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
            <h1>Change Pass Resort</h1>
            <table className='crud'>
                <tr>
                    <td>id: </td>
                    <td>{id}</td>
                </tr>
                <tr>
                    <td>Resort: </td>   
                    <td>
                        <select onChange={e => setResortsID(e.target.value)}>
                        <option value=''>Choose Resort</option>
                            {resorts.map((resorts, i) => (
                        <option key={i} value={resorts.id}>{resorts.name}</option>
                        ))}
                                               
                        </select>
                    </td>
                </tr>
            </table>
            <button
                onClick={editPass}
            >Save</button>
        </div>
    );
}

export default EditPassesPage;