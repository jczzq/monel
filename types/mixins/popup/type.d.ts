export declare type GetContainer = () => Element;
export declare type PopupMixinProps = {
    value: boolean;
    zIndex: string | number;
    overlay?: boolean;
    lockScroll: boolean;
    lazyRender: boolean;
    overlayClass?: any;
    overlayStyle?: object | object[];
    getContainer?: string | GetContainer;
    closeOnClickOverlay?: boolean;
};
