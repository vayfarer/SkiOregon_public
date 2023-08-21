import React from 'react';
import CustomersRow from './CustomersRow';

function CustomersList({ customers, fields, onDelete, onEdit, onAddTransaction, onViewTransactions }) {
    return (
        <table className="entity">
            <thead>
                <tr>
                    {fields.map((field, i) => (
                    <th key={i}>{field.name}</th>
                    ))}
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>View Transactions</th>
                    <th>Add Transactions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, i) => <CustomersRow customer={customer}
                    key={i} onDelete={onDelete} onEdit={onEdit} 
                    onAddTransaction={onAddTransaction} 
                    onViewTransactions={onViewTransactions}/>)}
            </tbody>
        </table>
    );
}

export default CustomersList;
