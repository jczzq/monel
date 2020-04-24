import Vue from 'vue';
declare type ChildrenMixinOptions = {
    indexKey?: any;
};
export declare function ChildrenMixin(parent: string, options?: ChildrenMixinOptions): import("vue").VueConstructor<{
    bindRelation(): void;
} & {
    parent: any;
} & Record<never, any> & Vue>;
export declare function ParentMixin(parent: string): {
    provide(): {
        [x: string]: any;
    };
    data(): {
        children: any[];
    };
};
export {};
