// DMQ file contains SQL queries.

// db-connector.mjs contains the sql login and sqlpool.
import dbpool from "./db-connector.mjs";

// RESORTS

function getResorts(req, res) {
    let query1 = "SELECT * FROM Resorts;";
    dbpool.query(query1, function(error, rows, fields){
        console.log("get resorts");
        res.json({
            "rows":rows,
            "fields":fields
        });
    });
}

function addResort (req, res) {
    let query1 = `INSERT INTO Resorts (name, vert, avg_snowpack, rate) VALUES ('${req.body.name}', '${req.body.vert}',${req.body.avg_snowpack} , '${req.body.rate}');`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("add resort");
            res.sendStatus(200);
        }
    });
}

function deleteResort(req, res) {
    let query1 = `DELETE FROM Resorts WHERE id = ${req.params.id};`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("delete resort");
            res.sendStatus(204);
        }
    });
}

function updateResort(req, res) {
    let query1 = `UPDATE Resorts SET name = '${req.body.name}', vert = '${req.body.vert}', avg_snowpack = ${req.body.avg_snowpack}, rate = '${req.body.rate}' WHERE id = ${req.params.id};`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("update resort");
            res.sendStatus(204);
        }
    });
}


// RUNS

function getRuns (req, res) {
    let query1 = "SELECT Runs.id as id, Resorts.name as Resort_name, Runs.name as Run_name, Runs.difficulty as difficulty, Runs.length as length, Runs.vert as vert, Runs.groomed as groomed FROM Runs INNER JOIN Resorts ON Runs.Resorts_id = Resorts.id;";

    dbpool.query(query1, function(error, rows, fields){
        console.log("get runs");
        res.json({
            "rows":rows,
            "fields":fields
        });
    });
}

function addRun (req, res) {
    let query1 = `INSERT INTO Runs (Resorts_id, name, difficulty, length, vert, groomed) VALUES ('${req.body.Resorts_id}', '${req.body.name}', '${req.body.difficulty}' , '${req.body.length}', '${req.body.vert}', '${req.body.groomed}');`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("add run");
            res.sendStatus(200);
        }
    });
}

function deleteRun(req, res) {
    let query1 = `DELETE FROM Runs WHERE id = ${req.params.id};`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("delete run");
            res.sendStatus(204);
        }
    });
}


//CUSTOMERS 

function getCustomers (req, res) {
    let query1 = "SELECT id, fname AS first_name, lname AS last_name, age, phone, email FROM Customers;";
    dbpool.query(query1, function(error, rows, fields){
        console.log("get customers");
        res.json({
            "rows":rows,
            "fields":fields
        });
    });
}

function addCustomer (req, res) {
    let query1 = `INSERT INTO Customers (fname, lname, age, phone, email) VALUES ('${req.body.fname}', '${req.body.lname}',${req.body.age} , '${req.body.phone}', '${req.body.email}');`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("add customer");
            res.sendStatus(200);
        }
    });
}

function deleteCustomer(req, res) {
    let query1 = `DELETE FROM Customers WHERE id = ${req.params.id};`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("delete customer");
            res.sendStatus(204);
        }
    });
}

function updateCustomer(req, res) {
          
    let query1 = `UPDATE Customers SET fname = '${req.body.fname}', lname = '${req.body.lname}', age = ${req.body.age}, phone = '${req.body.phone}', email = '${req.body.email}'  WHERE id = ${req.params.id};`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("update customer");
            res.sendStatus(204);
        }
    });
}

// TRANSACTIONS

function getTransactions (req, res)
{
    let query1 = "SELECT Transactions.id as id, Customers.fname as first_name, Customers.lname as last_name, Transactions.date as date FROM Transactions LEFT JOIN Customers on Transactions.Customers_id = Customers.id;";
    dbpool.query(query1, function(error, rows, fields){
        console.log("get transactions");
        res.json({
            "rows":rows,
            "fields":fields
        });
    });
}

function addTransaction (req, res) {

    let query1;
    if (req.body.Customers_id === null){
        query1 = `INSERT INTO Transactions (Customers_id, date) VALUES (NULL, '${req.body.date}');`;
    } else {
        query1 = `INSERT INTO Transactions (Customers_id, date) VALUES ('${req.body.Customers_id}', '${req.body.date}');`;
    }

    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("add transaction");
            res.sendStatus(200);
        }
    });
}

function CustomerTransactions (req, res)
{
    let query1;
    if (req.params.cust_id === 'null'){
        query1 = `SELECT Transactions.id as id, Customers.fname as first_name, Customers.lname as last_name, Transactions.date as date FROM Transactions LEFT JOIN Customers on Transactions.Customers_id = Customers.id WHERE Transactions.Customers_id IS NULL;`;
    } else {
        query1 = `SELECT Transactions.id as id, Customers.fname as first_name, Customers.lname as last_name, Transactions.date as date FROM Transactions LEFT JOIN Customers on Transactions.Customers_id = Customers.id WHERE Transactions.Customers_id = ${req.params.cust_id};`;
    }

    dbpool.query(query1, function(error, rows, fields){
        console.log("get transactions");
        res.json({
            "rows":rows,
            "fields":fields
        });
    });
}

function setNullCustomerTransaction (req,res)
{
    let query1 = `UPDATE Transactions SET Customers_id = NULL WHERE id = ${req.params.id};`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("update transaction");
            res.sendStatus(204);
        }
    });
}

function deleteTransaction(req, res) {
    let query1 = `DELETE FROM Transactions WHERE id = ${req.params.id};`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("delete transaction");
            res.sendStatus(204);
        }
    });
}

// PASSES

function getPasses (req, res)
{
    let query1 = "SELECT Passes.id as id, Resorts.id as Resorts_id, Resorts.name as Resort_name, Passes.Transactions_id as Transaction_id, Customers.fname as first_name, Customers.lname as last_name, Passes.quantity as quantity, Passes.available as available FROM Passes LEFT JOIN Resorts on Passes.Resorts_id = Resorts.id LEFT JOIN Transactions on Passes.Transactions_id = Transactions.id LEFT JOIN Customers on Transactions.Customers_id = Customers.id;";
    dbpool.query(query1, function(error, rows, fields){
        console.log("get passes");
        res.json({
            "rows":rows,
            "fields":fields
        });
    });
}

function TransactionPasses (req, res)
{
    let query1 = `SELECT Passes.id as id, Resorts.id as Resorts_id, Resorts.name as Resort_name, Passes.Transactions_id as Transaction_id, Customers.fname as first_name, Customers.lname as last_name, Passes.quantity as quantity, Passes.available as available FROM Passes LEFT JOIN Resorts on Passes.Resorts_id = Resorts.id LEFT JOIN Transactions on Passes.Transactions_id = Transactions.id LEFT JOIN Customers on Transactions.Customers_id = Customers.id WHERE Transactions_id = ${req.params.transaction_id};`;
    dbpool.query(query1, function(error, rows, fields){
        console.log("get passes for transaction");
        res.json({
            "rows":rows,
            "fields":fields
        });
    });
}

function addPasses (req, res) {
    let query1 = `INSERT INTO Passes (Transactions_id, Resorts_id, quantity, available) VALUES ('${req.body.Transactions_id}', '${req.body.Resorts_id}', '${req.body.quantity}', '${req.body.available}');`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("add passes");
            res.sendStatus(200);
        }
    });
}

function deletePass(req, res) {
    let query1 = `DELETE FROM Passes WHERE id = ${req.params.id};`;
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("delete pass");
            res.sendStatus(204);
        }
    });
}

function editPass(req, res) {

    let query1; 
    if (req.body.use_one === true){
        query1 = `UPDATE Passes SET available = available - 1 WHERE id = ${req.params.id};`;
    } else {
        query1 = `UPDATE Passes SET Resorts_id = '${req.body.Resorts_id}' WHERE id = ${req.params.id};`
    }
          
    dbpool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            console.log("edit pass");
            res.sendStatus(204);
        }
    });
}


export { getResorts, addResort, deleteResort, updateResort, 
    getRuns, addRun, deleteRun,
    getCustomers, addCustomer, deleteCustomer, updateCustomer,
     getTransactions, CustomerTransactions, setNullCustomerTransaction, addTransaction, deleteTransaction,
     getPasses, TransactionPasses, addPasses, deletePass, editPass } ;