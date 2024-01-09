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
// ADD NEW RECORD TO DB (id is path)
async function setFile({ path, title, user, date, size }) {
    const result = await pool.query('INSERT INTO `video`(`path`,`title`,`size`,`user`,`date`) VALUES ("' + path + '","' + title + '","' + size + '","' + user + '","' + date + '")');
    return result;
}

async function getFile (req, res){
    const [result] = await pool.query("SELECT * FROM `video` WHERE `path` ='"+req.parms.pathname+"'")
    res.json(result[0])
}


module.exports = {
    getUser,
    setFile,
}