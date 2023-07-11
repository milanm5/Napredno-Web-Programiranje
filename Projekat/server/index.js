const express = require('express')
const bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
const app = express()

app.use(bodyParser());
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/card', require('./cards'));
app.use("/api/user", require("./user"));

app.listen(3000, () => console.log('App Server listening on port 3000!'));