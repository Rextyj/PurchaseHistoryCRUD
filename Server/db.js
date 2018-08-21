const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StockHistory', (err) =>{
    if(!err){
        console.log('MongoDB connection succeeded');
    } else {
        console.log("error connection: " + JSON.stringify(err, undefined,2));
    }
});

module.exports = mongoose;