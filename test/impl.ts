import {IService, IActionService, IAction, IResult} from "./intf";
import {Inject,Injectable} from "mioc/index";

export class CalcService implements IService {
    protected initial:number;
    public initialize(options:any):Promise<this>{
        this.initial=options;
        return Promise.resolve(this);
    }
}

@Injectable
export class SumService extends CalcService implements IActionService {
    public do(action:IAction):Promise<IResult>{
        return Promise.resolve({
            id          : Math.random().toString(16),
            type        : action.type,
            parameters  : action.parameters,
            result      : action.parameters.reduce((c,p)=>(c+p),this.initial)
        })
    }
}

@Injectable
export class MulService extends CalcService implements IActionService {
    public do(action:IAction):Promise<IResult>{
        return Promise.resolve({
            id          : Math.random().toString(16),
            type        : action.type,
            parameters  : action.parameters,
            result      : action.parameters.reduce((c,p)=>(c*p),this.initial)
        })
    }
}

@Injectable
export class Bootstrap {
    public static instances:number;
    constructor(){
        if(!Bootstrap.instances){
            Bootstrap.instances = 1;
        }else{
            Bootstrap.instances++;
        }
    }
    @Inject
    private service:IActionService;

    public start(initial):Promise<IResult>{
        return this.service.initialize(initial).then(s=>s.do({
            type        : 'calc',
            parameters  : [1,2,3,4,5,6]
        }));
    }
}

