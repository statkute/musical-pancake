var productList = ['banana', 'nutella', 'peperroni', 'chicken', 'salad']

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

get3Products = () => {
  var shuffledlist = shuffle(productList);
  return {'1':shuffledlist[0], '2':shuffledlist[1], '3':shuffledlist[2]};
};


module.exports = {
   get3Products
};
