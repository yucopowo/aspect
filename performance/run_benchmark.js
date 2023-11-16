require('./before');

// const suite = require('./aspect');
// suite
// .on('cycle', function(event) {
//     console.log(String(event.target));
// })
// .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// .run({ 'async': true });

// const Benchmark = require('benchmark');
// const suite = new Benchmark.Suite;
// const aspect = require('../dist/aspect');

// const suites = require('./aspect');

// const { before, after, afterRunning, around } = aspect;
// add tests
// suite
//     .add('basic', function() {
//
//     })
//     .add('render', function() {
//         const page = {
//             render(num) {
//                 return 'render' + num;
//             }
//         };
//         page.render(0);
//     })
//     .add('before advice', function() {
//         const page = {
//             render(num) {
//                 return 'render' + num;
//             }
//         };
//         before(page, 'render', function (jointPoint) {
//             // jointPoint.setArg(0, 99);
//         });
//         page.render(0);
//     })
//     .add('after advice', function() {
//         const page = {
//             render(num) {
//                 return 'render' + num;
//             }
//         };
//         after(page, 'render', function (jointPoint) {
//
//         });
//         page.render(0);
//     })
//     .add('afterRunning advice', function() {
//         const page = {
//             render(num) {
//                 return 'render' + num;
//             }
//         };
//         afterRunning(page, 'render', function (jointPoint) {
//
//         });
//         page.render(0);
//     })
//     .add('around advice', function() {
//         const page = {
//             render(num) {
//                 return 'render' + num;
//             }
//         };
//         around(page, 'render', function (jointPoint) {
//             return jointPoint.proceed();
//         });
//         page.render(0);
//     })
//     // .add('String#indexOf', function() {
//     //     'Hello World!'.indexOf('o') > -1;
//     // })
//     // add listeners
//     .on('cycle', function(event) {
//         console.log(String(event.target));
//     })
//     .on('complete', function() {
//         console.log('Fastest is ' + this.filter('fastest').map('name'));
//     })
//     // run async
//     .run({ 'async': true });
