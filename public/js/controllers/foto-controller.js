angular
  .module("cadastroDeClientes")
  .controller(
    "FotoController",
    function ($scope, $http, $location, $routeParams) {
      $scope.foto = {};
      $scope.mensagem = "";


      // EDIT
      if ($routeParams.fotoId) {
        $http.get("v1/fotos/" + $routeParams.fotoId).then(function (retorno) {
          $scope.foto = retorno.data;
        });

        $scope.submeter = function () {
          $http
            .put("v1/fotos/" + $routeParams.fotoId, $scope.foto)
            .then(function () {
              $scope.mensagem = "Foto alterada com sucesso!";

              //$location.path("/fotos");

            });
        };
        
        
      // NEW
      } else {
        $scope.submeter = function () {
          var configuracao = {
            method: "POST",
            url: "v1/fotos",
            data: $scope.foto,
          };

          if ($scope.formulario.$valid) {
            $http(configuracao)
              .then(function () {
                $scope.foto = {};
                $scope.mensagem = "Foto cadastrada com sucesso!";

                // redireciona para a pagina principal

                $location.path("/fotos");

                console.log("aquii");
              })
              .catch(function (error) {
                console.log(error);
                $scope.mensagem = "Não foi possível cadastrar a foto!";
              });
          }
        };
      }
    }
  );
