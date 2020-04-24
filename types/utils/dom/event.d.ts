import { EventHandler } from '../types';
export declare let supportsPassive: boolean;
export declare function on(target: HTMLElement | Document | Window, event: string, handler: EventHandler, passive?: boolean): void;
export declare function off(target: HTMLElement | Document | Window, event: string, handler: EventHandler): void;
export declare function stopPropagation(event: Event): void;
export declare function preventDefault(event: Event, isStopPropagation?: boolean): void;
