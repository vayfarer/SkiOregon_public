import React from 'react';
import {MdEdit, MdDelete, MdDownhillSkiing} from 'react-icons/md'

function PassesRow({ changeResort, pass, onDelete, onUseOne }) {
    return (
        <tr>
            <td>{pass.id}</td>
            <td>{pass.Resorts_id}</td>
            <td>{pass.Resort_name}</td>
            <td>{pass.Transaction_id}</td>
            <td>{pass.first_name}</td>
            <td>{pass.last_name}</td>
            <td>{pass.quantity}</td>
            <td>{pass.available}</td>
            <td>< MdEdit onClick={() => changeResort(pass)}/></td>
            <td>< MdDownhillSkiing onClick={() => onUseOne(pass.id)}/></td>
            <td>< MdDelete onClick={() => onDelete(pass.id)}/></td>
        </tr>
    );
}

export default PassesRow;