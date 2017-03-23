var express = require('express');
var patientRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function (nav) {
    
    var patientController =
        require('../controllers/patientController')(nav);
    patientRouter.use(patientController.middleware);
    patientRouter.route('/')
        .get(patientController.getIndex);

    patientRouter.route('/:id')
        .get(patientController.getById);

    return patientRouter;
};
module.exports = router;