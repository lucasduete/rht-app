controllersManager.controller('treinamentoController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading) {

    $scope.trainings = [];

    var request = {
        method: 'GET',
        url: 'http://localhost:8080/training/',
    }

    $http(request).then(function (response) {

        // Atualiza os treinamentos no escopo
        $scope.trainings = response.data;
        
        // Salva os treinametos no LocalStorage
        var data = angular.toJson($scope.trainings);
        localStorage.setItem("trainings", data);

        console.log(response.data);

    }, function (err) {
        console.log(err.data);
        
        if (err.status == 401) {
            //alerta de erro
            var alertPopup = $ionicPopup.alert({
                title: 'Erro!',
                template: 'Login ou senha inválida!'
            });
        } else if (err.status == 400) {
            //alerta de erro
            var alertPopup = $ionicPopup.alert({
                title: 'Erro!',
                template: 'Campo em branco, informe o login e a senha!'
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
                template: 'Não foi possível efetuar o login!'
            });
        }
    });

    // todo
    $scope.abrir = function (treinamentoId) {
        // Redireciona para página inical
		$state.go('menu.detalhesTreinamento');
    }

})