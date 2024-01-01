const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'vserver',
}).promise();


export default pool;
