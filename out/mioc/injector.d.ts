import { Class } from "runtime/reflect/class";
import { Interface } from "runtime/reflect/class";
export declare class Binding<T> {
    private static getInterfaceFor(ref);
    private static getClassFor(ref);
    static bind<T>(injector: Injector, abstraction: string | {
        new (): T;
    } | Interface, implementation?: string | {
        new (): T;
    } | Class, options?: any): Binding<T>;
    static find(injector: Injector, abstraction: any): Binding<any>;
    id: string;
    injector: Injector;
    abstraction: Interface;
    implementation: Class;
    options: any;
    instance: T;
    constructor(injector: Injector, abstraction: string | {
        new (): T;
    } | Interface, implementation?: string | {
        new (): T;
    } | Class, options?: any);
    get(args: any[]): T;
    instantiate(args: any[]): T;
}
export declare class Injector {
    bind<T>(abstraction: string | {
        new (): T;
    } | Interface, implementation?: string | {
        new (): T;
    } | Class, options?: any): Binding<T>;
    get<T>(ref: string | {
        new (): T;
    } | Interface, ...args: any[]): T;
}
export default Injector;
