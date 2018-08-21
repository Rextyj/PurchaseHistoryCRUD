const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

var {User} = require('./models/user');

//read individual user
router.post("/api/getUser", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log('request body is ', req.body);
    console.log('username is ', username);
    User.find({username: username, password: password}, (err, data) => {
        //if no match is found, it will return an empty array
        if(!err && data.length != 0){
            console.log('user found', data);
            res.send({data: 'verified'});
        } else {
            console.log('not found');
            res.send({data: 'No matching record has been found'});
        }
    });
});


//create
router.post('/api/SaveUser', (req, res) => {
    var user = new User(req.body);
    
    user.save((err, data) => {
        if(!err){
            res.send({data: 'added a new user'});
        } else {
            res.send(err);
        }
    });
});

module.exports = router;