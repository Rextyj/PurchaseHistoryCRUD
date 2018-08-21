const mongoose = require('mongoose');

var listItemSchema = new mongoose.Schema({
    CompanyName: { type: String },
    NumberOfSharesBought: { type: String },
    DatePurchased: { type: String },
    DateSold: { type: String },
    NumberOfSharesSold: { type: String },
    PurchasePrice: { type: String },
    SoldPrice: { type: String },
    LossGainPrice: { type: String }
});

var RecordList = mongoose.model('RecordList', listItemSchema);
// var Data = mongoose.model('Data', dataSchema);


module.exports = { RecordList: RecordList };