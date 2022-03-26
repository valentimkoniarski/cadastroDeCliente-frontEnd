angular
  .module("cadastroDeClientes")
  .controller("RegistroController", function ($scope, $http, $location) {
    $scope.foto = {};
    $scope.mensagem = "";

    $scope.usuario = {
      nome: $scope.nome,
      email: $scope.email,
      senha: $scope.senha,
    };

    $scope.registrar = function () {
      var configuracao = {
        method: "POST",
        url: "http://localhost:8080/auth/register",
        data: $scope.usuario,
      };

      if ($scope.formRegistro.$valid) {
        $http(configuracao)
          .then(function (response) {
            $scope.mensagem = "Registro realizado com sucesso!";

            // redireciona para a pagina principal
            $location.path("/login");
          })
          .catch(function (error) {
            console.log(error);
            $scope.mensagem = "Não foi possível fazer o registro!";
          });
      }
    };
  });
