const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'vserver',
}).promise();

async function getUser(email) {
    return await pool.query('SELECT * FROM `user` WHERE `email`="' + email + '"');
}

module.exports = {
    getUser
}