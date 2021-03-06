import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import uiRouter from '@uirouter/angularjs';
import ngMap from 'ngmap';
import ImagesLoaded from 'imagesloaded/imagesloaded';
import 'angular-gettext/dist/angular-gettext';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import ngSanitize from 'angular-sanitize';
import tts from './common/tts';
import ga from 'angular-google-analytics';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    ngSanitize,
    ngMap,
    ngAnimate,
    tts,
    'gettext',
    ngTouch,
    ga
  ])
  .config(($locationProvider, AnalyticsProvider) => {
    "ngInject";
    ImagesLoaded.makeJQueryPlugin($);
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
    AnalyticsProvider.setAccount('UA-16102077-2');
    AnalyticsProvider
      .logAllCalls(true)
      .useDisplayFeatures(true)
      .useEnhancedLinkAttribution(true)
      .trackUrlParams(true)
      .trackPrefix('kiosk')
      .setPageEvent('$stateChangeSuccess')
  })
  .run(($transitions, expireService, languageFactory, Analytics) => {
    "ngInject";
    languageFactory.stop();
    expireService.restart();
    $transitions.onStart({}, trans => {
      languageFactory.stop();
      expireService.restart();
      trans.promise.catch(e => {
        trans.router.stateService.go('language');
      });
    });
  })
  .constant('wpUrl', '//gonetanya.com')
  .constant('mapsUrl', 'https://maps.google.com/maps/api/js?key=AIzaSyDHVHOiHjXhgl8Zz3GTwkZVgm8HCNRG3fc')
  .constant('homeCats', {
    news: 66,
    hotels: 13,
    holiday: 199,
    enjoying: 176,
    surroundings: 77
  })
  .component('app', AppComponent);
