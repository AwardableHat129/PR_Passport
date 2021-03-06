const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');


require('dotenv').config();
require('./config/passport');

const authRouter = require('./routes/auth.route');

const app = express();


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['clave'] //clave para encriptar
}));

//inicializar passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);


app.get('/', (req, res) => {

    res.redirect('./public/html/home.html');

});




module.exports = app;
