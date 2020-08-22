// 将 rgba/rgb色值 转换为 十六进制色值。若传入十六进制色值，则直接返回
export const rgbx2hex = function (rgbx) {
  function transform(color) {
    let hex = Math.round(color).toString(16);
    return hex.length > 1 ? hex : '0' + hex;
  }
  function rgbaTransform(rgba) {
    let tokens = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(
      rgba
    );
    return `#${transform(tokens[1])}${transform(tokens[2])}${transform(
      tokens[3]
    )}${transform(tokens[4] * 255)}`;
  }
  function rgbTransform(rgb) {
    let tokens = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(rgb);
    return `#${transform(tokens[1])}${transform(tokens[2])}${transform(
      tokens[3]
    )}`;
  }
  return /^rgba/.test(rgbx)
    ? rgbaTransform(rgbx).toUpperCase()
    : /^rgb/.test(rgbx)
      ? rgbTransform(rgbx).toUpperCase()
      : rgbx;
};

export const rgba2rgb = function (rgbBackground, rgbaColor) {
  var alpha = rgbaColor.a;

  const deAlpha = 1 - alpha;

  const r = (deAlpha * rgbBackground.r + alpha * rgbaColor.r).toFixed(0);
  const g = (deAlpha * rgbBackground.g + alpha * rgbaColor.g).toFixed(0);
  const b = (deAlpha * rgbBackground.b + alpha * rgbaColor.b).toFixed(0);

  return `rgb(${r}, ${g}, ${b})`;
};
