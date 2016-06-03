import {Decorator} from "runtime/decorators";
import {Member} from "runtime/reflect/class";

export default Inject;
export class Inject extends Decorator {
  decorate(member:Member) {
      console.info(member);
      member.metadata.injected = true;
  }
}
