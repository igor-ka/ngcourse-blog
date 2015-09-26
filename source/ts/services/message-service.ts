import {Inject} from '../utils';

export class NgcMessageService {
  
  private _messages: Array<String>;
  
  constructor(@Inject('$log') private $log: angular.ILogService) {
    this.$log.info('NgcMessageService');
    
    this._messages = new Array<String>();
  }
  
  get messages() {
    return this._messages;
  }
  
  addMessage(message: String) {
    this._messages.push(message);
  }
}
