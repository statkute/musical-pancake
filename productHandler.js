const fs = require("fs");

var recipes = JSON.parse(fs.readFileSync("./Recipes/recipes.json"));
var ingredient_map = JSON.parse(fs.readFileSync("./Recipes/recipe-map.json"));


function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}



getIngredinetChoises = () => {
  var productList = ingredient_map.key_ingredients_list
  var shuffledlist = shuffle(productList);
  return {'0':{'1':shuffledlist[0], '2':shuffledlist[1], '3':shuffledlist[2]},
          '1':{'1':shuffledlist[3], '2':shuffledlist[4], '3':shuffledlist[5]},
          '2':{'1':shuffledlist[6], '2':shuffledlist[7], '3':shuffledlist[8]}
        };
};

getRecipe = (ingredients) => {
  var counter = {}
  var first_keys = ingredient_map['reversed_map'][ingredients['1']];
  var second_keys = ingredient_map['reversed_map'][ingredients['2']];
  var third_keys = ingredient_map['reversed_map'][ingredients['3']];
  first_keys.forEach(function(num) {
    if(num.toString() in counter){
      counter[num.toString()]++
    }
    else{
      counter[num.toString()] = 1
    }
  });
  second_keys.forEach(function(num) {
    if(num.toString() in counter){
      counter[num.toString()]++
    }
    else{
      counter[num.toString()] = 1
    }
  });
  third_keys.forEach(function(num) {
    if(num.toString() in counter){
      counter[num.toString()]++
    }
    else{
      counter[num.toString()] = 1
    }
  });
  var sortable = [];
  for (var vehicle in counter) {
    sortable.push([vehicle, counter[vehicle]]);
  }

  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });
  recipe_idx = sortable[1][0];
  console.log(recipes['recipes'][recipe_idx]);
  return (recipes['recipes'][recipe_idx])
};

module.exports = {
   getIngredinetChoises,
   getRecipe,
};
