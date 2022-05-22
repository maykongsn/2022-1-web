var mongoose = require('mongoose');

var mongoDbUrl = 'mongodb://127.0.0.1:27017/web'
mongoose.connect(mongoDbUrl, {useNewUrlParser:true})

var db = mongoose.connection

db.on('connected', () => {
    console.log('Connected to ' + mongoDbUrl);
});

db.on('disconnected', () => {
    console.log('Disconnected to ' + mongoDbUrl);
});

db.on('error', (err) => {
    console.log('Error: ' + err);
});