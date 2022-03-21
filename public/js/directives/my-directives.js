angular.module("minhasDiretivas", []).directive("meuPainel", function () {
  // diretiva de escopo
  // directiv definition object
  var ddo = {};

  ddo.restrict = "AE";
  // permite que exista elementos filhos na diretiva
  ddo.transclude = true;

  // atributos da diretiva
  ddo.scope = {
    titulo: "@",
  };

  ddo.templateUrl = "js/directives/meu-painel.html";

  return ddo;
});
