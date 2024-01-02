const express = require('express');
const { signinUser, authenticateUser } = require('./module/uesr');
const cookieParser = require('cookie-parser');
const upload = require('./module/file');
const { setFile } = require('./module/db');
const date = require('date-and-time');
const multer = require('multer')
const app = express();
app.use(express.json())
app.use(cookieParser())


app.get('/', authenticateUser, (req, res) => {
    res.render('index.ejs');
})
app.get('/signin', (req, res) => {
    res.render('signin.ejs')
})
app.post('/signin', signinUser)
app.post('/upload', authenticateUser, (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            res.json({ 'msg': err })
        } else if (err) {
            res.json({ 'msg': err })
        }
        fl = req.file;
        // ADD DATA TO DATABASE
        try {
            const now = new Date();
            const result = await setFile({
                path: fl.path.replace('videos\\', ''),
                size: fl.size,
                date: date.format(now, 'YYYY/MM/DD HH:mm:ss'),
                title: req.body.title ? req.body.title : '',
                user: 'null'
            })
            res.json({ 'msg': 'success', 'details': { 'path': fl.path.replace('videos\\', ''), title: req.body.title ? req.body.title : '' , date: date.format(now, 'YYYY/MM/DD HH:mm:ss')} })
        } catch (err) {
            res.json({ 'msg': 'file is uploaded but record has been not added', 'err': err.message })
        }
    })
})


app.listen(3000);