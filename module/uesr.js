const pool = require('../module/db')

export async function checkUser(email, password) {
    try {
        pool.query(`SELECT * FROM user WHERE email=${email}`, (err,result, fields)=>{
            if(err) throw err;
            console.log(result);
        });

    } catch (error) {

    }
}