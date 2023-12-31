!function (host) {
    function joinPointName(joinPointId) {
        return joinPointId.toLowerCase().replace(/_[a-z]/, function (match) {
            return match[1].toUpperCase()
        })
    }

    function injectAdvice(target, methodName, advice, joinPoint) {
        isFunction(target[methodName]) && (jsAspect.JOIN_POINT.AROUND === joinPoint && (advice = wrapAroundAdvice(advice)), target[methodName][adviceEnhancedFlagName] || (enhanceWithAdvices(target, methodName), target[methodName][adviceEnhancedFlagName] = !0), target[methodName][joinPoint].unshift(advice))
    }

    function wrapAroundAdvice(advice) {
        var wrappedAdvice = function (executionContext, leftAroundAdvices) {
            var oThis = this, nextWrappedAdvice = leftAroundAdvices.shift(), args = toArray(arguments).slice(2);
            if (!executionContext.isStopped) {
                if (nextWrappedAdvice) {
                    var nextUnwrappedAdvice = function () {
                        var argsForWrapped = toArray(arguments);
                        return argsForWrapped.unshift(leftAroundAdvices), argsForWrapped.unshift(executionContext), nextWrappedAdvice.apply(oThis, argsForWrapped)
                    };
                    args.unshift(nextUnwrappedAdvice)
                }
                return advice.originalMethodFlagName || args.unshift(executionContext), advice.apply(this, args)
            }
        };
        return wrappedAdvice.__originalAdvice = advice, wrappedAdvice
    }

    function enhanceWithAdvices(target, methodName) {
        var originalMethod = target[methodName];
        originalMethod.originalMethodFlagName = !0, target[methodName] = function () {
            var returnValue, self = this, method = target[methodName], args = toArray(arguments),
                executionContext = new ExecutionContext(target, methodName, args);
            applyBeforeAdvices(self, method, args, executionContext);
            try {
                returnValue = applyAroundAdvices(self, method, args, executionContext)
            } catch (exception) {
                throw applyAfterThrowingAdvices(self, method, exception, executionContext), exception
            }
            return applyAfterAdvices(self, method, args, executionContext), applyAfterReturningAdvices(self, method, returnValue, executionContext)
        };
        for (var join_point in jsAspect.JOIN_POINT) target[methodName][jsAspect.JOIN_POINT[join_point]] = [];
        target[methodName][jsAspect.JOIN_POINT.AROUND].unshift(wrapAroundAdvice(originalMethod))
    }

    function applyBeforeAdvices(context, method, args, executionContext) {
        applyIndependentAdvices(method[jsAspect.JOIN_POINT.BEFORE], context, method, args, executionContext)
    }

    function applyAroundAdvices(context, method, args, executionContext) {
        var aroundAdvices = toArray(method[jsAspect.JOIN_POINT.AROUND]), firstAroundAdvice = aroundAdvices.shift(),
            argsForAroundAdvicesChain = args.slice();
        return argsForAroundAdvicesChain.unshift(aroundAdvices), argsForAroundAdvicesChain.unshift(executionContext), firstAroundAdvice.apply(context, argsForAroundAdvicesChain)
    }

    function applyAfterThrowingAdvices(context, method, exception, executionContext) {
        applyIndependentAdvices(method[jsAspect.JOIN_POINT.AFTER_THROWING], context, method, [exception], executionContext)
    }

    function applyAfterAdvices(context, method, args, executionContext) {
        applyIndependentAdvices(method[jsAspect.JOIN_POINT.AFTER], context, method, args, executionContext)
    }

    function applyAfterReturningAdvices(context, method, returnValue, executionContext) {
        var afterReturningAdvices = method[jsAspect.JOIN_POINT.AFTER_RETURNING];
        return afterReturningAdvices.reduce(function (acc, current) {
            return executionContext.isStopped ? void 0 : current(executionContext, acc)
        }, returnValue)
    }

    function applyIndependentAdvices(advices, context, method, args, executionContext) {
        advices.forEach(function (advice) {
            var adviceArguments = args.slice();
            adviceArguments.unshift(executionContext), executionContext.isStopped || advice.apply(context, adviceArguments)
        })
    }

    function ExecutionContext(target, methodName, args) {
        this.target = target, this.method = {
            name: methodName,
            arguments: args
        }, this.isStopped = !1, void 0 === this.target.constructor.name && (this.target.constructor.name = functionName(this.target.constructor))
    }

    function Advice(joinPoint, func, scope) {
        this.joinPoint = joinPoint, this.func = func, this.pointcut = null, scope && this.withPointcut(scope)
    }

    function Before(func, scope) {
        Advice.call(this, jsAspect.JOIN_POINT.BEFORE, func, scope)
    }

    function After(func, scope) {
        Advice.call(this, jsAspect.JOIN_POINT.AFTER, func, scope)
    }

    function AfterReturning(func, scope) {
        Advice.call(this, jsAspect.JOIN_POINT.AFTER_RETURNING, func, scope)
    }

    function AfterThrowing(func, scope) {
        Advice.call(this, jsAspect.JOIN_POINT.AFTER_THROWING, func, scope)
    }

    function Around(func, scope) {
        Advice.call(this, jsAspect.JOIN_POINT.AROUND, func, scope)
    }

    function Pointcut(scope, methodRegex) {
        this.scope = scope, this.methodRegex = methodRegex
    }

    function Aspect(advices) {
        this.advices = advices instanceof Array ? advices : toArray(arguments), this.pointcut = DEFAULT_POINTCUT
    }

    function isFunction(obj) {
        return obj && "[object Function]" === Object.prototype.toString.call(obj)
    }

    function functionName(func) {
        var match = func.toString().match(/function\s+([^(?:\()\s]*)/);
        return match ? match[1] : ""
    }

    function toArray(args) {
        return [].slice.call(args, 0)
    }

    function properties(obj) {
        var result = [];
        for (var property in obj) obj.hasOwnProperty(property) && result.push([property, obj[property]]);
        return result
    }

    function keys(obj) {
        return properties(obj).map(function (property) {
            return property[0]
        })
    }

    var jsAspect = {
            SCOPE: {
                METHODS: "methods",
                PROTOTYPE_METHODS: "prototypeMethods",
                PROTOTYPE_OWN_METHODS: "prototypeOwnMethods",
                METHOD: "method"
            },
            JOIN_POINT: {
                BEFORE: "__before",
                AFTER: "__after",
                AFTER_THROWING: "__afterThrowing",
                AFTER_RETURNING: "__afterReturning",
                AROUND: "__around"
            }
        }, adviceEnhancedFlagName = "__jsAspect_advice_enhanced",
        DEFAULT_POINTCUT = new Pointcut(jsAspect.SCOPE.PROTOTYPE_METHODS);
    jsAspect.introduce = function (target, pointcut, introduction) {
        target = jsAspect.SCOPE.PROTOTYPE_OWN_METHODS === pointcut || jsAspect.SCOPE.PROTOTYPE_METHODS === pointcut ? target.prototype : target;
        for (var property in introduction) introduction.hasOwnProperty(property) && (target[property] = introduction[property]);
        return jsAspect
    }, jsAspect.inject = function (target, pointcut, joinPoint, advice, methodName) {
        var scope = pointcut.scope || pointcut, methodRegex = pointcut.methodRegex,
            isMethodPointcut = jsAspect.SCOPE.METHOD === scope,
            isPrototypeOwnMethodsPointcut = jsAspect.SCOPE.PROTOTYPE_OWN_METHODS === scope,
            isPrototypeMethodsPointcut = jsAspect.SCOPE.PROTOTYPE_METHODS === scope;
        if (isMethodPointcut) injectAdvice(target, methodName, advice, joinPoint); else {
            target = isPrototypeOwnMethodsPointcut || isPrototypeMethodsPointcut ? target.prototype : target;
            for (var method in target) {
                var shouldInjectToMethod = target.hasOwnProperty(method) || isPrototypeMethodsPointcut,
                    matchesMethodRegex = void 0 === methodRegex || method.match(methodRegex);
                shouldInjectToMethod && matchesMethodRegex && injectAdvice(target, method, advice, joinPoint)
            }
        }
        return jsAspect
    }, keys(jsAspect.JOIN_POINT).forEach(function (joinPoint) {
        jsAspect[joinPointName(joinPoint)] = function (target, advice, pointcut) {
            return jsAspect.inject(target, pointcut || jsAspect.SCOPE.PROTOTYPE_METHODS, jsAspect.JOIN_POINT[joinPoint], advice), jsAspect
        }
    }), ExecutionContext.prototype.stop = function () {
        this.isStopped = !0
    }, Advice.prototype.withPointcut = function (scope, methodRegex) {
        return this.pointcut = new Pointcut(scope, new RegExp(methodRegex)), this
    }, Advice.prototype.withRegex = function (methodRegex) {
        return this.withPointcut((this.pointcut || DEFAULT_POINTCUT).scope, methodRegex)
    }, Before.prototype = new Advice, After.prototype = new Advice, AfterReturning.prototype = new Advice, AfterThrowing.prototype = new Advice, Around.prototype = new Advice, Aspect.prototype.withPointcut = function (scope, methodRegex) {
        return this.pointcut = new Pointcut(scope, new RegExp(methodRegex)), this
    }, Aspect.prototype.withRegex = function (methodRegex) {
        return this.withPointcut(this.pointcut.scope, methodRegex)
    }, Aspect.prototype.applyTo = function () {
        var self = this, targets = toArray(arguments);
        this.advices.forEach(function (advice) {
            targets.forEach(function (target) {
                jsAspect.inject(target, advice.pointcut || self.pointcut, advice.joinPoint, advice.func)
            })
        })
    }, jsAspect.Advice = {
        Before: Before,
        After: After,
        AfterReturning: AfterReturning,
        AfterThrowing: AfterThrowing,
        Around: Around
    }, jsAspect.Pointcut = Pointcut, jsAspect.Aspect = Aspect, "undefined" != typeof module && module.exports ? module.exports = jsAspect : host.jsAspect = jsAspect
}(this);
