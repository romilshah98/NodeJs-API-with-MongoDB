var mongoose = require('mongoose');

// building database schema
var Schema = mongoose.Schema;
//  if we enter something that is not in this schema then it will not be saved
var product = new Schema({
    title: String,
    price: Number,
    likes: Number
});
// exporting this model          Name of DB
module.exports = mongoose.model('Product', product);