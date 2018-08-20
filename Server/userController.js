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
    
});

module.exports = router;