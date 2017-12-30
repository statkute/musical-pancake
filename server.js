const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = 3000;

var app = express();

//config ==========================================

//mongoose.connect('mongodb://node:')

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.urlencoded({'exended':'true'}))
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}))
app.use(methodOverride());

//routes ==========================================

app.get('/api/products', function(req, res) {
  res.json({'1':'banana', '2':'nutella', '3':'peperroni'});
});

app.post('/api/products', function(req,res) {
  var product =  req.body.choise;
  console.log(product);
});


//application =====================================

app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

//listen ==========================================
app.listen(port);
console.log(`App listening on port ${port}`);
