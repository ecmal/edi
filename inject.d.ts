import { Decorator } from "runtime/decorators";
import { Member } from "runtime/reflect/class";
export default Inject;
export declare class Inject extends Decorator {
    decorate(member: Member): void;
}
