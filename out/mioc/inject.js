system.register("mioc/inject", ["runtime/decorators", "runtime/reflect/class"], function(system,module) {
    var decorators_1, class_1;
    var Inject = (function (__super) {
        Inject.prototype.decorate = function (member) {
            console.info(member);
            member.metadata.injected = true;
        };
        Inject.__initializer = function(__parent){
            __super=__parent;
        };
        return Inject;
        function Inject() {
            __super.apply(this, arguments);
        }
    })();
    module.define('class', Inject);
    module.export("Inject", Inject);
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (class_1_1) {
                class_1 = class_1_1;
            }],
        execute: function() {
            module.export("default",Inject);
            Inject = module.init(Inject,decorators_1.Decorator);
        }
    }
});
//# sourceMappingURL=inject.js.map