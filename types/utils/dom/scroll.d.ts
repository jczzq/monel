declare type ScrollElement = HTMLElement | Window;
export declare function getScrollEventTarget(element: HTMLElement, rootParent?: ScrollElement): any;
export declare function getScrollTop(element: ScrollElement): number;
export declare function setScrollTop(element: ScrollElement, value: number): void;
export declare function getRootScrollTop(): number;
export declare function setRootScrollTop(value: number): void;
export declare function getElementTop(element: ScrollElement): any;
export declare function getVisibleHeight(element: ScrollElement): any;
export declare function getVisibleTop(element: ScrollElement): any;
export {};
