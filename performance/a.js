// const aspect = require('../dist/aspect');
// const page = {
//     render: function render(num){
//         return 'render' + num;
//     }
// };
//
// function advice(jointPoint) {
//     jointPoint.setArg(0, 99);
// }
// const descriptor = {
//     value: page.render
// };
// aspect.Before(advice)(page, 'render', descriptor);
// page.render = descriptor.value;
// console.log(page.render(0));
// const result = proxy(0);
// console.log(result);


// const { beforeMethod } = require('kaop-ts');
//
// function advice(meta) {
//     meta.args[0] = 99;
// }
//
// const before = beforeMethod(advice);
//
// const page = {
//     render: function render(num){
//         return 'render' + num;
//     }
// };
//
// const { value } = before(page, 'render', {
//     value:  page.render
// });
// page.render = value;
//
// console.log( page.render(0) );


// const { afterMethod } = require('kaop-ts');
// const double = afterMethod(meta => meta.result *= 2);
//
// class DummyExample {
//     static calculateSomething (num, num2) {
//         return num * num2
//     }
// }
//
// function advice() {
//     console.log('advice');
// }
//
// const {value} = double(DummyExample, 'calculateSomething', {
//     value:  DummyExample.calculateSomething
// });
// DummyExample.calculateSomething = value;

// double(advice)(DummyExample, 'calculateSomething', {
//     value:  DummyExample.calculateSomething
// });

// DummyExample.calculateSomething = double(DummyExample, 'calculateSomething', {
//    value:  DummyExample.calculateSomething
// });

// console.log( DummyExample.calculateSomething(3, 3) );
// console.log( DummyExample.calculateSomething(5, 5) );



// const meld = require('./libs/meld');
//
// const page = {
//     render: function render(num){
//         return 'render' + num;
//     }
// };
//
// meld.before(page, 'render', function(num) {
//     console.log(num);
// });
// console.log(page.render(0));


// var twill = require('./libs/twill');
//
// var target = {
//     addTwelve: function (a) { return a + 12; }
// };
//
// function advice(weave) {
//     weave.before.addTwelve(function (a) {
//         // console.log("the value passed in was: " + a);
//     });
// }
//
// twill.aspect(target, advice);
//
// console.log(target.addTwelve(1))


// const uaop = require('./libs/uaop');
// function render(num) {
//     return 'render' + num;
// }
//
// const proxy = uaop.before(render, function () {
//     // console.log('arguments length:', arguments.length);
//     // console.log(joinPoint);
//     // joinPoint.args[0] = 99;
//     // arguments[0] = 99;
//     // console.log();
//     return [99];
// });
//
// console.log(proxy(0));
// log:
// arguments length: 3
// functionToAdvise exec
// advisedFunction(1, 2, 3);
// const page = {
//     render: function render(num){
//         return 'render' + num;
//     }
// };
//
// const jsAspect = require('./libs/jsaspect');
// var afterAdvice =  new jsAspect.Advice.After(function() {
//     console.log("joinPoint", "after");
// });
// var beforeAdvice = new jsAspect.Advice.Before(function() {
//     console.log("joinPoint", "before");
// });
//
// var aspect = new jsAspect.Aspect(beforeAdvice,  afterAdvice);
//
// jsAspect.before(page, function(context) {
//     context.method.arguments[0] = 99;
// }, jsAspect.SCOPE.METHODS);
//
// console.log(page.render(0));

// aspect.applyTo(page);
//
// console.log(page.render(0));

// const AOP = require('./libs/aop');
// function advice(target, args) {
//     args[0] = 99;
// }
// const proxy = AOP.aspect(render).before(advice);
// const result = proxy(0);
// console.log(result);

// const aspect = require('../dist/aspect');
// function advice(jointPoint) {
//     jointPoint.setArg(0, 99);
// }
// const proxy = aspect.beforeMethod(render, advice);
// const result = proxy(0);
// console.log(result);
