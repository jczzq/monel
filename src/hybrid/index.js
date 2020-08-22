import actionNative from './dispatch';
import deviceInfo from './device';

/***
 * 设置状态栏主题
 * bgWhiteColorBlack: 是否白底黑字
 * bgColor: 状态栏背景色(仅安卓有效)
 */
export const SET_STATUS_BAR = (bgWhiteColorBlack, bgColor) => {
  if (deviceInfo.tuhuAndroid) {
    return actionNative('setStatusBarColor', {
      statusBarColor: bgColor,
      titleBarColor: bgColor,
      backIconColor: bgColor,
      titleColor: bgColor,
      shareButtonColor: bgColor,
      statusIconStyle: bgWhiteColorBlack,
    });
  } else if (deviceInfo.tuhuIos) {
    return actionNative('setStatusBarStyle', {
      white: bgWhiteColorBlack,
    });
  }
};

/***
 * 关闭Webview
 */
export const CLOSE_WEBVIEW = (param) => {
  const name = deviceInfo.tuhuIos ? 'close' : 'closeWebview';
  return actionNative(name, param);
};

/***
 * 获取intentData
 */
export const GET_INTENT_DATA = (source) => {
  return actionNative('getIntentData', { source });
};

/***
 * 获取定位信息
 * @param {object} isNeedToLogin 是否需要登录
 */
export const GET_CURRENT_LOCATE = async (isNeedToLogin = false) => {
  try {
    let locate = {};
    if (deviceInfo.tuhuAndroid) {
      locate = await actionNative('getUserInfo', { isNeedToLogin });
    } else if (deviceInfo.tuhuIos) {
      locate = await actionNative('getDeviceInfo', {});
    }
    return {
      province: locate.userProvince || locate.province,
      city: locate.userCity || locate.city,
      district: locate.userDistrict || locate.district,
      longitude: locate.lng || locate.longitude, // 经度
      latitude: locate.lat || locate.latitude, // 纬度
      address: locate.AddrStr || locate.AddrStr,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

/***
 * 获取车型
 */
export const GET_DEFAULT_CAR = async ({
  carLevel = 2,
  source,
  isNeedCar,
} = {}) => {
  try {
    const param = { source, carLevel, isNeedCar };
    const { car } = (await actionNative('getDefaultCarFromJS', param)) || {};
    if (car && car.Properties) {
      car.Properties.forEach((x) => {
        x.PropertyKey = x.PropertyKey || x.propertyKey;
        x.PropertyValue = x.PropertyValue || x.propertyValue;
        delete x.propertyKey;
        delete x.propertyValue;
      });
    }
    return car;
  } catch (error) {
    return Promise.reject(error);
  }
};

/***
 * 获取用户信息
 * @param {bool} isNeedToLogin 是否需要去登录
 */
export const GET_CURRENT_USER = async (isNeedToLogin = false) => {
  try {
    const user = await actionNative('getUserInfo', { isNeedToLogin });
    return {
      name: user.username || user.name,
      phone: user.phone,
      userid: user.userid || user.userID,
      usersession: user.usersession,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

/***
 * 请求接口
 */
export const NETWORK_REQUEST = (param) => {
  return actionNative('networkRequest', param);
};

/***
 * 获取App静态变量
 */
export const GET_STATIC_PROP = (source) => {
  return actionNative('getStaticProperty', {
    source,
  });
};

/***
 * 获取App静态变量
 * @param {object} param 要保存的静态变量对象
 * @param {function} cb 回调函数
 */
export const SET_STATIC_PROP = (param) => {
  return actionNative('saveStaticProperty', param);
};
