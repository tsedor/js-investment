import gsap from 'gsap';

class Loader {
  constructor() {
    document.addEventListener('DOMContentLoaded', this.hideLoader);
  }
  hideLoader() {
    const tl = gsap.timeline();
    tl.to('.loader', { x: '100%', duration: .3 }, 1);
  }
}

export default Loader;