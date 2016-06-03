import {Decorator} from "runtime/decorators";
import {Member} from "runtime/reflect/class";
import {Constructor} from "runtime/reflect/class";

export default Injectable;
export class Injectable extends Decorator {
    public options:any;
    constructor(options:any){
        super();
        this.options = options;
    }
    public decorate(member:Member) {
        if(member instanceof Constructor){
            console.info(`Injectable(${member.owner.toString()})`);
            member.owner.metadata.injectable = this.options;
        }
    }
}
