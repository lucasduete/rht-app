controllersManager.controller('loginController', function ($scope, $rootScope, $http, $state, $ionicPopup, $ionicLoading) {

    $scope.user = {};
	$scope.login = function (credenciais) {

		var requestLoginAppraiser = {
			method: 'POST',
			url: 'http://localhost:8080/appraiser/login',
			data: 'email=' + credenciais.email + '&password=' + credenciais.senha,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		var requestLoginEmployee = {
			method: 'POST',
			url: 'http://localhost:8080/employee/login',
			data: 'email=' + credenciais.email + '&password=' + credenciais.senha,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		$http(requestLoginAppraiser).then(function (response) {

			// Atualiza usuario e tipo de usuario no escopo
			$scope.user = response.data;
			$scope.typeUser = "appraiser";
			
			// Salva usuario no LocalStorage
			var data = angular.toJson($scope.aluno);
			localStorage.setItem("user", data);

            console.log(response.data);
            
			// Redireciona para página inical
			$state.go('menu.home');

		}, function (err) {
			console.log(err.data);
			
			if (err.status == 401) {
				
				$http(requestLoginEmployee).then(function (response) {

					// Atualiza usuario e tipo de usuario no escopo
					$scope.user = response.data;
					$scope.typeUser = "employee";
					
					// Salva usuario no LocalStorage
					var data = angular.toJson($scope.aluno);
					localStorage.setItem("user", data);
		
					console.log(response.data);
					
					// Redireciona para página inical
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