angular
  .module("cadastroDeClientes")
  .controller("ClienteController", function ($scope, $http) {
    var token = localStorage.getItem("token");

    $scope.clientes = [];
    $scope.telefones = [];
    $scope.enderecos = [];
    $scope.cliente_id = 0;

    $scope.mensagem = "";

    // CLIENTES
    var getCliente = $http.get("http://localhost:8080/clientes/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    getCliente
      .then(function (retorno) {
        $scope.clientes = retorno.data;
        console.log(retorno.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    $scope.abrirModalAddClientes = function () {
      $("#modalAddClientes").modal("show");
    };

    $scope.addCliente = function () {
      var dadosCliente = {
        nome: $scope.nome,
        numDocumento: "11",
        tipoPessoa: $scope.tipoPessoa,
      };

      console.log(dadosCliente);

      var adicionaCliente = $http.post(
        `http://localhost:8080/clientes`,
        dadosCliente,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      adicionaCliente
        .then(function (retorno) {
          $scope.clientes.push(retorno.data);
          $scope.mensagem = "Cliente adicionado com sucesso!";
          $("#modalAddClientes").modal("hide");
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // TELEFONES
    $scope.abrirModalTelefones = function (cliente_id) {
      $("#modalTelefones").modal("show");

      $scope.cliente_id = cliente_id;

      var getTelefones = $http.get(
        `http://localhost:8080/telefones/${cliente_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      getTelefones
        .then(function (retorno) {
          $scope.telefones = retorno.data;
          console.log(retorno.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.abrirModalEnderecos = function (cliente_id) {
      $("#modalEnderecos").modal("show");

      $scope.cliente_id = cliente_id;

      var getEnderecos = $http.get(
        `http://localhost:8080/enderecos/${cliente_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      getEnderecos
        .then(function (retorno) {
          $scope.enderecos = retorno.data;
          console.log(retorno.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // ADICIONAR TELEFONE
    $scope.adicionarTelefone = function (cliente_id) {
      var telefone = {
        numero: $scope.telefone,
      };

      var adicionarTelefone = $http.post(
        `http://localhost:8080/telefones/${cliente_id}`,
        telefone,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      adicionarTelefone
        .then(function (retorno) {
          $scope.telefones.push(retorno.data);
          $scope.numero = "";
          //$("#modalTelefones").modal("hide");
          console.log(retorno.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // ADICIONAR ENDEREÇO
    $scope.adicionarEndereco = function (cliente_id) {
      var endereco = {
        rua: $scope.rua,
        numero: $scope.numero,
        bairro: $scope.bairro,
        cidade: $scope.cidade,
        principal: $scope.principal,
      };

      console.log($scope.rua);

      var adicionarEndereco = $http.post(
        `http://localhost:8080/enderecos/${cliente_id}`,
        endereco,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      adicionarEndereco
        .then(function (retorno) {
          $scope.enderecos.push(retorno.data);
          $scope.rua = "";
          $scope.numero = "";
          $scope.bairro = "";
          $scope.cidade = "";
          $scope.principal = "";
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // DELETAR ENDERECO
    $scope.removerEndereco = function (endereco_id) {
      var removerEndereco = $http.delete(
        `http://localhost:8080/enderecos/${endereco_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      removerEndereco
        .then(function (retorno) {
          console.log(retorno.data);

          var newEnderecos = $scope.enderecos.filter(function (endereco) {
            return endereco.id != endereco_id;
          });

          $scope.enderecos = newEnderecos;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // REMOVER TELEFONE
    $scope.removerTelefone = function (telefone_id) {
      var removerTelefone = $http.delete(
        `http://localhost:8080/telefones/${telefone_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      removerTelefone
        .then(function () {
          var newTelefones = $scope.telefones.filter(function (telefone) {
            return telefone.id != telefone_id;
          });

          $scope.telefones = newTelefones;

          $scope.mensagem = "Telefone removido com sucesso!";
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    $scope.aplicarMascaraCpf = function (cpf) {
      cpf = cpf.replace(/\D/g, "");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      return cpf;
    };

    $scope.aplicarMascaraCnpj = function (cnpj) {
      cnpj = cnpj.replace(/\D/g, "");
      cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
      cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
      return cnpj;
    };

    $scope.aplicarMascaraTelefone = function (telefone) {
      telefone = telefone.replace(/\D/g, "");
      telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
      telefone = telefone.replace(/(\d{4})(\d)/, "$1-$2");
      return telefone;
    };
  });
