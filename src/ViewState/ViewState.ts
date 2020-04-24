import { get } from '../utils/index';
import { warn } from '../utils/warn';
import { deepClone } from '../utils/deep-clone';
import { deepAssign } from '../utils/deep-assign';

import config from '../config';

interface ParameterSort {
    prop?: string;
    order?: 'asc' | 'desc' | null;
}
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
export class MoneParameter {
    sort?: ParameterSort | ParameterSort[];
    page?: {};
    query: any;
    format?: () => any;
    constructor({ query, sort, page, format }: MoneParameter = { query: {} }) {
        this.sort = sort || {};
        this.page = page || {
            [config.page.pageName]: 1,
            [config.page.sizeName]: 20,
        };
        this.query = query || {};
        if (format || config.parameterFormat) {
            this.format =
                format ||
                config.parameterFormat ||
                (() => {
                    return deepClone(this);
                });
        }
    }
}

enum MoneQueryDataOptionEnum {
    // 等于
    EQ = 'eq',
    // 不等于
    NE = 'ne',
    // 小于
    LT = 'lt',
    // 大于
    GT = 'lt',
    // 小于等于
    LE = 'lt',
    // 大于等于
    GE = 'lt',
}
enum MoneQueryDataFormatEnum {
    FIRST = '$first',
    LAST = '$last',
    TOSTRING = '$toString',
}

/**
 * query参数
 * @export
 * @class MoneQueryData
 */ export class MoneQueryData {
    // 业务参数对象，一般为需要特殊操作的引用类型
    value: any;
    // 比较类型
    option?: MoneQueryDataOptionEnum;
    format?: MoneQueryDataFormatEnum | ((any) => any);
    constructor({ value, option, format }: MoneQueryData = { value: null }) {
        this.value = value;
        this.option = option || MoneQueryDataOptionEnum.EQ;

        const t = typeof format;
        if (t === 'string') {
            switch (format) {
                case MoneQueryDataFormatEnum.FIRST:
                    this.format = (array) => {
                        if (array && array.length) {
                            return array[0];
                        }
                        return array;
                    };
                    break;
                case MoneQueryDataFormatEnum.LAST:
                    this.format = (array) => {
                        if (array && array.length) {
                            return array[this.value.length - 1];
                        }
                        return array;
                    };
                    break;
                case MoneQueryDataFormatEnum.TOSTRING:
                    this.format = (a) => a.toString();
                    break;
                default:
                    this.format = (a) => a;
                    break;
            }
        } else if (t === 'function') {
            this.format = (format as any).bind(this);
        } else {
            warn('`format` must be a string or function, got a ' + t);
        }
    }
}
/**
 * 视图模型
 */
export class CommonView {
    loading: boolean;
    visible: boolean;
    constructor(data?) {
        this.loading = false;
        this.visible = false;
        if (data) {
            deepAssign(this, data);
        }
    }
}

// 列表视图
export class ListView extends CommonView {
    parameters: MoneParameter;
    _parameters?: MoneParameter;
    rows?: any[];
    total?: number;
    rowsName?: string;
    totalName?: string;
    constructor(data?: ListView) {
        super();
        this.rows = [];
        this.total = 0;
        this.rowsName = config.rowsName;
        this.totalName = config.totalName;
        if (data) {
            deepAssign(this, data);
            this.initParameters(data.parameters);
        } else {
            this.initParameters();
        }
    }
    initParameters(data?: MoneParameter): void {
        if (data) {
            this._parameters = data;
        }
        this.parameters = new MoneParameter();
        if (this._parameters) {
            this.parameters = deepClone(this._parameters) as MoneParameter;
        }
    }
    sizeChange(size): void {
        this.parameters.query.size = size;
    }
    async load(...args: any) {
        try {
            const req = args.shift();
            this.loading = true;
            const res = await req.apply(req, args);
            this.rows = get(res, this.rowsName);
            this.total = get(res, this.totalName);
            return res;
        } catch (error) {
            return Promise.reject(error);
        } finally {
            this.loading = false;
        }
    }
}

// 详情视图
export class DetailView extends CommonView {
    instance: any;
    deleting: boolean;
    instanceName: string;
    constructor(data?) {
        super();
        this.instance = {};
        this.deleting = false;
        this.instanceName = 'data';
        if (data) {
            deepAssign(this, data);
        }
    }
    clone() {
        return deepClone(this.instance);
    }
    async delete(...args: any) {
        try {
            const req = args.shift();
            this.deleting = true;
            const res = await req.apply(req, args);
            return res;
        } catch (error) {
            // console.info('DetailView delete data error', error);
            return Promise.reject(error);
        } finally {
            this.deleting = false;
        }
    }
    async load(...args: any) {
        try {
            const req = args.shift();
            this.loading = true;
            const res = await req.apply(req, args);
            this.instance = res[this.instanceName];
            return res;
        } catch (error) {
            // console.info('DetailView load data error', error);
            return Promise.reject(error);
        } finally {
            this.loading = false;
        }
    }
}

// 表单视图
export class FormView extends DetailView {
    rules: any;
    // 是否为编辑状态
    editing: boolean;
    submitting: boolean;
    constructor(data?) {
        super();
        this.rules = {};
        this.editing = false;
        this.submitting = false;
        if (data) {
            deepAssign(this, data);
        }
    }
    submit(...args: any) {
        const req = args.shift();
        return new Promise((resolve, reject) => {
            this.submitting = true;
            req.apply(req, args)
                .then((res) => {
                    this.submitting = false;
                    resolve(res);
                })
                .catch((err) => {
                    this.submitting = false;
                    reject(err);
                });
        });
    }
}
