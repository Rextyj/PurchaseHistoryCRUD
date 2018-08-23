const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.ObjectId;

var { RecordList } = require('./models/list');

//Read
//we need to find records that belongs to a specific user
router.post("/api/getPurchase", (req, res) => {
    console.log('request is ', req.body);
    RecordList.find({Owner: req.body.owner}, (err, data) => {
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
router.get('/api/getSummary', (req, res) => {
       RecordList.aggregate(
           [{$group : {_id:"$CompanyName",
                        averagenumberbought: {$avg: "$NumberOfSharesBought"},
                        averagenumbersold: {$avg: "$NumberOfSharesSold"},
                        averageprice: {$avg: "$PurchasePrice"},
                        averagesprice: {$avg: "$SoldPrice"},
                        averagelprice: {$avg: "$LossGainPrice"}
            }

        
            }], (err, data) => {
                //console.log('data is ', data);
                res.send(data);
            }
       )
})

router.post('/api/getBetweenDate', (req, res)=>{
    var beginDate = req.body.beginningDate;
    var endDate = req.body.endDate;
   
        RecordList.aggregate([
            {$match: {"DateSold":{$gte: beginDate, $lte: endDate},
                       },
                
            }
        ], (err, data) => {
            console.log('data is ', data);
            res.send(data);
        })

})

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