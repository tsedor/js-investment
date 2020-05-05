import gsap from 'gsap';

class Slider {
  constructor() {
    this.interval = 5000;
    this.activeSlideId = 1;
    this.previous = false;
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.slider__dots--item');
    this.swipe();
    this.sliderInterval = setInterval(() => this.nextSlide(), 5000);

    Array.from(this.dots).map((dot, i) => {
      dot.addEventListener('click', () => {
        i+1 !== this.activeSlideId && this.nextSlide(i+1);
        this.sliderIntervalReset();
      })
    })
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
    tl.from(`.slide:nth-child(${nextSlideId+1})`, { x: this.previous ? '-100%' : '100%', duration: .5 });
    tl.set(`.slide:nth-child(${this.activeSlideId+1})`, { display: 'none' });
    this.textAnimation(nextSlideId, tl);
    this.previous = false
  }
  sliderIntervalReset() {
    clearInterval(this.sliderInterval);
    this.sliderInterval = setInterval(() => this.nextSlide(), 5000);
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
      };
      cords.end = cords.start;
    });
    slider.addEventListener('touchmove', e => {
      const { clientX, clientY } = e.touches[0];
      cords.end = {
        clientX,
        clientY
      }
    })
    slider.addEventListener('touchend', e => {
      const diffX = Math.abs(cords.start.clientX - cords.end.clientX);
      const diffY = Math.abs(cords.start.clientY - cords.end.clientY)
      if (diffX > 50 & diffY < diffX) {
        this.previous = cords.start.clientX < cords.end.clientX ? true : false;
        this.nextSlide();
        this.sliderIntervalReset();
      }
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