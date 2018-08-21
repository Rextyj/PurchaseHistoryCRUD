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
        } else if(err) {
            res.send({data: 'error connecting to db'});
        } else {
            console.log('not found');
            res.send({data: 'unsuccessful'});
        }
    });
});


//create
router.post('/api/SaveUser', (req, res) => {
    var user = new User(req.body);
    User.find({username: req.body.username}, (err, data) => {
        if(!err && data.length == 0){
            user.save((err, data) => {
                if (!err) {
                    res.send({ data: 'successful' });
                } else {
                    res.send(err);
                }
            });
        } else {
            // //403 means the server understands the req but refuse to fullfil it
            // res.sendStatus(403);
            res.send({data: 'Please choose another username', duplicate: true});
        }
    })

    
});

module.exports = router;