import parseResult from './parse';
import deviceInfo from './device';

/***
 * 调用原生方法
 * name : 原生方法名
 * param : 参数
 * cb : 回调函数
 */
let iosNativeExecNo = Date.now();

export default (name, param = {}, cb) => {
  return new Promise((resolve, reject) => {
    if (!name) return reject(new Error('action name is required'));
    window.showNativeLog && console.info('=actionNative before=', name, param);
    const callback = (res) => {
      window.showNativeLog && console.info('=actionNative after=', name, res);
      res = parseResult(res) || {};
      const result = parseResult(res.result) || res;
      cb && cb(result);
      if (result) {
        return resolve(result);
      } else {
        return reject(result);
      }
    };
    if (deviceInfo.tuhuAndroid) {
      const fn = window.THBridge.native[name];
      fn && fn(param, callback);
    } else if (deviceInfo.tuhuIos) {
      const fn = window.webkit.messageHandlers[name];
      console.log(name, fn);
      if (fn) {
        let tmpParam = { ...param };
        tmpParam.callback = 'iosNativeCallback' + iosNativeExecNo++;
        window[tmpParam.callback] = callback;
        fn.postMessage(tmpParam);
      }
    }
  });
};
