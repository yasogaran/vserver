const express = require('express');
const { signinUser, authenticateUser, signoutUser } = require('./module/uesr');
const cookieParser = require('cookie-parser');
const upload = require('./module/file');
const { setFile } = require('./module/db');
const fs = require('fs')
const date = require('date-and-time');
const multer = require('multer')
const app = express();
app.use(express.json())
app.use(cookieParser())

app.get('/signin', (req, res) => {
    res.render('signin.ejs')
})
app.get('/signout', signoutUser)
app.post('/signin', signinUser)
app.get('/', authenticateUser, (req, res) => {
    res.render('index.ejs');
})
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
            res.json({ 'msg': 'success', 'details': { 'path': fl.path.replace('videos\\', ''), title: req.body.title ? req.body.title : '', date: date.format(now, 'YYYY/MM/DD HH:mm:ss') } })
        } catch (err) {
            res.json({ 'msg': 'file is uploaded but record has been not added', 'err': err.message })
        }
    })
})

app.get('/view',(req,res)=>{
    res.render('view.ejs');
})
app.get('/checkVideo/:pathname',authenticateUser,(res, req)=>{
    const pathname = req.params.pathname;
    res.json({'msg':'a'})
})

app.get('/stream/:pathname',authenticateUser ,(req,res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send('Requires range header');
    }
    const videoPath = 'videos/' + req.params.pathname;
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accepr-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4'
    }

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);

})

app.listen(3000);