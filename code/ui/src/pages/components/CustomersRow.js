import React from 'react';
import {MdDelete, MdEdit, MdAddShoppingCart, MdList} from 'react-icons/md'

function CustomersRow({ customer, onDelete, onEdit, onAddTransaction, onViewTransactions }) {
    return (
        <tr>
            <td>{customer.id}</td>
            <td>{customer.first_name}</td>
            <td>{customer.last_name}</td>
            <td>{customer.age}</td>
            <td>{customer.phone}</td>
            <td>{customer.email}</td>
            <td>< MdEdit onClick={() => onEdit(customer)}/></td>
            <td>< MdDelete onClick={() => onDelete(customer.id)}/></td>
            <td>< MdList onClick={() => onViewTransactions(customer)}/></td>
            <td>< MdAddShoppingCart onClick={() => onAddTransaction(customer)}/></td>

        </tr>
    );
}

export default CustomersRow;