// Michael Chen
// CS 340
// 4/5/2023

// Based on code from OSU CS 340 Activity 2 - Connect webapp to database (Individual) 
// URL: https://canvas.oregonstate.edu/courses/1914747/assignments/9180988?module_item_id=23040527
// Date: 4/5/2023

import 'dotenv/config';
const HOST = process.env.HOST;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

import mysql from 'mysql';

// Create a 'connection pool' using the provided credentials
const dbpool = mysql.createPool({
    connectionLimit : 10,
    host            : `${HOST}`,
    user            : `${USERNAME}`,
    password        : `${PASSWORD}`,
    database        : `${DATABASE}`
})

// Export it for use in our application
export default dbpool;