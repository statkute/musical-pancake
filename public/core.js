var myAppModule = angular.module("myApp", []);

function mainController($scope, $http) {
  $scope.productData = {};
  $scope.sendData = {};
  $scope.recipeData = {};

  $http.get('/api/products')
    .success(function(data) {
      $scope.first = data['1'];
      $scope.second = data['2'];
      $scope.third = data['3'];
      $scope.productData = data;
      console.log(data['1']);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

    $scope.chooseIngredient = function(ing) {
      $scope.sendData['choise'] = $scope.productData[ing];
      console.log($scope.productData[ing]);
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

$(document).ready(function(){

});
