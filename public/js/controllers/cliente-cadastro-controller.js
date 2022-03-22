angular
  .module("cadastroDeClientes")
  .controller("ClienteCadastroController", function ($scope, $http) {
    $scope.telefones = [];

    var token = localStorage.getItem("token");
  });
