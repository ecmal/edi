system.register("mioc/main", ["mioc/index", "./impl", "./intf"], function(system,module) {
    var index_1, impl_1, intf_1;
    var sum, mul;
    return {
        setters:[
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (impl_1_1) {
                impl_1 = impl_1_1;
            },
            function (intf_1_1) {
                intf_1 = intf_1_1;
            }],
        execute: function() {
            sum = new index_1.Injector();
            sum.bind("IActionService", "SumService");
            sum.bind(impl_1.Bootstrap, impl_1.Bootstrap, {
                singleton: true
            });
            sum.get(impl_1.Bootstrap).start(0).then(function (r) { return console.info(r); });
            console.info(sum.get(intf_1.default.IActionService).constructor.name);
            console.info(sum.get(impl_1.Bootstrap) === sum.get(impl_1.Bootstrap));
            mul = new index_1.Injector();
            mul.bind(intf_1.default.IActionService, impl_1.MulService);
            mul.get(impl_1.Bootstrap).start(1).then(function (r) { return console.info(r); });
            console.info(mul.get(intf_1.default.IActionService).constructor.name);
            console.info(sum.get(impl_1.Bootstrap) === sum.get(impl_1.Bootstrap));
            console.info(impl_1.Bootstrap.instances);
        }
    }
});
//# sourceMappingURL=main.js.map