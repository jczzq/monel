import { IParameterSort } from "./interface/IMoneParameter";
/**
 * 搜索条件对象
 * 使用示例：
 * ```js
 * var p = new MoneParameter({
 *     sort: {
 *         prop: 'code'
 *         order: 'asc|desc'
 *     },
 *     page: {
 *         currentPage: 1
 *         pageSize: 20
 *     },
 *     query: {
 *         keyword: 'test',
 *         categorieId: 33213444432,
 *         date: '2018-10-10',
 *         time: '10:00:00',
 *         datetime: '2018-10-10 10:00:00',
 *         categories: new MoneQueryData({
 *             value: [1, 2, 3],
 *             option: 'eq_long',
 *             extra: '$last'
 *         })
 *     }
 * })
 * // 可以通过重载format方法 改变数据结构，得到结果为：
 * {
 *     sort_asc: 'code',
 *     keyword: 'test',
 *     categorieId_eq_long: 33213444432,
 *     date_eq_date: '2018-10-10',
 *     time_eq_time: '10:00:00',
 *     datetime_eq_datetime: '2018-10-10 10:00:00',
 *     categories_eq_long: 3
 * }
 * ```
 * @export
 * @class MoneParameter
 */
export declare class MoneParameter {
    sort?: IParameterSort | IParameterSort[];
    page?: object;
    query: object;
    format?: Function;
    constructor({ query, sort, page, format }?: MoneParameter);
}
declare enum MoneQueryDataOptionEnum {
    EQ = "eq",
    NE = "ne",
    LT = "lt",
    GT = "lt",
    LE = "lt",
    GE = "lt"
}
declare enum MoneQueryDataFormatEnum {
    FIRST = "$first",
    LAST = "$last",
    TOSTRING = "$toString"
}
declare type MoneQueryDataValue = object | string | number | null | [];
/**
 * query参数
 * @export
 * @class MoneQueryData
 */ export declare class MoneQueryData<T> {
    value: MoneQueryDataValue;
    option?: MoneQueryDataOptionEnum;
    format?: MoneQueryDataFormatEnum | Function;
    constructor({ value, option, format }: MoneQueryData<T>);
}
/**
 * 视图模型
 */
export declare class CommonView {
    pending: boolean;
    visible: boolean;
    constructor(data?: CommonView);
}
export declare class ListView extends CommonView {
    parameters: MoneParameter;
    _parameters?: MoneParameter;
    rows?: Array<object>;
    total?: number;
    rowsName?: string;
    totalName?: string;
    constructor(data?: ListView);
    initParameters(data?: MoneParameter): void;
    sizeChange(size: number): void;
    load(req: Function, ...args: []): Promise<any>;
}
export declare class DetailView extends CommonView {
    instance: object;
    deleting: boolean;
    instanceName: string;
    constructor(data?: DetailView);
    clone(): object;
    delete(req: Function, ...args: []): Promise<any>;
    load(req: Function, ...args: []): Promise<any>;
}
export declare class FormView extends DetailView {
    rules: object;
    editing: boolean;
    constructor(data?: FormView);
    submit(req: Function, ...args: []): Promise<any>;
}
export {};
