import { OverlayConfig } from './overlay';
export declare type StackItem = {
    vm: any;
    config: OverlayConfig;
};
export declare const context: {
    zIndex: number;
    lockCount: number;
    stack: StackItem[];
    readonly top: StackItem;
};
