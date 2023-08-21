import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MdDelete, MdEdit} from 'react-icons/md'

function ResortsRow({ resort, onDelete, onEdit }) {
    return (
        <tr>
            <td>{resort.id}</td>
            <td>{resort.name}</td>
            <td>{resort.vert}</td>
            <td>{resort.avg_snowpack}</td>
            <td>{resort.rate}</td>
            <td>< MdEdit onClick={() => onEdit(resort)}/></td>
            <td>< MdDelete onClick={() => onDelete(resort.id)}/></td>
        </tr>
    );
}

export default ResortsRow;