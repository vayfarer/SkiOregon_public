import React from 'react';
import PassesRow from './PassesRow';

function PassesList({ changeResort, passes, fields, onDelete, onUseOne }) {
    return (
        <table className="entity">
            <thead>
                <tr> 
                    {fields.map((field, i) => (
                    <th key={i}>{field.name}</th>
                    ))}
                    <th>Change resort</th>
                    <th>Use 1 Pass</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {passes.map((pass, i) => <PassesRow pass={pass}
                    key={i} changeResort={changeResort} onDelete={onDelete} onUseOne={onUseOne} />)}
            </tbody>
        </table>
    );
}

export default PassesList;
