import { Injector,Inject } from "mioc/index";
import {SumService, MulService, Bootstrap} from "./impl";
import Interfaces from "./intf";

const sum:Injector = new Injector();
sum.bind("IActionService","SumService");
sum.bind(Bootstrap,Bootstrap,{
    singleton:true
});
sum.get(Bootstrap).start(0).then(r=>console.info(r));
console.info(sum.get(Interfaces.IActionService).constructor.name);
console.info(sum.get(Bootstrap)===sum.get(Bootstrap));


const mul:Injector = new Injector();
mul.bind(Interfaces.IActionService,MulService);
mul.get(Bootstrap).start(1).then(r=>console.info(r));
console.info(mul.get(Interfaces.IActionService).constructor.name);
console.info(sum.get(Bootstrap)===sum.get(Bootstrap));


console.info(Bootstrap.instances);