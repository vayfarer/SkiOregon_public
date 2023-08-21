import React from 'react';
import RunsRow from './RunsRow';

function RunsList({ runs, fields, onDelete, onEdit }) {
    return (
        <table className="entity">
            <thead>
                <tr>
                    {fields.map((field, i) => (
                    <th key={i}>{field.name}</th>
                    ))}
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {runs.map((run, i) => <RunsRow run={run}
                    key={i} onDelete={onDelete}/>)}
            </tbody>
        </table>
    );
}

export default RunsList;
