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

    $scope.chooseIngredient = function(ing) {
      $scope.sendData['choise'] = $scope.productData[ing];
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

    $http.get('/api/recipe')
      .success(function(data) {
        $scope.recipe = data
        console.log(data['title']);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
};

$(document).ready(function() {
    var temp = 0;

    $(".btn-primary").click(function(){
        var jsonName = '{{products.';
        var buttonID = "btn-option-";
        if (temp < 2){
            temp++;
            jsonName += temp;
            jsonName += ".";
            for (var i = 1; i < 4; i ++){
                var tempName = jsonName;
                var tempId = buttonID;

                tempName += i;
                tempName += '}}';
                tempId += i;
                $(("#"+tempId)).html(allIngredients[temp][i]);

                tempName = jsonName;
                tempId = buttonID;
            }
        }
    });
});
