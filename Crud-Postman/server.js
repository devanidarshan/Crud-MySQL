const express = require('express');
const app = express();
const port = 7777;

// BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// USER ROUTE
const userRoute = require('./src/routes/user.route');
app.use('/api', userRoute);

app.listen(port, () => {
    console.log(`Server Start At http://localhost:${port}`);
});