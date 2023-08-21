import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MdDelete, MdEdit} from 'react-icons/md'

function RunsRow({ run, onDelete }) {
    return (
        <tr>
            <td>{run.id}</td>
            <td>{run.Resort_name}</td>
            <td>{run.Run_name}</td>
            <td>{run.difficulty}</td>
            <td>{run.length}</td>
            <td>{run.vert}</td>
            <td>{run.groomed}</td>
            <td>< MdDelete onClick={() => onDelete(run.id)}/></td>
        </tr>
    );
}

export default RunsRow;