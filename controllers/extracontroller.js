var express = require('express');
var router = express.Router();
var Product = require('../Model/product');
var User = require('../Model/user');
var Feed = require('../Model/feed');
var Contact = require('../Model/contact');
var async = require("async");

router.get('/productDetail/:id', (req, res) => {
    var locals = {};
    async.parallel([
        function (callback) {
            Product.findById(req.params.id).exec(function (err, product) {
                if (err) return callback(err);
                locals.product = product;
                callback();
            });
        },
    ], function (err) {
        if (err) return ("False");
        res.json({
            product: locals.product,
        });
    });
    console.log(locals.product);
});
router.get('/productlistbyfeed/:id', (req, res) => {
    var locals = {};
    async.parallel([
        function (callback) {
            Product.find({ feedid: req.params.id }).populate('Feed').sort({ '_id': -1 }).exec(function (err, product) {
                if (err) return callback(err);
                locals.product = product;
                callback();
            });
        }
    ], function (err) {
        if (err) return ("False");
        res.json({
            products: locals.product,
        });
    });
    console.log(locals.product);
});

router.post('/profile', (req, res) => {
    User.findById({
        _id: req.body._id
    }, function (err, user) {
        if (err) {
            res.json({ 'Success': 'Post Failed Something is wrong. Log in first!!1' });
        } else if (!user) {
            res.json('User not found ');
        } else if (user) {
            res.json(user);
        }

    });
});
router.get('/feedlist', (req, response, next) => {
    Feed.find().then(docs => {
        response.status(200).json({ success: "True", feed: docs });
        console.log(docs);
    }).catch(err => {
        console.log(err);
        response.status(500).json({ error: err });
    })
});

router.get('/productlist', (req, response, next) => {
    Product.find().then(docs => {
        response.status(200).json({ success: "True", products: docs });
        console.log(docs);
    }).catch(err => {
        console.log(err);
        response.status(500).json({ error: err });
    })
});
router.post('/contact', (req, res) => {
    // res.header("allow-file-access-from-files", "*");
    var contact = new Contact();

    contact.fullname = req.body.fullname;
    contact.phonenumber = req.body.phonenumber;
    contact.email = req.body.email;
    contact.message = req.body.message;

    console.log(contact);
    contact.save((err, doc) => {
        if (err) {
            res.send({ 'Success': 'Something is wrong' });
        } else {
            res.json('Your message send successfully');
        }
    });
});
// ====================================Update User=======================================//
router.put('/userupdate', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.json({ 'Success': 'Profile Updated Successfully!!', 'username': doc.username });
        } else {
            console.log('Error during record update : ' + err);
        }
    });
});



module.exports = router;