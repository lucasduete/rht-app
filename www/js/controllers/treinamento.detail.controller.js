controllersManager.controller('treinamentoDetailController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading) {

    $scope.trainings = [];

    $scope.retrieve = function () {

        // Salva o treinameto no LocalStorage
        var trainingJson = localStorage.getItem("training");
        
        $scope.training = JSON.parse(trainingJson);

        console.log($scope.training);
    }();

    $scope.cadastrar = function (treinameto) {
        
        var request = {
			method: 'POST',
			url: 'http://localhost:8080/training/',
			data: treinameto,
        }
        
        $http(request).then(function (response) {
    
            var alertPopup = $ionicPopup.alert({
                title: 'Sucess!',
                template: 'Treinamento cadastrado com sucesso!'
            });

            // Redireciona para página inical
			$state.go('menu.home');
    
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

})