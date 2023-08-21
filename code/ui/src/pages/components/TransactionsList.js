import React from 'react';
import TransactionsRow from './TransactionsRow';

function TransactionsList({ transactions, fields, onDelete, setNull, onAddPasses, onViewPasses }) {
    return (
        <table className="entity">
            <thead>
                <tr>
                    {fields.map((field, i) => (
                    <th key={i}>{field.name}</th>
                    ))}
                    <th>Set NULL<br/> Customer</th>
                    <th>Delete</th>
                    <th>View Passes</th>
                    <th>Add Pass</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, i) => <TransactionsRow transaction={transaction}
                    key={i} onDelete={onDelete} setNull={setNull} onAddPasses={onAddPasses} onViewPasses={onViewPasses} />)}
            </tbody>
        </table>
    );
}

export default TransactionsList;
