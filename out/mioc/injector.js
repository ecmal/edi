system.register("mioc/injector", ["runtime/reflect/class"], function(system,module) {
    var class_1, class_2, class_3;
    var BINDINGS;
    var Binding = (function (__super) {
        Binding.getInterfaceFor = function (ref) {
            if (ref instanceof class_2.Interface) {
                return ref;
            }
            else if (typeof ref == 'string') {
                var inf = system.classes[ref];
                if (inf instanceof class_2.Interface) {
                    return inf;
                }
                else {
                    var qNames = Object.keys(system.classes);
                    for (var _i = 0, qNames_1 = qNames; _i < qNames_1.length; _i++) {
                        var qName = qNames_1[_i];
                        var cls = system.classes[qName];
                        if (cls && cls.name == ref) {
                            return cls;
                        }
                    }
                }
            }
            else if (typeof ref == 'function') {
                return ref.class;
            }
        };
        Binding.getClassFor = function (ref) {
            var cls = this.getInterfaceFor(ref);
            if (cls instanceof class_1.Class) {
                return cls;
            }
            else {
                return null;
            }
        };
        Binding.bind = function (injector, abstraction, implementation, options) {
            var binding = new Binding(injector, abstraction, implementation, options);
            var bindings = injector[BINDINGS];
            if (!bindings) {
                bindings = injector[BINDINGS] = Object.create(null);
            }
            if (!bindings[binding.id]) {
                bindings[binding.id] = binding;
            }
            else {
                throw new Error('already bounded');
            }
            return binding;
        };
        Binding.find = function (injector, abstraction) {
            var ref = Binding.getInterfaceFor(abstraction).id;
            var binding = injector[BINDINGS][ref];
            if (!binding) {
                var cls = system.classes[ref];
                if (cls instanceof class_1.Class) {
                    binding = injector[BINDINGS][ref] = Binding.bind(injector, ref, cls);
                }
                else {
                    throw new Error("Invalid abstraction " + abstraction);
                }
            }
            return binding;
        };
        Binding.prototype.get = function (args) {
            if (this.options.singleton) {
                if (!this.instance) {
                    this.instance = this.instantiate(args);
                }
                return this.instance;
            }
            else {
                return this.instantiate(args);
            }
        };
        Binding.prototype.instantiate = function (args) {
            var _this = this;
            var Class = this.implementation;
            var Constructor = Class.value;
            var instance = Object.create(null);
            Object.keys(Class.members).forEach(function (m) {
                var member = Class.members[m];
                if (member instanceof class_3.Property && member.metadata.injected) {
                    instance[member.name] = _this.injector.get(member.type.reference);
                }
            });
            Object.setPrototypeOf(instance, Constructor.prototype);
            Constructor.apply(instance, args);
            return instance;
        };
        return Binding;
        function Binding(injector, abstraction, implementation, options) {
            this.injector = injector;
            this.abstraction = Binding.getInterfaceFor(abstraction);
            this.implementation = Binding.getClassFor(implementation);
            this.options = this.implementation.metadata.injectable || {};
            this.id = this.abstraction.id;
            for (var o in options) {
                this.options[o] = options[o];
            }
        }
    })();
    module.define('class', Binding);
    module.export("Binding", Binding);
    var Injector = (function (__super) {
        Injector.prototype.bind = function (abstraction, implementation, options) {
            return Binding.bind(this, abstraction, implementation, options);
        };
        Injector.prototype.get = function (ref) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return Binding.find(this, ref).get(args);
        };
        return Injector;
        function Injector() {
        }
    })();
    module.define('class', Injector);
    module.export("Injector", Injector);
    return {
        setters:[
            function (class_1_1) {
                class_1 = class_1_1;
                class_2 = class_1_1;
                class_3 = class_1_1;
            }],
        execute: function() {
            BINDINGS = Symbol('bindings');
            Binding = module.init(Binding);
            Injector = module.init(Injector);
            module.export("default",Injector);
        }
    }
});
//# sourceMappingURL=injector.js.map