# Introduction

As Angular 2 is looming over the horizon and everyone is getting excited an important topic comes up in the mind of many developers in the industry. What can we do today to align our existing applications or write new ones using Angular 1.x to ensure an easier transition to Angular 2 when it comes out.

Using Angular 2 for production grade application today is not practical. The API of the framework is changing frequently and not all of the framework's concepts are fully implemented or documented.

## So what can we do?

A more pragmatic approach is to develop applications using Angular 1.x with Angular 2 concepts and tooling in mind.

## Components

Angular 2 is all about components. But what is a component really?

Angular 2's components are conceptually similar to component directives from Angular 1.x. The structure of Angular 2 application can be viewed as the tree of components, with a root element of that tree being the entry point of your application.

In summary, component is an object that structures and represents a UI element. It consists of two parts, component controller in charge of view logic and component template representing the view.

## Use TypeScript

Angular 2 is written in TypeScript, and even though using is is not a requirement as the framework can be used with ES5 and ES6, the syntaxt and the development tools that use TypeScript really does make Angular 2 shine.

TypeScript is an application scale language that fully aligns with the ECMA specification and provides a super set of it's features. The nature of the language allows for a great IDE support with Visual Code, Atom and Sublime, and awesome compile time error checking.

## Example

Let's build a simple "Hello World" component using TypeScript. Our *app.ts* will look as follows.

```javascript
class NgcAppComponent {

  public static $inject = ['$log'];
  public static template = `<div>{{ ctrl.message }}</div>`;
  
  private message;
  
  constructor(private $log) {
    $log.info('Hello Component!');
    this.message = 'Some message to display';
  }
}

angular.module('ngcourse', []) 
  .directive(
    'ngcApp', 
    () => ({
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: {},
      controller: NgcAppComponent,
      template: NgcAppComponent.template
    }));

angular.element(document).ready(function() {
  angular.bootstrap(document, ['ngcourse']);
});
```

and our index.html

```html
<!DOCTYPE html>
<html>

  <body>
    <div>
      <ngc-app></ngc-app>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.18.4/system.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular.js"></script>
    <script>
      System.import('app.js');
    </script>
  </body>
</html>
```

Let's compile our *app.ts* using the standard compiler for typescript `tsc` and serve this application. Kepp in mind that you probably want to download the angular typings from the *Definetly Typed* repository using the `tsd` tool, and reference it within your *app.ts* file.

## Conclusions

There are many more things we can do to align our code with Angular 2  syntactically, structurally and conceptually. We can easily implement utility function or decorators for component definitions, dependency injections, break our code into ES6 modules, write unit-test using Type Script etc. but this is a good starting point. 

Want to learn more advanced transition ready strategies for your applications, make sure to checkout our transitional architecture course! [need link here]
