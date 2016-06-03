import { Decorator } from "runtime/decorators";
import { Member } from "runtime/reflect/class";
export default Injectable;
export declare class Injectable extends Decorator {
    options: any;
    constructor(options: any);
    decorate(member: Member): void;
}
