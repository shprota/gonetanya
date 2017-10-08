import angular from 'angular';
import uiRouter from 'angular-ui-router';
import languageComponent from './language.component';

let languageModule = angular.module('language', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('language', {
      url: '/',
      component: 'language'
    });
})
.component('language', languageComponent)

.name;

export default languageModule;
