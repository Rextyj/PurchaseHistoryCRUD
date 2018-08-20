const express = require('express');
const bodyParser = require('body-parser');

//this is object destructuring
const {Mongoose} = require('./db');
var userController = require('./userController');
var recordController = require('./recordController');

var app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
}); 
app.listen(8080, () => console.log('server started at port: 8080'));

app.use('/users', userController);
app.use('/records', recordController);

 