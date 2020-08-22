var u = navigator.userAgent;

const isTuhuApp = /Shop tuhuAndroid/.test(u);

const tuhuAndroid = isTuhuApp ? false : u.indexOf('tuhuAndroid') > -1;
const tuhuIos =
  u.indexOf('tuhuIOS') > -1 || (/ios/i.test(u) && /tuhu/i.test(u));
const isApp = tuhuAndroid || tuhuIos;

export default {
  trident: u.indexOf('Trident') > -1, // IE内核
  presto: u.indexOf('Presto') > -1, // opera内核
  webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
  gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
  mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
  // android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
  android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端或者uc浏览器
  iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
  iPad: u.indexOf('iPad') > -1, // 是否iPad
  symbian: u.indexOf('SymbianOS') > -1, // 是否是塞班系统
  windowPhone: u.indexOf('Windows Phone') > -1, // 是否Windows Phone
  iPod: u.indexOf('iPod') > -1, // 是否是iPod
  weixin: /MicroMessenger/i.test(u), // 微信
  wxwork: /MicroMessenger/i.test(u) && /wxwork/i.test(u), // 企业微信
  browserVersion: (u.match(/version\/(.+?)\s/i) || [])[1], // 浏览器版本号
  appVersion: (u.match(/tuhu.+?(\d+\.\d+\.\d+)/i) || [])[1], // app版本号
  isApp,
  tuhuIos, // app是否为tuhuIOS环境
  tuhuAndroid, // app是否为tuhuAndroid环境
  tuhuAndroidPlus: /tuhu.+?(\d+\.\d+\.\d+)_Plus/i.test(u), // app是否为tuhuAndroid增强webview
  tuhuLightApp: u.indexOf('com.tuhu.lightapp') > -1, // 是否为快应用环境
  kernel: (/tencenttraveler|qqbrowse/i.test(u) && 'x5') || '', // 判断内核
  qqnews: /qqnews/i.test(u), // 腾讯新闻
  isMiniProgram:
    window.__wxjs_environment === 'miniprogram' || /miniProgram/i.test(u), // 微信小程序
  isCmbc: /MPBank/i.test(u), // 招商银行app
};
