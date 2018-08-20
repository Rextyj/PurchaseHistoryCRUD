const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

var {RecordList} = require('./models/list');

//Read
router.get("/api/getPurchase", (req, res) => {
    RecordList.find({}, (err, data) => {
        if(!err){
            res.send(data);
        } else {
            res.send(err);
        }
    });
});

//create
router.post('/api/SavePurchase', (req, res) => {
    var newRecord = new RecordList(req.body);

    if(req.body.mode == 'Save'){
        newRecord.save((err, data) => {
            if(!err){
                res.send({data: 'inserted a new item'});
            } else {
                res.send(err);
            }
        });
    }
});

module.exports = router;