const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport'); // Adjust path as needed
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// PASSPORT
app.use(session({
    secret: process.env.KEY, // Change to a secure random string
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passportConfig(passport);

// USER ROUTE
const userRoute = require('./src/routes/user.route');
app.use('/api', userRoute);

app.listen(port, () => {
    console.log(`Server Start At http://localhost:${port}`);
});