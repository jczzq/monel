/**
 * Vue Router support
 */
import { RenderContext } from 'vue/types';
import VueRouter, { RawLocation } from 'vue-router/types';
export declare type RouteConfig = {
    url?: string;
    to?: RawLocation;
    replace?: boolean;
};
export declare function route(router: VueRouter, config: RouteConfig): void;
export declare function functionalRoute(context: RenderContext): void;
export declare type RouteProps = {
    url?: string;
    replace?: boolean;
    to?: RawLocation;
};
export declare const routeProps: {
    url: StringConstructor;
    replace: BooleanConstructor;
    to: (StringConstructor | ObjectConstructor)[];
};
