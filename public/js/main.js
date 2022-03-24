angular
  .module("cadastroDeClientes", ["ngRoute", "ngAnimate", "ngResource"])
  .config(function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $routeProvider.when("/login", {
      templateUrl: "partials/login.html",
      controller: "LoginController",
    });

    $routeProvider.when("/registro", {
      templateUrl: "partials/registro.html",
      controller: "RegistroController",
    });

    var token = localStorage.getItem("token");

    // ROTAS PRIVADAS
    if (token) {
      $routeProvider.when("/clientes", {
        templateUrl: "partials/cliente.html",
        controller: "ClienteController",
      });
    }

    $routeProvider.otherwise({ redirectTo: "/login" });
  });
