declare type BindEventMixinThis = {
    binded: boolean;
};
declare type BindEventHandler = (bind: Function, isBind: boolean) => void;
export declare function BindEventMixin(handler: BindEventHandler): {
    mounted: (this: BindEventMixinThis) => void;
    activated: (this: BindEventMixinThis) => void;
    deactivated: (this: BindEventMixinThis) => void;
    beforeDestroy: (this: BindEventMixinThis) => void;
};
export {};
