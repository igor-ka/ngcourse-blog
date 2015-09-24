import {Inject} from '../utils';

export class NgcMessageComponent {

  public static selector = 'ngc-message';
  private static options = {
    bindToController: {
      message: '=',
      onShowMessageEvent: '&'
    }
  };
  
  public static template = `
    <div>{{ ctrl.message }}</div>
    <button ng-click="ctrl.onMessageButtonClick()">emit message</button>
    `;

  private message: String;
  private onShowMessageEvent: Function;

  constructor(@Inject('$log') private $log: angular.ILogService) {
    this.$log.info(':NgcMessageComponent:');
  }
  
  onMessageButtonClick() {
    this.onShowMessageEvent({
      message: this.message
    });
  }
}
