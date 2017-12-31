const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productHandler = require('./productHandler');
const axios = require('axios');
const fs = require("fs");
const port = 3000;

var app = express();
var secret = fs.readFileSync("secret.json");
var API_KEY = JSON.parse(secret).API_Key;
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
  productObj = productHandler.get3Products();
  //console.log('productObj: ', productObj);
  res.json(productObj);
});

app.post('/api/products', function(req,res) {
  var product =  req.body.choise;
  productHandler.chosenProduct(product);
  console.log(product);
});

app.get('/api/recepie', function(req,res) {
  var url = `http://food2fork.com/api/search?key=${API_KEY}${productHandler.getSearchQuery()}`;
  var url2 ='';
  axios.get(url)
    .then((rep) => {
      console.log(rep.data);
      console.log(rep.data.recipes[0].recipe_id);
      url2 = `http://food2fork.com/api/get?key=${API_KEY}&rId=${rep.data.recipes[0].recipe_id}`;
      return (axios.get(url2));
  })
  .then((rep) => {
    console.log("url2 is: ", url2);
    console.log(rep.data);
    res.json(rep.data );
  })
  .catch((e) =>{
      console.log(e);
  });
});
//application =====================================

app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

//listen ==========================================
app.listen(port);
console.log(`App listening on port ${port}`);
