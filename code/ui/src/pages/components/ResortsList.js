import React from 'react';
import ResortsRow from './ResortsRow';

function ResortsList({ resorts, fields, onDelete, onEdit }) {
    return (
        <table className="entity">
            <thead>
                <tr>
                    {fields.map((field, i) => (
                    <th key={i}>{field.name}</th>
                    ))}
                    {/* <th>Add Run</th> */}
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {resorts.map((resort, i) => <ResortsRow resort={resort}
                    key={i} onDelete={onDelete} onEdit={onEdit}/>)}
            </tbody>
        </table>
    );
}

export default ResortsList;
