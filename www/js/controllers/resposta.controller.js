controllersManager.controller('respostaController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading, $ionicHistory) {

    $scope.perguntas = [];
    $scope.respostas = [];

    $scope.retrieve = function () {

        // Salva o treinamento no LocalStorage
        var trainingJson = localStorage.getItem("training");
        
        treinamento = JSON.parse(trainingJson);

        $scope.perguntas = treinamento.questions;

        console.log($scope.perguntas);
    }();

    $scope.enviarRespostas = function () {
        
        var request = {
			method: 'POST',
			url: 'http://localhost:8080/question/' + $scope.treinamento.id,
			data: $scope.respostas,
        }
        
        $http(request).then(function (response) {

            console.log($scope.pergunta);

            var alertPopup = $ionicPopup.alert({
                title: 'Sucess!',
                template: 'Respostas enviadas com sucesso!',
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
                    template: 'Não foi enviar suas respostas!'
                });
            }
        });
    }

})