const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productHandler = require('./productHandler');
const port = 3000;

var app = express();
//var API_KEY = JSON.parse(secret).API_Key;
//config ==========================================

//mongoose.connect('JSON.parse(answer)mongodb://node:')

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.urlencoded({'exended':'true'}))
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}))
app.use(methodOverride());

//routes ==========================================

app.get('/api/products', function(req, res) {
  productObj = productHandler.getIngredinetChoises();
  res.json(productObj);
});

app.post('/api/products', function(req,res) {
  var answer =  req.body;
  console.log(answer.choise);
  var recipe = productHandler.getRecipe(answer.choise);
  res.json(recipe);
});

// app.get('/api/recipe', function(req,res) {
//   var recipe = {"title": "Salmon with beetroot, feta & lime salsa",
//                 "details": {
//                   "difficulty": "easy",
//                   "prep_time": "5 mins",
//                   "cook_time": "10 mins"
//                 },
//                 "ingredients": {
//                   "count":"3",
//                   "0":{
//                     "amount":"500 g",
//                     "name": "salmon"
//                   },
//                   "1":{
//                     "amount":"200 g",
//                     "name": "beetroot"
//                   },
//                   "2":{
//                     "amount":"150g",
//                     "name":"feta"
//                   }
//                 },
//                 "method":{
//                   "step_count":"2",
//                   "steps":{
//                     "0": "To this and that",
//                     "1": "Once this and that is done do that this"
//                   }
//                 }
//               };
//     res.json(recipe);
// });
//application =====================================

app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

//listen ==========================================
app.listen(port);
console.log(`App listening on port ${port}`);
