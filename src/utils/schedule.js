/**
 * 防抖调度器
 * 特性： 在promise pending内防抖
 * const f = schedule(() => {})
 * f({
 *    reset: 执行并更新数据
 * })
 */
export default (fn, option = {}) => {
  if (typeof fn !== 'function') return fn;
  // 数据
  let data = undefined;
  // 是否正在加载
  let loading = false;
  // 是否请求成功
  let resolved = false;
  let rejected = false;
  // 请求队列
  let resolves = [];
  let rejects = [];

  return async (...params) => {
    // 重复请求 返回一个待定的Promise，并将resolve回调push进缓冲栈
    if (loading) {
      return new Promise((resolve, reject) => {
        resolves.push(resolve);
        rejects.push(reject);
      });
    }
    // 已有数据直接返回，除非强制请求
    /* eslint-disable no-undef */
    const option2 = params[params.length - 1] || {};
    Object.assign(option, option2);
    // 加载完 && 无需重置
    if (resolved && option.cache && !option.reset) {
      return Promise.resolve(data);
    } else if (rejected && option.cache && !option.reset) {
      return Promise.reject(data);
    }
    try {
      resolved = false;
      rejected = false;
      loading = true;
      const res = await fn.apply(null, params);
      data = res;
      resolved = true;

      // 执行并清空缓冲栈
      for (var r of resolves) {
        r && r(res);
      }
      resolves = [];
      rejects = [];

      // 返回最初的promise
      return res;
    } catch (error) {
      rejected = true;
      data = error;
      // 执行并清空缓冲栈
      for (var j of rejects) {
        j && j(error);
      }
      resolves = [];
      rejects = [];
      return Promise.reject(error);
    } finally {
      loading = false;
    }
  };
};
