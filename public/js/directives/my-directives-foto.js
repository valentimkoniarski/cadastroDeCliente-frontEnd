angular
  .module("minhasDiretivasFoto", [])

  .directive("minhaFoto", function () {
    // diretiva de escopo
    // directiv definition object
    var ddo = {};

    ddo.restrict = "AE";
    // permite que exista elementos filhos na diretiva
    ddo.transclude = true;

    // atributos da diretiva
    ddo.scope = {
      titulo: "@titulo",
      url: "@url",
    };

    ddo.template =
      "<img class='img-responsive center-block' ng-src='{{url}}' >";

    return ddo;
  })

  .directive("meuBotaoPerigo", function () {
    // diretiva de escopo
    // directiv definition object
    var ddo = {};

    ddo.restrict = "E";
    // permite que exista elementos filhos na diretiva

    // atributos da diretiva
    ddo.scope = {
      nome: "@nome",
      acao: "&acao", // & = funcao
    };

    ddo.template =
      "<button class='btn btn-danger btn-block' ng-click='acao()'>{{nome}}</button>";
    return ddo;
  });
