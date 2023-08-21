import React from 'react';
import { Link } from 'react-router-dom';


function Navigation(){
    return (
        <>
            <nav className='App-nav'>
                <Link to="/">Home</Link>
                <Link to="/resorts">Resorts</Link>
                <Link to="/runs">Runs</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/transactions">Transactions</Link>
                <Link to="/passes">Passes</Link>
            </nav>
        </>
    );
};

export default Navigation;