import { IService, IActionService, IAction, IResult } from "./intf";
export declare class CalcService implements IService {
    protected initial: number;
    initialize(options: any): Promise<this>;
}
export declare class SumService extends CalcService implements IActionService {
    do(action: IAction): Promise<IResult>;
}
export declare class MulService extends CalcService implements IActionService {
    do(action: IAction): Promise<IResult>;
}
export declare class Bootstrap {
    static instances: number;
    constructor();
    private service;
    start(initial: any): Promise<IResult>;
}
