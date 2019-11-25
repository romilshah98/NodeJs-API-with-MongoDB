var express = require('express');
var app = express();
// use body parser to send and receive JSON data
var bodyParser = require('body-parser');
// we use mongoose to talk with mongodb database
var mongoose = require('mongoose')
// connecting to mongodb database we need our server to run if we want to coonect with db
var db = mongoose.connect('mongodb://localhost/swag-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

// its a middleware which checks that everything is fomatted correctly
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/product', function (req, res) {
    var product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.likes = 0;
    // saving this product
    product.save(function (err, savedProduct) {
        if (err) {
            res.status(500).send({ error: "Could not save product" });
        }
        else {
            // sending response
            res.send(savedProduct);
        }
    })
});

app.get('/product', function (req, res) {
    // this is an asynchronous call so write response inside this callback 
    Product.find({}, function (err, products) {
        if (err) {
            res.status(500).send({ error: "Could not find product" });
        } else {
            res.send(products);
        }
    });
});

app.post('/wishlist', function (req, res) {
    var wishlist = new WishList();
    wishlist.title = req.body.title;

    wishlist.save(function (err, savedWishList) {
        if (err) {
            res.status(500).send("Could not save wishlist");
        }
        else {
            res.send(savedWishList);
        }
    });
});

app.get('/wishlist', function (req, res) {
    // here we try to populate products feild with actual data not only id
    WishList.find({}).populate({ path: 'products', model: 'Product' }).exec(function (err, wishLists) {
        if (err) {
            res.status(500).send("Could not fetch wishlist");
        }
        else {
            res.send(wishLists);
        }
    });
    // WishList.find({}, function (err, wishlists) {
    //     if (err) {
    //         res.status(500).send({ error: "could not find wishlist" });
    //     } else {
    //         res.send(wishlists);
    //     }
    // })
});

app.put('/wishlist/product/add', function (req, res) {
    // finding product with this id
    Product.findOne({ _id: req.body.productId }, function (err, product) {
        if (err) {
            res.status(500).send({ error: "Could not add item to wishlist" });
        } else {
            // updating the wishlist
            WishList.update({ _id: req.body.wishListId }, { $addToSet: { products: product._id } }, function (err, wishList) {
                if (err) {
                    res.status(500).send({ error: "Could not add item to wishlist" })
                }
                else {
                    res.send(wishList);
                }
            });
        }
    })
});

app.listen(3000, function () {
    console.log("Swag API is running on port 3000")
});