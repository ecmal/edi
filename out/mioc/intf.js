system.register("mioc/intf", ["runtime/reflect/class"], function(system,module) {
    var class_1;
    var IService = module.define("interface","IService");
    var IAction = module.define("interface","IAction");
    var IResult = module.define("interface","IResult");
    var IActionService = module.define("interface","IActionService");
    return {
        setters:[
            function (class_1_1) {
                class_1 = class_1_1;
            }],
        execute: function() {
            module.export("default",module.members);
        }
    }
});
//# sourceMappingURL=intf.js.map