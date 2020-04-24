import { VNode, CreateElement, RenderContext } from 'vue';
import { InjectOptions, PropsDefinition } from 'vue/types/options';
export declare type EventHandler = (event: Event) => void;
export declare type ObjectIndex = Record<string, any>;
export declare type ScopedSlot<Props = any> = (props?: Props) => VNode[] | VNode | undefined;
export declare type DefaultSlots = {
    default?: ScopedSlot;
};
export declare type ScopedSlots = DefaultSlots & {
    [key: string]: ScopedSlot | undefined;
};
export declare type ModelOptions = {
    prop?: string;
    event?: string;
};
export declare type DefaultProps = ObjectIndex;
export declare type FunctionComponent<Props = DefaultProps, PropDefs = PropsDefinition<Props>> = {
    (h: CreateElement, props: Props, slots: ScopedSlots, context: RenderContext<Props>): VNode | undefined;
    props?: PropDefs;
    model?: ModelOptions;
    inject?: InjectOptions;
};
