controllersManager.controller('perguntaController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading, $ionicHistory) {

    $scope.treinamento = {};
    $scope.pergunta = {};
    $scope.pergunta.options = [];

    $scope.retrieve = function () {

        // Salva o treinamento no LocalStorage
        $scope.treinamento =  JSON.parse(localStorage.getItem("training"));

        $scope.perguntas = $scope.treinamento.questions;
        
        console.log($scope.perguntas);
    }();

    $scope.cadastrar = function () {
        
        var request = {
			method: 'POST',
			url: 'http://localhost:8080/question/' + $scope.treinamento.id,
			data: $scope.pergunta,
        }
        
        $http(request).then(function (response) {

            console.log($scope.pergunta);

            var alertPopup = $ionicPopup.alert({
                title: 'Sucess!',
                template: 'Pergunta cadastrada com sucesso!',
                buttons: [
                    {
                        text: "<b>OK!<b>",
                        type: 'button-positive',
                        onTap: function(e) {
                            // Recarrega a pagina
                            location.reload();
                        }
                    }
                ]
            });

        }, function (err) {
            console.log(err.data);
            
            if (err.status == 400) {
                //alerta de erro
                var alertPopup = $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Verifique os dados e tente novamente!'
                });
            } else if (err.status == 500) {
                //alerta de erro
                var alertPopup = $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Servidor indisponível, tente novamente mais tarde'
                });
            } else {
                //alerta de erro
                var alertPopup = $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Não foi salvar esta pergunta!'
                });
            }
        });
    }

    $scope.cadastrarPergunta = function (treinamentoId) {

        var request = {
            method: 'GET',
            url: 'http://localhost:8080/training/' + treinamentoId
        }

        $http(request)
        .then(function (response) {

            // Salva o treinameto no LocalStorage
            var data = angular.toJson(response.data);
            localStorage.setItem("training", data);
            
            console.log(response.data);

            // Redireciona para página inical
            $state.go('menu.cadastrarPergunta');

        }, function (err) {
            console.log(err.data);

            var alertPopup = $ionicPopup.alert({
                title: 'Erro!',
                template: 'Não foi possível recuperar os dados deste treinamento!'
            });
        });

    }

    $scope.renderPodeCadastrarPergunta = function() {

        data = $scope.treinamento.dateFinish.split("/");
        dataAcabou =  new Date(data[2], parseInt(data[1]) - 1, data[0]);

        return !(new Date() > dataAcabou);
    }

})