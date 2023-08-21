// Christian Kesting and Michael Chen
// CS340 Project SkiOregon!
// Express Server, Project Step 6

// Express back end server code citations:
// Based on starter code adapted from: 
// Michael Curry, Exploration - Developing in Node.JS, OSU CS340 Spring 2023
// https://canvas.oregonstate.edu/courses/1914747/pages/exploration-developing-in-node-dot-js?module_item_id=23040596
// Accessed May 2023.

import 'dotenv/config'; // .env include the SQL login and server port constant. This is not included in the zip.
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';

// dmq contains all data manipulation queries. 
import * as dmq from './SkiOregon_DMQ.mjs';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));

console.log(`Server started.`);

// Status report for server online
app.get("/", (req,res) => {
    res.send(`Server is live on port ${PORT}`);
});
app.get("/status", (req,res) => {
    res.json({online:true});
});

// Routing for API.
app.route('/resorts')
.get((req, res)=>dmq.getResorts(req,res))
.post((req, res)=>dmq.addResort(req,res));
app.delete('/resorts/:id', (req,res)=>dmq.deleteResort(req,res));
app.put('/resorts/:id', (req,res)=>dmq.updateResort(req,res));

app.route('/runs')
.get((req,res)=>dmq.getRuns(req,res))
.post((req, res)=>dmq.addRun(req,res));
app.delete('/runs/:id', (req,res)=>dmq.deleteRun(req,res));

app.route('/customers')
.get((req,res)=>dmq.getCustomers(req,res))
.post((req,res)=>dmq.addCustomer(req,res));
app.delete('/customers/:id', (req,res)=>dmq.deleteCustomer(req,res));
app.put('/customers/:id', (req,res)=>dmq.updateCustomer(req,res));

app.route('/transactions')
.get((req,res)=>dmq.getTransactions(req,res))
.post((req,res)=>dmq.addTransaction(req,res));
app.post('/transactions/:cust_id', (req,res)=>dmq.CustomerTransactions(req,res));
app.put('/transactions/:id', (req,res)=>dmq.setNullCustomerTransaction(req,res));
app.delete('/transactions/:id', (req,res)=>dmq.deleteTransaction(req,res));

app.route('/passes')
.get((req,res)=>dmq.getPasses(req,res))
.post((req,res)=>dmq.addPasses(req,res));
app.post('/passes/:transaction_id', (req,res)=>dmq.TransactionPasses(req,res));
app.delete('/passes/:id', (req,res)=>dmq.deletePass(req,res));
app.put('/passes/:id', (req,res)=>dmq.editPass(req,res));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});