system.register("mioc/injectable", ["runtime/decorators", "runtime/reflect/class"], function(system,module) {
    var decorators_1, class_1, class_2;
    var Injectable = (function (__super) {
        Injectable.prototype.decorate = function (member) {
            if (member instanceof class_2.Constructor) {
                console.info("Injectable(" + member.owner.toString() + ")");
                member.owner.metadata.injectable = this.options;
            }
        };
        Injectable.__initializer = function(__parent){
            __super=__parent;
        };
        return Injectable;
        function Injectable(options) {
            __super.call(this);
            this.options = options;
        }
    })();
    module.define('class', Injectable);
    module.export("Injectable", Injectable);
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (class_1_1) {
                class_1 = class_1_1;
                class_2 = class_1_1;
            }],
        execute: function() {
            module.export("default",Injectable);
            Injectable = module.init(Injectable,decorators_1.Decorator);
        }
    }
});
//# sourceMappingURL=injectable.js.map