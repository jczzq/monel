/**
 *  过滤非法字符
 */
export default (res) => {
  if (typeof res === 'string') {
    try {
      res = res.replace(/\n/g, '').replace(/\t/g, '\\t').replace(/\r/g, '');
      res = JSON.parse(res || '{}');
    } catch (error) {
      console.error('parseResult error:', error);
      console.error('parseResult res:', res);
      return {};
    }
    return res;
  } else {
    return res;
  }
};
