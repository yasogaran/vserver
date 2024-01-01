const express = require('express');
const { signinUser } = require('./module/uesr');

const app = express();
app.use(express.json())


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/signin', (req, res) => {
    res.render('signin.ejs')
})

app.post('/signin',signinUser, (req, res) => {

    
    res.send('signin in');
})


app.listen(3000);