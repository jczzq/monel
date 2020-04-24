/**
 * Listen to click outside event
 */
import Vue from 'vue';
export declare type ClickOutsideMixinConfig = {
    event: string;
    method: string;
};
export declare const ClickOutsideMixin: (config: ClickOutsideMixinConfig) => import("vue").VueConstructor<{
    clickOutsideHandler: (event: any) => void;
} & {
    closeOnClickOutside: boolean;
} & Vue>;
