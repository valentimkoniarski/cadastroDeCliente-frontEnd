angular
  .module("cadastroDeClientes")
  .controller("GruposController", function ($scope, $http) {
    $scope.grupos = [];

    $http.get("v1/grupos").then(function (retorno) {
      $scope.grupos = retorno.data;
    });
  });
