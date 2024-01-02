require('dotenv').config()
const { getUser } = require('../module/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


async function signinUser(req, res, next) {
    const { email, password } = req.body;
    try {
        const [result] = await getUser(email);
        if (result.length == 0) {
            throw Error('Invalid Email');
        } else {
            if (await verifyPassword(password, result[0].password)) {
                const token = createJWTToken(result[0].id);
                res.status(201).cookie('token', token, { httpOnly: true, maxAge: 20 * 60 * 1000 }).json({ 'msg': 'success' })
            } else {
                throw Error('Invalid Password');
            }
        }
    } catch (err) {
        res.status(501).json({ 'msg': 'Please Try again later', 'error': err.message })
    }
}

async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash)
}

function createJWTToken(userid) {
    const user = { id: userid };
    return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 20 * 60*1000 });
}

function authenticateUser(req, res, next) {
    try {
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
                if (err) {
                   throw Error ('Invalid Token')
                } else {
                    next();
                }
            })
        } else {
            res.clearCookie('token');
            throw Error ('Token Not Found')
        }
    } catch (error) {
        res.redirect('/signin')
    }
}


module.exports = {
    signinUser,
    authenticateUser
}



// $2b$10$FTb7D8THkNkZJ4ffIdejeODq2DsOFhbk8gI5ggRVZ11j0E7Iy4.4C                -12345678