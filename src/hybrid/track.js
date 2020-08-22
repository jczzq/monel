import actionNative from './dispatch';

/**
 * 埋点
 * @param {string} eventName 埋点名
 * @param {object} data 上报数据
 * @param {string} routerUrl 当前页面路由;为空时取本地默认(5.16.5+)
 * @param {string} routerRefer 前一个页面路由;为空时取本地默认(5.16.5+)
 * @param {boolean} isTa 是否Ta埋点(5.16.5+)
 */
export const TRACK_SA = (
  eventName,
  data,
  { routerUrl, routerRefer, isTa = false } = {}
) => {
  const param = {
    eventName,
    routerUrl,
    routerRefer,
  };
  if (isTa) {
    param.metadata = JSON.stringify(data);
  } else {
    param.data = JSON.stringify(data);
  }
  return actionNative('trackSA', param);
};

/**
 * 性能锚点
 * @param {string} name step名称
 * @param {number} timestamp 事件产生的时间戳
 * @param {object} routerUrl 当前页面路由;为空时取本地默认(5.17.5+) eg: { loadDataSource: "cache" }
 */
export const TRACK_STEP = (name, timestamp, { isCache = false } = {}) => {
  const param = {
    name,
    timestamp,
  };
  if (isCache) {
    param.extMap = {
      loadDataSource: 'cache',
    };
  }
  return actionNative('trackKeyLoadStepDuration', param);
};
