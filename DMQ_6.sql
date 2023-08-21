-- Michael Chen and Christian Kesting
-- CS 340, Project Step 6
-- SkiOregon
-- Data Manipulation Queries examples


-- (READ) populate the table of all Resorts data.
SELECT * FROM Resorts;
-- (CREATE) add a new Resort
INSERT INTO Resorts (name, vert, avg_snowpack, rate) 
VALUES ('${req.body.name}', '${req.body.vert}',${req.body.avg_snowpack} , '${req.body.rate}');
-- (UPDATE) change a particular Resort by name
UPDATE Resorts SET name = '${req.body.name}', vert = '${req.body.vert}', avg_snowpack = ${req.body.avg_snowpack}, rate = '${req.body.rate}' 
WHERE id = ${req.params.id};
-- (DELETE) delete a Resort by name
DELETE FROM Resorts WHERE id = ${req.params.id};


-- (READ) populate the table of all Runs data.
SELECT Runs.id as id, Resorts.name as Resort_name, Runs.name as Run_name, Runs.difficulty as difficulty, Runs.length as length, Runs.vert as vert, Runs.groomed as groomed FROM Runs INNER JOIN Resorts ON Runs.Resorts_id = Resorts.id;
-- (CREATE) add a new Run
INSERT INTO Runs (Resorts_id, name, difficulty, length, vert, groomed) 
VALUES ('${req.body.Resorts_id}', '${req.body.name}', '${req.body.difficulty}' , '${req.body.length}', '${req.body.vert}', '${req.body.groomed}');
-- (DELETE) delete a Run
DELETE FROM Runs WHERE id = ${req.params.id};


-- (READ) populate the table of all Transactions data.
SELECT Transactions.id as id, Customers.fname as first_name, Customers.lname as last_name, Transactions.date as date FROM Transactions LEFT JOIN Customers on Transactions.Customers_id = Customers.id;
-- (READ) search transactions by customer name
SELECT Transactions.id as id, Customers.fname as first_name, Customers.lname as last_name, Transactions.date as date FROM Transactions LEFT JOIN Customers on Transactions.Customers_id = Customers.id WHERE Transactions.Customers_id = ${req.params.cust_id};
INSERT INTO Transactions (Customers_id, date) VALUES ('${req.body.Customers_id}', '${req.body.date}');
-- (UPDATE) set a transaction FK customers_id to null
UPDATE Transactions SET Customers_id = NULL WHERE id = ${req.params.id};
-- (DELETE) delete an existing Transaction by id.
DELETE FROM Transactions WHERE id = ${req.params.id};


-- (READ) populate the table of all Passes data.
SELECT Passes.id as id, Resorts.id as Resorts_id, Resorts.name as Resort_name, Passes.Transactions_id as Transaction_id, Customers.fname as first_name, Customers.lname as last_name, Passes.quantity as quantity, Passes.available as available FROM Passes LEFT JOIN Resorts on Passes.Resorts_id = Resorts.id LEFT JOIN Transactions on Passes.Transactions_id = Transactions.id LEFT JOIN Customers on Transactions.Customers_id = Customers.id;
-- (CREATE) add a new pass
INSERT INTO Passes (Transactions_id, Resorts_id, quantity, available) 
VALUES ('${req.body.Transactions_id}', '${req.body.Resorts_id}', '${req.body.quantity}', '${req.body.available}');
-- (UPDATE) change a particular Pass by id to used
UPDATE Passes SET available = available - 1
WHERE id= :idInput;
-- (UPDATE) change the value of a Resorts_id FK in a Passes row.
UPDATE Passes SET Resorts_id = '${req.body.Resorts_id}' WHERE id = ${req.params.id};
-- (DELETE) delete an existing Pass
DELETE FROM Passes WHERE id = ${req.params.id};


-- (READ) populate the table of all Customers data.
SELECT id, fname AS first_name, lname AS last_name, age, phone, email FROM Customers;
-- (CREATE) add a new customer
INSERT INTO Customers (fname, lname, age, phone, email) 
VALUES ('${req.body.fname}', '${req.body.lname}',${req.body.age} , '${req.body.phone}', '${req.body.email}');
-- (UPDATE) change a particular Customer by id
UPDATE Customers SET fname = '${req.body.fname}', lname = '${req.body.lname}', age = ${req.body.age}, phone = '${req.body.phone}', email = '${req.body.email}'  
WHERE id = ${req.params.id};
-- (DELETE) delete an existing Customer
DELETE FROM Customers WHERE id = ${req.params.id};


