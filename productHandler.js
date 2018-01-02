const fs = require("fs");

var recipes = JSON.parse(fs.readFileSync("recipes.json"));
var ingredient_map = JSON.parse(fs.readFileSync("recipe-map.json"));


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

chosenProduct = (produts) => {

};



module.exports = {
   getIngredinetChoises,
   chosenProduct,
};
