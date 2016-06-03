import {Class} from "runtime/reflect/class";
import {Interface} from "runtime/reflect/class";
import {Property} from "runtime/reflect/class";

const BINDINGS = Symbol('bindings');

export class Binding<T> {

    private static getInterfaceFor(ref:any):Interface{
        if(ref instanceof Interface){
            return ref;
        }else
        if(typeof ref == 'string'){
            var inf = system.classes[ref];
            if(inf instanceof Interface){
                return inf;
            }else{
                var qNames = Object.keys(system.classes);
                for(var qName of qNames){
                    var cls = system.classes[qName];
                    if(cls && cls.name==ref){
                        return cls;
                    }
                }
            }
        }else if(typeof ref == 'function'){
            return ref.class;
        }
    }
    private static getClassFor(ref:any):Class{
        var cls = this.getInterfaceFor(ref);
        if(cls instanceof Class){
            return cls;
        } else {
            return null;
        }
    }

    public static bind<T>(
        injector         : Injector,
        abstraction      : string | {new():T} | Interface,
        implementation?  : string | {new():T} | Class,
        options?         : any
    ):Binding<T>{
        var binding = new Binding(injector,abstraction,implementation,options);
        var bindings = injector[BINDINGS];
        if(!bindings){
            bindings = injector[BINDINGS] = Object.create(null);
        }
        if(!bindings[binding.id]){
            bindings[binding.id] = binding;
        }else{
            throw new Error('already bounded');
        }
        return binding;
    }
    public static find(injector:Injector,abstraction:any):Binding<any>{
        var ref = Binding.getInterfaceFor(abstraction).id;
        var binding = injector[BINDINGS][ref];
        if(!binding){
            var cls = system.classes[ref];
            if(cls instanceof Class){
                binding = injector[BINDINGS][ref] = Binding.bind(injector,ref,cls);
            }else{
                throw new Error(`Invalid abstraction ${abstraction}`)
            }
        }
        return binding;
    }

    public id:string;
    public injector:Injector;
    public abstraction:Interface;
    public implementation:Class;
    public options:any;
    public instance:T;

    constructor(
        injector         : Injector,
        abstraction      : string | {new():T} | Interface,
        implementation?  : string | {new():T} | Class,
        options?         : any
    ){
        this.injector = injector;
        this.abstraction = Binding.getInterfaceFor(abstraction);
        this.implementation = Binding.getClassFor(implementation);
        this.options = this.implementation.metadata.injectable || {};
        this.id = this.abstraction.id;
        for(var o in options){
            this.options[o] = options[o];
        }
    }

    public get(args:any[]):T{
        if(this.options.singleton){
            if(!this.instance){
                this.instance = this.instantiate(args);
            }
            return this.instance;
        }else{
            return this.instantiate(args);
        }
    }

    public instantiate(args:any[]):T{
        var Class = this.implementation;
        var Constructor = Class.value;
        var instance = Object.create(null);
        Object.keys(Class.members).forEach((m)=>{
            var member = Class.members[m];
            if(member instanceof Property && member.metadata.injected){
                instance[member.name] = this.injector.get(member.type.reference);
            }
        });
        Object.setPrototypeOf(instance,Constructor.prototype);
        Constructor.apply(instance,args);
        return <T>instance;
    }
}
export class Injector {
    private [BINDINGS]:{[k:string]:Binding<any>};

    bind<T>(
        abstraction      : string | {new():T} | Interface,
        implementation?  : string | {new():T} | Class,
        options?         : any
    ):Binding<T>{
        return Binding.bind(this,abstraction,implementation,options);
    }

    get<T>(ref:string|{new():T}|Interface,...args:any[]):T{
        return Binding.find(this,ref).get(args);
    }
}

export default Injector;