import Vue from 'vue';
declare type TouchMixinData = {
    startX: number;
    startY: number;
    deltaX: number;
    deltaY: number;
    offsetX: number;
    offsetY: number;
    direction: string;
};
export declare const TouchMixin: import("vue").VueConstructor<TouchMixinData & {
    touchStart(event: any): void;
    touchMove(event: any): void;
    resetTouchStatus(): void;
    bindTouchEvent(el: any): void;
} & Record<never, any> & Vue>;
export {};
