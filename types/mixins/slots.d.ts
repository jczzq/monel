/**
 * Use scopedSlots in Vue 2.6+
 * downgrade to slots in lower version
 */
import Vue from 'vue';
export declare const SlotsMixin: import("vue").VueConstructor<{
    slots(name: string, props: any): any;
} & Record<never, any> & Vue>;
