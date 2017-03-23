var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            var url =
                'mongodb://localhost:27017/patientApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var users = {
                    username: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password,
                    gender: req.body.gender,
                    age: req.body.age,
                    dob: req.body.dob
                };

                collection.insert(users,
                    function (err, results) {
                        req.login(results.ops[0], function () {
                            res.redirect('/auth/profile');
                        });
                    });
            });

        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
                console.log("success");
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.patient) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;
