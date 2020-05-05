import gsap from 'gsap';

class Slider {
  constructor() {
    this.interval = 5000;
    this.activeSlideId = 1;
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.slider__dots--item');
    this.swipe();
    this.sliderInterval = setInterval(() => this.nextSlide(), 5000);
  }
  nextSlide(id = 0) {
    const nextSlideId = id === 0 ? this.activeSlideId === this.slides.length ? 1 : this.activeSlideId + 1 : id;
    
    this.setCurrentDot(nextSlideId-1);
    this.nextSlideAnimation(nextSlideId);
    this.activeSlideId = nextSlideId;
  }
  nextSlideAnimation(nextSlideId) {
    const tl = gsap.timeline();
    
    tl.set(`.slide:nth-child(${this.activeSlideId+1})`, { zIndex: 9 });
    tl.set(`.slide:nth-child(${nextSlideId+1})`, { zIndex: 10, display: 'block' });
    tl.from(`.slide:nth-child(${nextSlideId+1})`, { x: '100%', duration: .5 });
    tl.set(`.slide:nth-child(${this.activeSlideId+1})`, { display: 'none' });
    this.textAnimation(nextSlideId, tl);
  }
  swipe() {
    let cords = {
      start: {
        clientX: 0,
        clientY: 0
      },
      end: {
        clientX: 0,
        clientY: 0
      }
    }
    const slider = document.querySelector('.slider');
    slider.addEventListener('touchstart', e => {
      const { clientX, clientY } = e.touches[0];
      cords.start = {
        clientX,
        clientY
      }
    });
    slider.addEventListener('touchmove', e => {
      const { clientX, clientY } = e.touches[0];
      cords.end = {
        clientX,
        clientY
      }
    })
    slider.addEventListener('touchend', e => {
      clearInterval(this.sliderInterval);
      cords.start.clientX > cords.end.clientX ? this.nextSlide() : this.nextSlide(this.activeSlideId - 1 === 0 ? this.slides.length : this.activeSlideId - 1);
      this.sliderInterval = setInterval(() => this.nextSlide(), 5000);
    });
  }
  textAnimation(nextSlideId, tl) {
    tl.from(`.slide:nth-child(${nextSlideId+1}) p`, { y: '100%', opacity: .2, duration: .3, stagger: .2 });
    tl.from(`.slide:nth-child(${nextSlideId+1}) .slide__subtitle`, { y: 30, opacity: 0, duration: .3 }, 1);
  }
  setCurrentDot(nextSlideId) {
    Array.from(this.dots).map(dot => {
      dot.classList.remove('slider__dots--active');
    })
    this.dots[nextSlideId].classList.add('slider__dots--active');
  }
}

export default Slider;