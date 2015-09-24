import {Inject} from '../utils';

export class NgcAppComponent {

  public static selector = 'ngc-app';
  public static template = `
    <form>
      <input type="text" ng-model="ctrl.message"/>
      <button type="submit" ng-click="ctrl.addMessage()">Add a message</button>
    </form>
    <ngc-message ng-repeat="message in ctrl.messages"
      message="message" 
      on-show-message-event="ctrl.alertMessage(message)">
    </ngc-mesage>  
    `;

  private messages: Array<String>;
  private message: String;
  
  constructor(@Inject('$log') private $log: angular.ILogService) {
    this.$log.info('Hello Component!');
    this.messages = new Array<String>();
    this.message = '';
  }
  
  addMessage() {
    this.messages.push(this.message);
    this.message = '';  
  }
  
  alertMessage(message) {
    alert('The message is: ' + message);
  }
}
