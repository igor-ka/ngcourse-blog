# Creating Angular 2 Style Components Using Angular 1 (Part II)

In the previous blog [post](http://blog.rangle.io/angular2-components/) we have shown how to create a simple Angular 2.0 "style" component using Angular 1.x and TypeScript. We did not focus too much on different component types that can be created when writing our applications. [Previously](http://blog.rangle.io/write-angular-2-style-code-now-typescript-decorators-components-and-flux-for-angular-1-x-applications/) we touched on different component type briefly, but the goal of this posts is to clarify and classify those types a little further and provide concrete [example](https://github.com/igor-ka/ngcourse-blog).

##Component Types

As I mentioned in the [previous post](http://blog.rangle.io/angular2-components/), we can view the structure of Angular 2.0 application as a tree of components, and that one of the design goals of Angular 2.0 is to bridge the gap between the framework and the Web Components standards.

### Web Components
Web Component standards aim to allow for creation of re-usable and interoperable web components that are easy to bring into different applications. The main point of those is to allow developers and designer to easily extend the existing DOM with new elements.

To get a better understanding of those ideas, let's start with a simple example of an existing HTML element.

```html
<input type="text" value="Kill Bill" onblur="someFunction()"/>
```

If we ignore the implicit simplicity of the markup above and look at it from a Web Component perspective, we can see some properties emerging.

First, this component can accept some inputs via the `type` and `value` attributes which modify how the component looks and behaves. The second part of this is defined by the `onblur` attribute above, that allows this component to emit events and output data. In essence, we can think of those properties as defining the "API" of the component. This allows us to pass data in to modify the behaviour of this component, and get data out and respond to the events emitted by this component.

Now, wouldn't it be cool if we could extend the DOM and define our own custom, re-usable elements?

```html
<my-cool-component cool-data="someData" on-cool-event="someCallback(dataOut)"/>
```

Now, I am not surprised if you are not impressed. Directives in Angular 1.x were doing this all along for Angular applications with [Ionic](http://ionicframework.com/) as the prime example of using those ideas to a great effect. Also, [Polymer](https://www.polymer-project.org/1.0/) is emerging as an interoperable option, especially popular with "designer types".

Those ideas are not new to a lot of us, but I believe that it is useful for our Angular 2 transition that we start taking those examples for what they are - different ways to emulate or create Web Components and extend the DOM.


## Top Level Components
Web components as defined above are great, however in reality your application will contain services/stores and other entities that define the business logic of your application. Those entities can be used to pass data to your web components using their API. However since everything is a component in Angular 2, those entities need to be structured within components as well. Here come our top level, controller components. Those components are not as easily re-usable outside of the context of a specific application, but are necessary to implement it.

## Example
We will implement 2 components, a `<ncg-message-list/>` top level component talking to a service and passing in data to `<ngc-message>` component instances.

Let's start with our `<ngc-message>` component which will accept a message be rendered, and will fire an event to return an upper case version of the message. This is the API of this little component defining it's inputs and outputs.

```javascript
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
    this.$log.info('NgcMessageComponent');
  }
  
  onMessageButtonClick() {
    this.onShowMessageEvent({
      data: this.message.toUpperCase()
    });
  }
}
```

Now lets define our top level component `<ncg-message-list>`. This component will iterate over the messages it gets from an injected service and pass them in as data into the `<ncg-message>` component. This component will also respond to an event emitted by the `<ncg-message>` with an alert of the message (the data) passed out of this component.

```javascript
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
```

Finally, here is our message service:

```javascript
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
```

I am leaving out the other files in this application here for brevity. The full source can be found [here](https://github.com/igor-ka/ngcourse-blog), and there are instructions on how to compile and run the app there.

## Application Architecture with Components
When designing your application it is useful to think what what types of component to write where. In short, it makes the most sense to start with top level components that work with services, stores (in case of Flux style architectures) and other entities of your applications. The main responsibility of your top level components is to gather and control the flow of information out of those entities, so sometimes they are also referred to as controller components. 

Top level components should build their view out of web components that are unaware of the rest of the application, and just get their inputs based on their "API". In a lot of cases, top level components fit nicely with routing, meaning that if you are routing to a view, generally it would make sense to back this view by a top level component.

It is important to note, that Web Components are "dumb" components from  the business logic perspective. Their primary concern is to provide the building blocks, that allow us to  create complex views for our applications in a modular and re-usable fashion. Having said that, those components can and will contain logic, and sometimes lots of it, but the difference is that this logic is only related UI this component backs.

Stay tuned for additional blogs in this series. Next time we will be discussing unidirectional data flow approaches in application design.

If you'd like to learn more, make sure to check out our [transitional architecture course](http://rangle.io/services/javascript-training/). 