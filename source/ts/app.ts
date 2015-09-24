/// <reference path="../typings/angularjs/angular.d.ts" />

import {makeDirective, makeSelector} from './utils';
import {NgcAppComponent} from './components/main-component';
import {NgcMessageComponent} from './components/message-component';


angular.module('ngcourse', []) 
  .directive(
    makeSelector(NgcAppComponent), 
    makeDirective(NgcAppComponent))
  .directive(
    makeSelector(NgcMessageComponent), 
    makeDirective(NgcMessageComponent));

angular.element(document).ready(function() {
  angular.bootstrap(document, ['ngcourse']);
});
