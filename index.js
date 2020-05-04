import gsap from 'gsap';

const burger = document.querySelector('.header__menu');
const dots = document.querySelectorAll('.slider__dots--item');
const slides = document.querySelectorAll('.slide');

const totalSlides = slides.length;
let activeSlide = 1;

const nextSlide = () => {
  const tl = gsap.timeline();
  const nextSlide = activeSlide === dots.length ? 1 : activeSlide + 1;
  dots[nextSlide-1].classList.add('slider__dots--active');
  dots[activeSlide-1].classList.remove('slider__dots--active');
  tl.set(`.slide:nth-child(${activeSlide+1})`, { zIndex: 9 });
  tl.set(`.slide:nth-child(${nextSlide+1})`, { zIndex: 10, display: 'block' });
  tl.from(`.slide:nth-child(${nextSlide+1})`, { x: '100%', duration: .5 });
  tl.set(`.slide:nth-child(${activeSlide+1})`, { display: 'none' });
  tl.from(`.slide:nth-child(${nextSlide+1}) .slide__title p`, { y: 40, duration: 1, stagger: .2, opacity: .5 }, .5)
  tl.from(`.slide:nth-child(${nextSlide+1}) .slide__subtitle`, { y: 40, duration: 1, opacity: 0 }, .4)
  activeSlide = nextSlide;
}

const mainAnimation = () => {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';

  const tl = gsap.timeline();
  tl.from('.header__logo--image', { y: -100, duration: 1 });
  tl.from('.slider__dots--item', { x: 100, duration: 1, stagger: .2, opacity: .3 }, .2);
  tl.from('.header__menu', { x: 100, duration: 1, opacity: .3 }, .2)
  tl.from('.slide__title p', { y: 40, duration: 1, stagger: .2, opacity: .5 }, .2)
  tl.from('.slide__subtitle', { y: 40, duration: 1, opacity: 0 }, .2)
  tl.from('.scroll', { y: 40, duration: 1, opacity: .1 }, .3)
  setInterval(nextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(mainAnimation, 2000);
})

burger.addEventListener('click', () => {
  alert('aaaaaaaaaaaaaaaaaaa')
})