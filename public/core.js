var myAppModule = angular.module("myApp", []);
var allIngredients;
var fullRecipe;
var ingredients;
var ingredientCount;
var stepCount;
var steps;

function mainController($scope, $http) {
  $scope.productData = {};
  $scope.sendData = {};
  $scope.recipeData = {};

  $http.get('/api/products')
    .success(function(data) {
      $scope.products = data
      $scope.productData = data;
      allIngredients = $scope.products;
      console.log(data['1']);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

    function postSelections () {
          $scope.sendData['choise'] = choises;
          $http.post('/api/products', $scope.sendData)
            .success(function(data) {
              $scope.recipe = data;
              fullRecipe = data;
              ingredients = fullRecipe.ingredients;
              ingredientCount = fullRecipe.ingredients.count;
              steps = fullRecipe.method;
              stepCount = fullRecipe.method.count;
              console.log(data);
              writeIngredients.call();
              writeSteps.call();
            })
            .error(function(data) {
              console.log('Error: ' + data);
          });
    }

    function writeIngredients () {
        var ingredientPText = "";
        for (var i = 1; i < (ingredientCount+1); i ++){
            ingredientPText += ("<b> " +i);
            ingredientPText += ") " + "</b>";
            ingredientPText += ingredients[i-1]["name"];
            ingredientPText += " ";
            ingredientPText += "<br />";
        }
        ingredientPText += "<br />";
        console.log(ingredientPText);
        $("#ingredient-list").html(ingredientPText);
    }

    function writeSteps () {
        var stepPText = "";
        for (var i = 1; i < (stepCount+1); i ++){
            stepPText += ("<b> " +i);
            stepPText += ") " + "</b>";
            stepPText += steps[i-1];
            stepPText += " ";
            stepPText += "<br />";
        }
        stepPText += "<br />";
        console.log(stepPText);
        $("#step-list").html(stepPText);
    }

    $(document).ready(function() {

        var temp = 0;

        $(".btn-primary").click(function(){
            var buttonID = "btn-option-";
            if (temp < 2){
                temp++;
                for (var i = 1; i < 4; i ++){
                    var tempId = buttonID;
                    tempId += i;

                    $(("#"+tempId)).html(allIngredients[temp][i]);
                    tempId = buttonID;
                }
            }

            if (temp == 3){
                temp ++;
                postSelections.call();
                $("#recipe-panel").show();
                //console.log($scope.recipe.ingredients[0].name);
            }

            if (temp == 2){
                temp ++;
            }
        });
    });
};

var choises = {}

var totalSelections = 0;

var writeSelection = function(param)
{
    switch(totalSelections) {
        case 0:
            choises["1"] = param.innerHTML;
            totalSelections++;
            break;
        case 1:
            choises["2"] = param.innerHTML;
            totalSelections++;
            break;
        case 2:
            choises["3"] = param.innerHTML;
            totalSelections++;
            break;
        default:
            break;
    }
};
