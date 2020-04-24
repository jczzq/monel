/**
 * requestAnimationFrame polyfill
 */
export declare function raf(fn: FrameRequestCallback): number;
export declare function doubleRaf(fn: FrameRequestCallback): void;
export declare function cancelRaf(id: number): void;
