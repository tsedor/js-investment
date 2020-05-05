import gsap from 'gsap';

class Slider {
  constructor() {
    this.interval = 5000;
    this.activeSlideId = 1;
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.slider__dots--item');
    setInterval(() => this.nextSlide(), 5000);
  }
  nextSlide(id = 0) {
    const nextSlideId = this.activeSlideId === this.slides.length ? 1 : this.activeSlideId + 1;
    
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
  }
  setCurrentDot(nextSlideId) {
    Array.from(this.dots).map(dot => {
      dot.classList.remove('slider__dots--active');
    })
    this.dots[nextSlideId].classList.add('slider__dots--active');
  }
}

export default Slider;