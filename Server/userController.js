const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

var {User} = require('./models/user');

//Read
router.get("/api/getUsers", (req, res) => {
    User.find({}, (err, data) => {
        if(!err){
            res.send(data);
        } else {
            res.send(err);
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