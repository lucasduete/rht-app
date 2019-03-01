controllersManager.controller('loginController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading) {

    $scope.aluno = [];
	$scope.loginUsuario = function (credenciais) {

		var request = {
			method: 'POST',
			url: 'http://localhost:8080/appraiser/login',
			data: 'login=' + credenciais.login + '&senha=' + credenciais.senha,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		$http(request).then(function (response) {

			//salvando no localStorage
			$scope.aluno = response.data;
			var dados = angular.toJson($scope.aluno);
			localStorage.setItem("aluno", dados);

            console.log(response.data);
            
			//indo pra pagina inicial
			$state.go('menu.home');

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
	}

})