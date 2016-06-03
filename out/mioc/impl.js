system.register("mioc/impl", ["./intf", "mioc/index"], function(system,module) {
    var intf_1, index_1;
    var CalcService = (function (__super) {
        CalcService.prototype.initialize = function (options) {
            this.initial = options;
            return Promise.resolve(this);
        };
        return CalcService;
        function CalcService() {
        }
    })();
    module.define('class', CalcService);
    module.export("CalcService", CalcService);
    var SumService = (function (__super) {
        SumService.prototype.do = function (action) {
            return Promise.resolve({
                id: Math.random().toString(16),
                type: action.type,
                parameters: action.parameters,
                result: action.parameters.reduce(function (c, p) { return (c + p); }, this.initial)
            });
        };
        SumService.__initializer = function(__parent){
            __super=__parent;
        };
        SumService.__decorator = function(__decorate,__type){
            __decorate(144,"do",2,Function,__type(Promise,intf_1.IResult),null,[
                ["action",0,intf_1.IAction]
            ]);
            SumService = 
            __decorate(217, "constructor", null, null, null, [
                [index_1.Injectable]
            ], null,[
                intf_1.IActionService
            ]);
        };
        return SumService;
        function SumService() {
            __super.apply(this, arguments);
        }
    })();
    module.define('class', SumService);
    module.export("SumService", SumService);
    var MulService = (function (__super) {
        MulService.prototype.do = function (action) {
            return Promise.resolve({
                id: Math.random().toString(16),
                type: action.type,
                parameters: action.parameters,
                result: action.parameters.reduce(function (c, p) { return (c * p); }, this.initial)
            });
        };
        MulService.__initializer = function(__parent){
            __super=__parent;
        };
        MulService.__decorator = function(__decorate,__type){
            __decorate(144,"do",2,Function,__type(Promise,intf_1.IResult),null,[
                ["action",0,intf_1.IAction]
            ]);
            MulService = 
            __decorate(217, "constructor", null, null, null, [
                [index_1.Injectable]
            ], null,[
                intf_1.IActionService
            ]);
        };
        return MulService;
        function MulService() {
            __super.apply(this, arguments);
        }
    })();
    module.define('class', MulService);
    module.export("MulService", MulService);
    var Bootstrap = (function (__super) {
        Bootstrap.prototype.start = function (initial) {
            return this.service.initialize(initial).then(function (s) { return s.do({
                type: 'calc',
                parameters: [1, 2, 3, 4, 5, 6]
            }); });
        };
        Bootstrap.__decorator = function(__decorate,__type){
            __decorate(142,"service",24,intf_1.IActionService,null,[
                [index_1.Inject]
            ],null);
            __decorate(144,"start",2,Function,__type(Promise,intf_1.IResult),null,[
                ["initial",0,Object]
            ]);
            __decorate(142,"instances",3,Number,null,null,null);
            Bootstrap = 
            __decorate(217, "constructor", 80, null, null, [
                [index_1.Injectable]
            ], null,null);
        };
        return Bootstrap;
        function Bootstrap() {
            if (!Bootstrap.instances) {
                Bootstrap.instances = 1;
            }
            else {
                Bootstrap.instances++;
            }
        }
    })();
    module.define('class', Bootstrap);
    module.export("Bootstrap", Bootstrap);
    return {
        setters:[
            function (intf_1_1) {
                intf_1 = intf_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            CalcService = module.init(CalcService);
            SumService = module.init(SumService,CalcService);
            MulService = module.init(MulService,CalcService);
            Bootstrap = module.init(Bootstrap);
        }
    }
});
//# sourceMappingURL=impl.js.map