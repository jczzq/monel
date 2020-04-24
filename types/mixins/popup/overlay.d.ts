export declare type OverlayConfig = {
    zIndex?: number;
    className?: string;
    customStyle?: string | object[] | object;
};
export declare function updateOverlay(): void;
export declare function openOverlay(vm: any, config: OverlayConfig): void;
export declare function closeOverlay(vm: any): void;
