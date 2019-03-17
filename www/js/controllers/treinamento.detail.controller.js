controllersManager.controller('treinamentoDetailController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading, $ionicHistory) {

    $scope.trainings = [];
    $scope.treinamento = {};

    $scope.indicadores = {};

    $scope.retrieve = function () {

        // Salva o treinamento no LocalStorage
        var trainingJson = localStorage.getItem("training");
        
        $scope.training = JSON.parse(trainingJson);

        console.log($scope.training);
    }();

    $scope.renderUserEmployee = function() {
        // Recupera o tipo de usuario do LocalStorage
        var user = JSON.parse(localStorage.getItem("user"));
        
        if (user.typeUser == "employee") {
            return true;
        } else {
            return false;
        }
    };

    $scope.renderUserAppraiser = function() {
        // Recupera o tipo de usuario do LocalStorage
        var user = JSON.parse(localStorage.getItem("user"));
        
        if (user.typeUser == "appraiser") {
            return true;
        } else {
            return false;
        }
    };

    $scope.enviarNota = function(ratingPoints, idTraining) {

        var user = JSON.parse(localStorage.getItem("user"));
        var emailEmployee = user.email;

        var request = {
            method: 'POST',
			url: 'http://localhost:8080/rating/',
			data: 'idTraining=' + idTraining + '&emailEmployee=' + emailEmployee + '&points=' + ratingPoints,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
        }
        
        $http(request).then(function (response) {

            console.log($scope.treinamento);

            var alertPopup = $ionicPopup.alert({
                title: 'Sucess!',
                template: 'Avaliação Enviada com Sucesso!',
                buttons: [
                    {
                        text: "<b>OK!<b>",
                        type: 'button-positive',
                        onTap: function(e) {
                            // Não faz nada
                            // Para recarregar a pagina: location.reload();
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
            } else if (err.status == 304) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Você já enviou sua avaliação!'
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
                    template: 'Não foi possível enviar sua nota, por favor, tente novamente!'
                });
            }
        });

    }

    $scope.cadastrar = function () {
        
        var request = {
			method: 'POST',
			url: 'http://localhost:8080/training/',
			data: $scope.treinamento,
        }
        
        $http(request).then(function (response) {

            console.log($scope.treinamento);

            var alertPopup = $ionicPopup.alert({
                title: 'Sucess!',
                template: 'Treinamento cadastrado com sucesso!',
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
                    template: 'Não foi cadastrar este treinamento!'
                });
            }
        });
    }

    $scope.loadIndicators = function (idTraining) {
        
        var requestRating = {
			method: 'GET',
			url: 'http://localhost:8080/indicator/rating/' + idTraining,
        }

        var requestVacancy = {
			method: 'GET',
			url: 'http://localhost:8080/indicator/vacancy/' + idTraining,
        }
        
        $http(requestRating).then(function (response) {

            $scope.indicadores.rating = response.data.value;
            console.log("Rating Indicator : " + response.data.value);

            $http(requestVacancy).then(function (response) {

                $scope.indicadores.vacancy = response.data.value;
                console.log("Rating Indicator : " + response.data.value);
    
            }, function (err) {
                console.log(err.data);
                
                if (err.status == 500) {
                    //alerta de erro
                    var alertPopup = $ionicPopup.alert({
                        title: 'Erro!',
                        template: 'Servidor indisponível, tente novamente mais tarde'
                    });
                }
            });
        }, function (err) {
            console.log(err);
            console.log(err.data);
            
            if (err.status == 500) {
                //alerta de erro
                var alertPopup = $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Servidor indisponível, tente novamente mais tarde'
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

})