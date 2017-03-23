var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/PatientList',
    Text: 'patientList'
}, {
    Link: '/patient',
    Text: 'patient'
}];
var patientRouter = require('./src/routes/patientRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({
//   genid: function(req) {
//     return genuuid(); // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat'
// }));
// app.use(session({
//     secret: cookie_secret,
    
// }));
app.use(session({secret: 'patientApp',resave: true,
    saveUninitialized: true}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/PatientList', patientRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/patientList',
            Text: 'patientList'
        }, {
            Link: '/patient',
            Text: 'Patient'
        }]
    });
});

app.get('/patient', function (req, res) {
    res.send('Hello Patient');
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});