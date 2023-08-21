import React from 'react';
import { useNavigate } from 'react-router-dom';
import {MdDelete, MdEdit, MdAddShoppingCart, MdList} from 'react-icons/md';

function TransactionsRow({ transaction, onDelete, setNull, onAddPasses, onViewPasses }) {

    let date = transaction.date;
    date = date.substring(0,10);

    return (
        <tr>
            <td>{transaction.id}</td>
            <td>{transaction.first_name}</td>
            <td>{transaction.last_name}</td>
            <td>{date}</td>
            <td>< MdEdit onClick={() => setNull(transaction)}/></td>
            <td>< MdDelete onClick={() => onDelete(transaction.id)}/></td>
            <td>< MdList onClick={() => onViewPasses(transaction)}/></td>
            <td>< MdAddShoppingCart onClick={() => onAddPasses(transaction)}/></td>
        </tr>
    );
}

export default TransactionsRow;