import {Inject} from '../utils';
import {NgcMessageService} from '../services/message-service';

export class NgcMessageListComponent {

  public static selector = 'ngc-message-list';
  public static template = `
    <form>
      <input type="text" ng-model="ctrl.message"/>
      <button type="submit" ng-click="ctrl.addMessage(ctrl.message)">Add a message</button>
    </form>
    <ngc-message ng-repeat="message in ctrl.messages"
      message="message" 
      on-show-message-event="ctrl.alertMessage(data)">
    </ngc-mesage>  
    `;

  private message: String;
  
  constructor(
    @Inject('$log') private $log: angular.ILogService,
    @Inject('ngcMessageService') private ngcMessageService: NgcMessageService) {
      
    this.$log.info('NgcAppComponent');
  }
  
  get messages() {
    return this.ngcMessageService.messages;  
  }
  
  addMessage(message: String) {
    this.ngcMessageService.addMessage(message);
    this.message = '';  
  }
  
  alertMessage(data) {
    alert('The message is: ' + data);
  }
}
