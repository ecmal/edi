import {Interface} from "runtime/reflect/class";

export interface IService {
    initialize(options:any):Promise<this>;
}

export interface IAction {
    type        : string;
    parameters  : any;
}

export interface IResult {
    id          : string,
    type        : string,
    parameters  : any,
    result      : any
}

export interface IActionService extends IService{
    do(action:IAction):Promise<IResult>;
}

export default module.members as {
    IService        : Interface;
    IAction         : Interface;
    IResult         : Interface;
    IActionService  : Interface;
};