function getSize() {
  var innerWidth = window.innerWidth;
  // root font size
  let rfs = 10; // px
  if (innerWidth < 768) {
    // 小屏vw按比例缩放适配
    rfs = (innerWidth / 375) * 10;
    window.__ROOT_FONT_SIZE__ = rfs;
    document.documentElement.style.fontSize = rfs / 3.75 + 'vw';
  } else {
    // 中大屏自适应适配
    document.documentElement.style.fontSize = rfs + 'px';
    window.__ROOT_FONT_SIZE__ = rfs;
  }
  console.log('window.__ROOT_FONT_SIZE__', window.__ROOT_FONT_SIZE__);
}
window.addEventListener('resize', getSize);
window.addEventListener('load', getSize);
