controllersManager.controller('respostaController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading, $ionicHistory) {

    $scope.perguntas = [];
    $scope.respostas = [];

    $scope.retrieve = function () {

        // Recupera o usuario do LocalStorage
        var userJson = localStorage.getItem("user");

        $scope.usuario = JSON.parse(userJson);

        // Recupera o treinamento do LocalStorage
        var trainingJson = localStorage.getItem("training");
        
        $scope.treinamento = JSON.parse(trainingJson);

        $scope.perguntas = $scope.treinamento.questions;

        console.log($scope.perguntas);
    }();

    $scope.enviarRespostas = function () {
        
        var request = {
			method: 'POST',
			url: 'http://localhost:8080/response/list',
			data: $scope.respostas,
        }

        // Define os atributos de idQuestion e emailEmployee
        $scope.respostas.forEach(function(element, index, array) {
            if(element != null) {
                element.idQuestion = index;
                element.emailEmployee = $scope.usuario.email;
            }
        });

        // Remove itens vazios
        $scope.respostas = $scope.respostas.filter(function (element) {
            return element != null;
        });

        console.log($scope.respostas);
        
        $http(request).then(function (response) {

            console.log("Sucesso");

            var alertPopup = $ionicPopup.alert({
                title: 'Sucess!',
                template: 'Respostas enviadas com sucesso!',
                buttons: [
                    {
                        text: "<b>OK!<b>",
                        type: 'button-positive',
                        onTap: function(e) {
                            // Volta para a pagina do treinamento
                            window.history.back();

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