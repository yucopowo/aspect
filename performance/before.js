const Benchmark = require('benchmark');
const AOP = require('./libs/aop');
const aspect = require('../dist/aspect');
const jsAspect = require('./libs/jsaspect');
const uaop = require('./libs/uaop');
const twill = require('./libs/twill');
const aspect2 = require('./libs/aspect2');
const meld = require('./libs/meld');
const kaop = require('kaop-ts');

const suite = new Benchmark.Suite('aspect');
suite
    .add('aspect:before', function() {
        function render(num) {
            return 'render' + num;
        }
        function advice(jointPoint) {
            jointPoint.setArg(0, 99);
        }
        const proxy = aspect.beforeMethod(render, advice);
        proxy(0);
    })
    .add('meld:before', function() {
        const page = {
            render: function render(num){
                return 'render' + num;
            }
        };
        meld.before(page, 'render', function(num) {
        });
        page.render(0);
    })
    .add('aspect:before decorator', function() {
        const page = {
            render: function render(num){
                return 'render' + num;
            }
        };

        function advice(jointPoint) {
            jointPoint.setArg(0, 99);
        }
        const descriptor = {
            value: page.render
        };
        aspect.Before(advice)(page, 'render', descriptor);
        page.render = descriptor.value;
        page.render(0);
    })
    .add('kaop:before decorator', function() {
        const page = {
            render: function render(num){
                return 'render' + num;
            }
        };

        function advice(meta) {
            meta.args[0] = 99;
        }

        const before = kaop.beforeMethod(advice);

        const { value } = before(page, 'render', {
            value:  page.render
        });
        page.render = value;

        page.render(0);
    })
    .add('AOP:before', function() {
        function render(num) {
            return 'render' + num;
        }
        function advice(target, args) {
            args[0] = 99;
        }
        const proxy = AOP.aspect(render).before(advice);
        proxy(0);
    })
    .add('jsAspect:before', function() {
        const page = {
            render: function render(num){
                return 'render' + num;
            }
        };
        function advice(context) {
            context.method.arguments[0] = 99;
        }
        jsAspect.before(page, advice, jsAspect.SCOPE.METHODS);
        page.render(0);
    })
    .add('uaop:before', function() {
        function render(num){
            return 'render' + num;
        }
        function advice() {

        }
        const proxy = uaop.before(render, advice);
        proxy(0);
    })
    .add('twill:before', function() {
        const page = {
            render: function render(num){
                return 'render' + num;
            }
        };
        function advice(weave) {
            weave.before.render(function (num) {
                // console.log("the value passed in was: " + a);
            });
        }

        twill.aspect(page, advice);

        page.render(0);
    })
    .add('aspect2:before', function() {
        const page = {
            render: function render(num){
                return 'render' + num;
            }
        };

        aspect.before(page, 'render', function (num) {

        });
        page.render(0);
    })
// .add('before advice', function() {
//     const page = {
//         render(num) {
//             return 'render' + num;
//         }
//     };
//     before(page, 'render', function (jointPoint) {
//         // jointPoint.setArg(0, 99);
//     });
//     page.render(0);
// })
// .add('after advice', function() {
//     const page = {
//         render(num) {
//             return 'render' + num;
//         }
//     };
//     after(page, 'render', function (jointPoint) {
//
//     });
//     page.render(0);
// })
// .add('afterRunning advice', function() {
//     const page = {
//         render(num) {
//             return 'render' + num;
//         }
//     };
//     afterRunning(page, 'render', function (jointPoint) {
//
//     });
//     page.render(0);
// })
// .add('around advice', function() {
//     const page = {
//         render(num) {
//             return 'render' + num;
//         }
//     };
//     around(page, 'render', function (jointPoint) {
//         return jointPoint.proceed();
//     });
//     page.render(0);
// })
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });

