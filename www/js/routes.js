angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

    .state('menu.home', {
      url: '/page1',
      views: {
        'side-menu21': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
  })

  .state('menu.cadastrar', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cadastrarTreinamento.html',
        controller: 'cartCtrl'
      }
    }
  })

  .state('menu.informacoes', {
    url: '/info',
    views: {
      'side-menu21': {
        templateUrl: 'templates/informacoes.html',
        controller: 'informaEsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginController'
  })

  .state('menu.detalhesTrainamento', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detalhesTrainamento.html',
        controller: 'detalhesTrainamentoCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')


});