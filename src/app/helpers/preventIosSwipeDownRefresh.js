// @flow
let lastY: number = 0;
export default () => window.addEventListener('touchmove', (e: TouchEvent): void => {
  const { pageY }: { pageY: number } = e.changedTouches[0];
  const scrollY: number = window.pageYOffset || window.scrollTop || 0;
  if (pageY > lastY && scrollY === 0) {
    e.preventDefault();
  }
  lastY = pageY;
}, { passive: false });
