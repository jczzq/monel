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
      console.log(JSON.stringify(res));
      return {};
    }
    return res;
  } else {
    return res;
  }
};
