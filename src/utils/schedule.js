/**
 * 防抖调度器
 * 特性： 在promise pending内防抖
 * const f = schedule(() => {})
 * f({
 *    reset: 执行并更新数据
 * })
 */
export default (fn) => {
  if (typeof fn !== 'function') return fn;
  // 数据
  let data = undefined;
  // 是否正在加载
  let loading = false;
  // 是否加载完毕
  let loaded = false;
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
    const { reset } = params[params.length - 1] || {};
    if (loaded && !reset) {
      return Promise.resolve(data);
    }
    try {
      loaded = false;
      loading = true;
      const res = await fn.apply(null, params);
      loaded = true;
      data = res;

      // 执行并清空缓冲栈
      for (var r of resolves) {
        r && r(res);
      }
      resolves = [];
      rejects = [];

      // 返回最初的promise
      return res;
    } catch (error) {
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
