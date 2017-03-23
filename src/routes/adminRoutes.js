var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var users = [
        {
            firstname: 'bben',
            lastname:'D',
            age: 28,
            dob: 01-02-1989,
            gender:'Male',
            mobile: 1234567890


           
        },
        {
            firstname: 'kaam',
            lastname:'D',
            age: 27,
            dob: 01-02-1990,
            gender:'Female',
            mobile: 1234567892
        }
        
    ];

var router = function (nav) {

    adminRouter.route('/addPatients')
        .get(function (req, res) {
            var url =
                'mongodb://localhost:27017/patientApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('patientList');
                collection.insertMany(users,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    }
                );

            });

           // res.send('inserting patients');
        });

    return adminRouter;
};

module.exports = router;