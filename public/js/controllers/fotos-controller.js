angular
  .module("cadastroDeClientes")
  .controller("FotosController", function ($scope, $http) {
    $scope.fotos = [];
    $scope.filtros = "";
    $scope.mensagem = "";

    var getFotos = $http.get("v1/fotos");

    getFotos
      .then(function (retorno) {
        $scope.fotos = retorno.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.remover = function (foto) {
      $http
        .delete("v1/fotos/" + foto._id)
        .then(function () {
          var indiceFoto = $scope.fotos.indexOf(foto);
          $scope.fotos.splice(indiceFoto, 1);
          $scope.mensagem = "Foto removida com sucesso!";
        })
        .catch(function (error) {
          console.log(error);
          $scope.mensagem = "Não foi possível remover a foto!";
        });
    };
  });
