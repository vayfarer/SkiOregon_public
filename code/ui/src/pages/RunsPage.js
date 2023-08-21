import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';
import RunsList from './components/RunsList';

export const RunsPage = () => {

    const navigate = useNavigate();

    const [runs, setRuns] = useState([]);
    const [runsFields, setRunsFields] = useState([]);

    const loadRuns = async () =>{
        // READ runs
        try {
            const response = await api.get('/runs');
            // console.log(response.data.fields);
            setRuns(response.data.rows);
            setRunsFields(response.data.fields);
        } catch (err) {
            if (err.response) {
                console.log(err.response.status);
                console.log(err.response.data);
            } else {
                console.log(err.message);
            }
        }
    };
    
    // READ resorts to populate drop down.
    const [resorts, setResorts] = useState([]);
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


    const [resortID, setResortID] = useState('');
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [length, setLength] = useState('');
    const [vert, setVert] = useState('');
    const [groomed, setGroomed] = useState(1);

    const addRun = async () => {
        try {
            const response = await api.post(`/runs`, {
                Resorts_id: resortID,
                name: name,
                difficulty: difficulty,
                length: length,
                vert: vert,
                groomed: groomed
            })
            loadRuns();

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
            const responseDelete = await api.delete(`/runs/${id}`);
            if (responseDelete.status === 204) {
                loadRuns();
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

    useEffect(() => {
        loadResorts();
        loadRuns();
    }, []);

    return (
        <>
        <div>
            <h1>Runs</h1>
            <p>M:1 relationship with Resorts. Deleting a resort will CASCADE DELETE related runs.</p>
            <RunsList runs={runs} fields={runsFields} onDelete={onDelete}></RunsList>
        </div>
        <div>
            <h2>Add Run</h2>
            <table>
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
                    <td>name: </td>
                    <td>
                    <input
                        type="text"
                        placeholder='run name'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>difficulty: </td>
                    <td>
                        <select onChange={e => setDifficulty(e.target.value)}>
                            <option value="Beginner">Beginner </option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>length: </td>
                    <td>
                        <input
                            type="number"
                            placeholder='length'
                            value={length}
                            onChange={e => setLength(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>vert: </td>
                    <td>
                        <input 
                            type="number"
                            placeholder='vert'
                            value={vert}
                            onChange={e => setVert(e.target.value)} />
                    </td>
                </tr>
                <tr>
                    <td>groomed: </td>
                    <td>
                        <select onChange={e => setGroomed(e.target.value)}>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </td>
                </tr>
            </table>
            <button
                onClick={addRun}
            >Save</button>
        </div>
        </>
    );
}

export default RunsPage;