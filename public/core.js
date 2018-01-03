var myAppModule = angular.module("myApp", []);
var allIngredients;

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
        $scope.chooseIngredient = function() {
          $scope.sendData['choise'] = choises;
          $http.post('/api/products', $scope.sendData)
            .success(function(data) {
              $scope.productData = {};
              $scope.product = data;
              console.log(data);
            })
            .error(function(data) {
              console.log('Error: ' + data);
          });
        };
    }

    /*$http.get('/api/recipe')
      .success(function(data) {
        $scope.recipe = data
        console.log(data['title']);
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });*/

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
                alert(choise1 + " " + choise2 + " " + choise3);
                temp ++;
                choises["1"] = choise1;
                choises["2"] = choise2;
                choises["3"]= choise3;
                postSelections.call();
            }

            if (temp == 2){
                temp ++;
            }
        });
    });
};

var choises = {}

var choise1 = "";
var choise2 = "";
var choise2 = "";

var totalSelections = 0;

var writeSelection = function(param)
{
    switch(totalSelections) {
        case 0:
            choise1 = param.innerHTML;
            totalSelections++;
            break;
        case 1:
            choise2 = param.innerHTML;
            totalSelections++;
            break;
        case 2:
            choise3 = param.innerHTML;
            totalSelections++;
            break;
        default:
            break;
    }
};
