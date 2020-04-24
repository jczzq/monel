import Vue from 'vue';
import { GetContainer } from './popup/type';
declare type PortalMixinOptions = {
    ref?: string;
    afterPortal?: () => void;
};
export declare function PortalMixin({ ref, afterPortal }: PortalMixinOptions): import("vue").VueConstructor<{
    portal(): void;
} & {
    getContainer: string | GetContainer;
} & Vue>;
export {};
