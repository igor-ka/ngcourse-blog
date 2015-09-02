# Creating Angular 2 Style Components Using Angular 1: Part I

As Angular 2 looms in the horizon, it is easy to be overwhelmed by the upcoming transition. An important topic emerging for many developers is how to align existing applications, or write new ones, using Angular 1.x to ensure the transition is smooth, and to minimize refactoring when Angular 2 comes out. After all no one wants to write an application today that will be obsolete in a year.

## So what can we do?

Using Angular 2 for production grade application today is not practical. The API of the framework is changing frequently and not all of the framework's concepts are fully implemented or documented.

A more pragmatic approach is to develop applications using Angular 1.x with Angular 2 concepts and tooling in mind. For a good overview of our approach checkout our post on how to [Write Your Angular 1.x Applications in an Angular 2 Style](http://blog.rangle.io/write-angular-2-style-code-now-typescript-decorators-components-and-flux-for-angular-1-x-applications/).

## Structure your Application as a Tree of Components

Angular 2 is all about components and the two aspects worth discussing brienfly are the "whats" and the "whys".

### What is a Component in Angular 2.0?

Angular 2's components are conceptually similar to component directives from Angular 1.x. The structure of Angular 2 can be viewed as the tree of components, with a root element of that tree being the entry point of your application.

In summary, a component is an object that structures and represents a UI element. It consists of two parts, component controller in charge of view logic and component template representing the view. 

It is also worth noting that there is no `$scope` or `$watch` in Angular 2, so you should avoid them like fire. The good news is that if you were following the best practices and style guides, you should be on the right track.

### Why Components?

One of the ways to conceptualize Angular 1.x application is to view it as graph of scopes. Couple that with bi-directional data flow among those scopes and you have a complex application structure that is hard for developers to reason about. In addition, this approach poses perfromance challenges on the framework, maintaining the bindings within this graph during the digest cycles is more complicated and performance intensive as comprated to a tree of components.

An Angular 1.x application developer also had to face a constant dillema of what to use to add logic to the page in the form of directives vs. controllers. The choice becomes a lot simpler in Angular 2, components to add add logic with a view, and directive to add custom behaviour to existing elements.

Finally, the push to component based architecture aligns the framework with the future Web Component standards, which hopefully will extend the relevant life span of the framework and allow for less breaking changes in future releases.

## Develop with TypeScript

Angular 2 is written in TypeScript, and even though using is not a requirement as the framework can be used with ES5 and ES6, the syntax and the development tools that use TypeScript make Angular 2 development workflow shine.

TypeScript is an application scale language that fully aligns with the ECMA specification and provides a super set of it's features. The nature of the language allows for a great IDE support with Visual Code, Atom and Sublime, and awesome compile time error checking.

## Example

With the explanation above out of the way, let's look at a simple example of how we could architect our application today to align with the structure of Angular 2 components more closely. 

We will build a simple "Hello World" component using TypeScript, which is the only component in this example and is the root of our application. Our *app.ts* will look as follows.

```javascript
  /// <reference path="typings/angularjs/angular.d.ts" />

  import {Inject, makeDirective, makeSelector} from 'utils';

  class NgcAppComponent {

    public static selector = 'ngc-app';
    public static template = `<div>{{ ctrl.message }}</div>`;
    
    private message;
    
    constructor(@Inject('$log') private $log: angular.ILogService) {
      this.$log.info('Hello Component!');
      this.message = 'Some message to display';
    }
  }

  angular.module('ngcourse', []) 
    .directive(
      makeSelector(NgcAppComponent), 
      makeDirective(NgcAppComponent));

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['ngcourse']);
  });
```

In case you are wondering about `Inject`, `makeDirective` and `makeSelector`, they are just utility function we implemented to have a similar structure to Angular 2 application. There is nothing magical about them and the code for *utils.ts* is provided below for reference:

```javascript
  /// <reference path="typings/angularjs/angular.d.ts" />

  export function Inject(injectable) {
    return (prototype, method, argumentPosition) => {
      prototype.$inject = prototype.$inject || [];
      prototype.$inject[argumentPosition] = injectable;
    };
  }

  export function makeDirective(component) {
    return () => {

      let ddo = {
        restrict: 'E',
        scope: {},
        controllerAs: 'ctrl',
        bindToController: true,
        controller: component
      };

      if (component.template) {
        angular.extend(ddo, {
          template: component.template
        });
      }

      if (component.templateUrl) {
        angular.extend(ddo, {
          templateUrl: component.templateUrl
        });
      }
      
      if (component.options) {
        angular.extend(ddo, component.options);
      }
      
      return ddo;
    };
  }

  export function makeSelector(component) {
    return component.selector.replace(
      /-([a-z])/g,
      (g) => g[1].toUpperCase()
    );
  }
```

**Note:** *There are other projects out ther that provide similar functionality (and more) as our utils functions [a angular2-now](https://github.com/pbastowski/angular2-now) is a good example. However, we believe that the most important aspect is the structure of our code as opposed to direct mapping of a syntax since we will have to make changes either way. Also, Angular 1.5 is expected to be release with a component helper and a component base router to simplify transition conceptially.*

and finally our index.html

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
      System.defaultJSExtensions = true;
      System.import('app');
    </script>
  </body>
</html>
```

Let's compile our *app.ts* using the standard compiler for typescript `tsc app.ts --experimentalDecorators --module amd --target ES5` and serve this application. Also, you probably want to download the angular typings from the *Definetly Typed* repository using the `tsd` tool to make our compiler happy.

## Conclusions

There are many more things we can do to align our code with Angular 2  syntactically, structurally and conceptually.

This blog post is a starting point in a series of our thoughts at Rangle for a practical application architecture that will allow for an smooth transition to Angular 2. 

Stay tuned for the Part II of this post for a more in-depth explanation of our approach. In the next part we will focus on an example of a simple component tree, and talk about different component types.

Want to learn more advanced transition ready strategies for your applications, make sure to checkout our transitional architecture course! [need link here]
