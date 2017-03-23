var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var patientController = function (nav) {
    var middleware = function (req, res, next) {
        // if (!req.user) {
        // res.redirect('/');
        // }
        // next();
    };
    var getIndex = function (req, res) {
        var url =
            'mongodb://localhost:27017/patientApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('users');

            collection.find({}).toArray(
                function (err, results) {
                    res.render('patientListView', {
                        title: 'PatientList',
                        nav: nav,
                        users: results
                    });
                }
            );
        });

    };

    var getById = function (req, res) {
        var id = new objectId(req.params.id);
        var url =
            'mongodb://localhost:27017/patientApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('users');

            collection.findOne({
                    _id: id
                },
                function (err, results) {
                    if (results.patientId) {
                        (function (err, book) {
                                    results.user = user;
                                    res.render('patientView', {
                                        title: 'PatientList',
                                        nav: nav,
                                        user: results
                                    });
                                    
                                })();
                        
                    } else {
                        res.render('patientView', {
                            title: 'PatientList',
                            nav: nav,
                            user: results
                        });
                    }
                }

            );

        });

    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = patientController;