const express = require('express');
const { signinUser, authenticateUser } = require('./module/uesr');
const cookieParser = require('cookie-parser');
const upload = require('./module/file');
const app = express();
app.use(express.json())
app.use(cookieParser())


app.get('/', authenticateUser, (req, res) => {
    res.render('index.ejs');
    // console.log('homepage');
})

app.get('/signin', (req, res) => {
    res.render('signin.ejs')
})

app.post('/signin', signinUser)




app.post('/upload', authenticateUser, upload.single('file'), (req, res) => {
    console.log(req.body);
    res.send('done');
})


app.listen(3000);