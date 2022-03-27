angular
  .module("cadastroDeClientes")
  .controller("LoginController", function ($scope, $http, $location) {
    $scope.foto = {};
    $scope.mensagem = "";

    $scope.usuario = {
      email: $scope.email,
      senha: $scope.senha,
    };

    $scope.autenticar = function () {
      var configuracao = {
        method: "POST",
        url: "http://localhost:8080/auth",
        data: $scope.usuario,
      };

      if ($scope.formLogin.$valid) {
        $http(configuracao)
          .then(function (response) {
            $scope.mensagem = "Login realizado com sucesso!";

            console.log(response);

            // salva o token no localstorage
            localStorage.setItem("token", response.data.token);

            // redireciona para a pagina principal
            $location.path("/#/clientes");
          })
          .catch(function (error) {
            console.log(error);
            $scope.mensagem = "Não foi possível fazer o login!";
          });
      }
    };
  });
