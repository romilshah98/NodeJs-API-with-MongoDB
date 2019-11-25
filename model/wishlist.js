var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var wishlist = new Schema({
    title: { type: String, default: 'Cool wish list', required: true },
    // It's type is objectId means it has to be a mongo database and ref means type of schema(collection) which is Product
    products:[{type: ObjectId, ref:'Product'}],
    // the above is equivalent to this
    // var product = new Schema({
    //     title: String,
    //     price: Number,
    //     likes: Number
    // });
});
// exporting the model
module.exports=mongoose.model('WishList',wishlist);
 