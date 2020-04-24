import Vue, { RenderContext, VNodeData } from 'vue';
import { ObjectIndex } from './types';
declare type Context = RenderContext & {
    data: VNodeData & ObjectIndex;
};
declare type InheritContext = Partial<VNodeData> & ObjectIndex;
export declare function inherit(context: Context, inheritListeners?: boolean): InheritContext;
export declare function emit(context: Context, eventName: string, ...args: any[]): void;
export declare function mount(Component: any, data?: VNodeData): import("vue/types/vue").CombinedVueInstance<Vue, object, object, object, Record<never, any>>;
export {};
