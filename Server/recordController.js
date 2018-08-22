const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

var { RecordList } = require('./models/list');

//Read
router.get("/api/getPurchase", (req, res) => {
    RecordList.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});

//create
router.post('/api/SavePurchase', (req, res) => {
    var newRecord = new RecordList(req.body);

    if (req.body.mode == 'Save') {
        newRecord.save((err, data) => {
            if (!err) {
                res.send({ data: 'inserted a new item' });
            } else {
                res.send(err);
            }
        });
    }
});

//delete
router.post('/api/deletePurchase', (req, res) => {
    RecordList.remove({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            // res.send({data:"Record has been Deleted..!!"});
            //update the view
            RecordList.find({}, function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(data);
                }

            });
        }
    });

    //return the updated list
    // RecordList.findByIdAndRemove(new objectId(req.body.id), {new: true}, (err, data) => {
    //     if(!err) {
    //         res.send(data);
    //     } else {
    //         console.log('Error removing');
    //         res.send(err);
    //     }
    // })
});


//text search
router.post('/api/getSearchResult', (req, res) => {
    RecordList.createIndexes({ CompanyName: "text" }, err => {
        if (!err) {
            RecordList.find({ $text: { $search: req.body } }, (err, data) => {
                if (!err) {
                    console.log('text search returns ', data);
                    res.send(data);
                } else {
                    res.send(err);
                }
            });
        } else {
            res.send({ data: 'Error creating text index' });
        }
    });
});



module.exports = router;