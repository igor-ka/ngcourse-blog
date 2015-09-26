import {makeDirective, makeSelector} from './utils';
import {NgcMessageListComponent} from './components/message-list-component';
import {NgcMessageComponent} from './components/message-component';
import {NgcMessageService} from './services/message-service';

angular.module('ngcourse', []) 
  .directive(
    makeSelector(NgcMessageListComponent), 
    makeDirective(NgcMessageListComponent))
  .directive(
    makeSelector(NgcMessageComponent), 
    makeDirective(NgcMessageComponent))
  .service('ngcMessageService', NgcMessageService);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['ngcourse']);
});
