system.register("mioc/index", ["./injector", "./injectable", "./inject"], function(system,module) {
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        module.export(exports);
    }
    return {
        setters:[
            function (injector_1_1) {
                exportStar_1(injector_1_1);
            },
            function (injectable_1_1) {
                exportStar_1(injectable_1_1);
            },
            function (inject_1_1) {
                exportStar_1(inject_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=index.js.map