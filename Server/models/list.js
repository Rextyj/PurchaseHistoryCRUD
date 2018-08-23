const mongoose = require('mongoose');

var listItemSchema = new mongoose.Schema({
    CompanyName: { type: String },
    NumberOfSharesBought: { type: Number },
    DatePurchased: { type: String },
    DateSold: { type: String },
    NumberOfSharesSold: { type: Number },
    PurchasePrice: { type: Number },
    SoldPrice: { type: Number },
    LossGainPrice: { type: Number },
    Owner: {type: String}
});

var RecordList = mongoose.model('RecordList', listItemSchema);
// var Data = mongoose.model('Data', dataSchema);


module.exports = { RecordList: RecordList };