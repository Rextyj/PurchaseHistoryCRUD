const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
})

// var dataSchema = new mongoose.Schema({
//     itemName: {type: String},
//     quantity: {type: Number}
// })

var User = mongoose.model('User', userSchema);
// var Data = mongoose.model('Data', dataSchema);


module.exports = {User: User};