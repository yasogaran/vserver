require('dotenv').config()
const { getUser } = require('../module/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


async function signinUser(req, res, next) {
    const{email,password} = req.body;
    try {
        const [result] = await getUser(email);
        if (result.length == 0) {
            res.json({'msg':'invalid Email or Password'})
        } else {
            if (await verifyPassword(password, result[0].password)) {
                const token = createJWTToken(result[0].id);
                console.log(typeof(token));
                res.cookie('token', token, { httpOnly: true, maxAge: 2 * 60 * 1000 })
                
                next();
            } else {
                res.json({'msg':'Invalid Email Or Password'})
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(501).json({ 'msg': 'Please Try again later' })
    }
}

async function verifyPassword(password, hash) {
   return await bcrypt.compare(password, hash)
}

function createJWTToken(userid) {
    console.log('user id i s'+ userid);
    const user = { id:userid };
    return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 20 * 60 });
}

module.exports = {
    signinUser
}



// $2b$10$FTb7D8THkNkZJ4ffIdejeODq2DsOFhbk8gI5ggRVZ11j0E7Iy4.4C                -12345678