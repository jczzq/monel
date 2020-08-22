/**
 * 设置<!DOCTYPE html>时，最外层scrollTop
 * 移动端Webview使用最外层滚轮，没有捕捉和冒泡，性能和帧率明显提升
 * 最外层滚动值（scrollTop）需要特殊获取方式
 */
export const getScrollTop = () => {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
};
