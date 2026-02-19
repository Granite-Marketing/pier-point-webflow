declare const SplitText: any;
declare const gsap: any;
declare const ScrollTrigger: any;
declare const EmblaCarousel: any;
declare const Autoplay: any;
declare const Fade: any;
import Fade from 'embla-carousel-fade';
import Autoplay from 'embla-carousel-autoplay';

type EmblaCarouselType = any; // need to fix those
type _SplitText = any; // need to fix those
type SplitsHolders = {
  numSplit: _SplitText | null;
  titleSplit: _SplitText | null;
  pSplits: _SplitText[];
};

class DiningSlider {
  textSliderEl: HTMLElement;
  imagesSliderEl: HTMLElement;
  currentIndex: number;
  currentSlide: HTMLElement | null;
  textSlides: NodeListOf<Element> | null;
  imagesSlides: NodeListOf<Element> | null;
  nextEl: HTMLElement | null;
  prevEl: HTMLElement | null;
  options: object;
  textEmblaApi: EmblaCarouselType | null;
  imagesEmblaApi: EmblaCarouselType | null;
  innerSliders: EmblaCarouselType[] | null;
  prevSlideSplits: SplitsHolders;
  nextSlideSplits: SplitsHolders;
  isAnimating: boolean;
  isMobileDragging: boolean;
  mobileDragStartX: number;
  mobileDragStartY: number;
  mobileDragDirection: 'left' | 'right' | null;

  constructor(textSliderEl: HTMLElement, imagesSliderEl: HTMLElement) {
    this.textSliderEl = textSliderEl;
    this.imagesSliderEl = imagesSliderEl;
    this.currentIndex = 0;
    this.currentSlide = null;
    this.textSlides = null;
    this.imagesSlides = null;
    this.nextEl = null;
    this.prevEl = null;
    this.options = { loop: true, duration: 0, watchDrag: false };
    this.textEmblaApi = null;
    this.imagesEmblaApi = null;
    this.innerSliders = null;
    this.isAnimating = false;
    this.isMobileDragging = false;
    this.mobileDragStartX = 0;
    this.mobileDragStartY = 0;
    this.mobileDragDirection = null;
    // this.prevSlideEl = null;
    // this.currentSlideEl = null;
    // this.nextSlideEl = null;
    this.prevSlideSplits = {
      numSplit: null,
      titleSplit: null,
      pSplits: [],
    };
    // this.currentSlideSplits = {};
    this.nextSlideSplits = {
      numSplit: null,
      titleSplit: null,
      pSplits: [],
    };
    this.init();
  }

  init() {
    this.textSlides = this.textSliderEl.querySelectorAll('.slider-2_collection .slider-2_item');
    this.imagesSlides = this.imagesSliderEl?.querySelectorAll(
      '.slider-2_collection .slider-2_item'
    );

    this.nextEl = this.textSliderEl.parentElement!.querySelector('[swiper-button-next]');
    this.prevEl = this.textSliderEl.parentElement!.querySelector('[swiper-button-prev]');

    // Skip slider initialization and hide buttons if only one slide
    if (this.textSlides!.length <= 1) {
      if (this.nextEl) this.nextEl.style.display = 'none';
      if (this.prevEl) this.prevEl.style.display = 'none';
      return;
    }

    this.initSliders();
    this.initButtons();
    this.introAnimation().then(() => {
      this.innerSliders![0]?.plugins()?.autoplay.play();
      this.initEmblaEvents();
      this.initMobileDrag();
    });
  }

  initSliders() {
    this.textEmblaApi = EmblaCarousel(this.textSliderEl as HTMLElement, this.options);
    this.imagesEmblaApi = EmblaCarousel(this.imagesSliderEl as HTMLElement, this.options);
    const innerSlidersEl = this.imagesSliderEl.querySelectorAll('.slider-2_card-images');
    this.innerSliders = Array.from(innerSlidersEl).map((sliderEl: Element) =>
      EmblaCarousel(
        sliderEl,
        {
          loop: true,
          // duration: 0,
          watchDrag: false,
          container: sliderEl,
        },
        [
          Fade(),
          Autoplay({
            playOnInit: false,
            delay: 3000,
          }),
        ]
      )
    );
  }

  prepareNextSlid(slide: Element, imagesSlide: Element) {
    const numSplit = new SplitText(
      slide.querySelector('.slider-2_card-header .slider-2_card-title.is-num'),
      {
        type: 'lines, chars',
        linesClass: 'is-num-line',
        charsClass: 'is-num-char',
      }
    );
    const titleSplit = new SplitText(
      slide.querySelector('.slider-2_card-header h2.slider-2_card-title'),
      {
        type: 'chars, lines',
        linesClass: 'is-title-line',
        charsClass: 'is-title-char',
      }
    );
    this.nextSlideSplits.numSplit = numSplit;
    this.nextSlideSplits.titleSplit = titleSplit;

    const paragraphs = slide.querySelectorAll('.slider-2-card_content p');
    gsap.set(paragraphs, {
      fontKerning: 'none',
      textRendering: 'optimizeSpeed',
    });
    const pSplits = Array.from(paragraphs).map((p: Element) => {
      const pSplit = new SplitText(p, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'is-p-line',
        // deepSlice: true,
      });
      this.nextSlideSplits!.pSplits.push(pSplit);
      return pSplit;
    });
    const pSplitsLines = pSplits.map((pSplit) => pSplit.lines).flat();

    gsap.set([numSplit.lines, titleSplit.lines, slide.querySelector('.slider-2_card-footer')], {
      overflow: 'hidden',
    });

    gsap.set(numSplit.chars, {
      yPercent: 100,
    });
    gsap.set(titleSplit.chars, {
      yPercent: 100,
    });
    gsap.set(pSplitsLines, {
      yPercent: 100,
    });
    gsap.set(slide.querySelector('.slider-2_card-footer a'), {
      yPercent: 100,
    });

    gsap.set(imagesSlide.querySelector('.slider-2_card-images'), {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    });
  }

  animateNextSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.nextSlideSplits.pSplits = [];
    this.prevSlideSplits.pSplits = [];
    const localNextIndex =
      this.currentIndex + 1 > this.textSlides!.length - 1 ? 0 : this.currentIndex + 1;

    this.innerSliders![this.currentIndex]?.plugins()?.autoplay.stop();

    this.prepareNextSlid(this.textSlides![localNextIndex], this.imagesSlides![localNextIndex]);
    this.animateOutSlide(
      this.textSlides![this.currentIndex],
      this.imagesSlides![this.currentIndex]
    ).then(() => {
      if (this.currentIndex === this.textSlides!.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
      this.textEmblaApi?.scrollNext();
      this.imagesEmblaApi?.scrollNext();
    });
  }

  animatePrevSlide() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.nextSlideSplits.pSplits = [];
    this.prevSlideSplits.pSplits = [];
    const localNextIndex =
      this.currentIndex - 1 < 0 ? this.textSlides!.length - 1 : this.currentIndex - 1;
    this.innerSliders![this.currentIndex]?.plugins()?.autoplay.stop();

    this.prepareNextSlid(this.textSlides![localNextIndex], this.imagesSlides![localNextIndex]);
    this.animateOutSlide(
      this.textSlides![this.currentIndex],
      this.imagesSlides![this.currentIndex]
    ).then(() => {
      if (this.currentIndex === 0) {
        this.currentIndex = this.textSlides!.length - 1;
      } else {
        this.currentIndex -= 1;
      }
      this.textEmblaApi?.scrollPrev();
      this.imagesEmblaApi?.scrollPrev();
    });
  }

  async animateOutSlide(slide: Element, imagesSlide: Element) {
    await new Promise((resolve) => {
      const numSplit = new SplitText(
        slide.querySelector('.slider-2_card-header .slider-2_card-title.is-num'),
        {
          type: 'lines, chars',
        }
      );
      const titleSplit = new SplitText(
        slide.querySelector('.slider-2_card-header h2.slider-2_card-title'),
        {
          type: 'chars, lines',
        }
      );
      this.prevSlideSplits!.numSplit = numSplit;
      this.prevSlideSplits!.titleSplit = titleSplit;
      const paragraphs = slide.querySelectorAll('.slider-2-card_content p');
      gsap.set(paragraphs, {
        fontKerning: 'none',
        textRendering: 'optimizeSpeed',
      });
      const pSplits = Array.from(paragraphs).map((p: Element) => {
        const pSplit = new SplitText(p, {
          type: 'lines',
          mask: 'lines',
          // deepSlice: true,
        });
        this.prevSlideSplits!.pSplits.push(pSplit);
        return pSplit;
      });
      const pSplitsLines = pSplits.map((pSplit) => pSplit.lines).flat();

      const tl = gsap.timeline({
        onComplete: () => {
          // revert to prevent duplications in future
          // numSplit.revert();
          // titleSplit.revert();
          // pSplits.forEach((pSplit) => pSplit.revert());
          resolve(true);
        },
        defaults: {
          duration: 1,
          ease: (i) => 1 - Math.pow(1 - i, 4),
        },
      });
      tl.set([numSplit.lines, titleSplit.lines, slide.querySelector('.slider-2_card-footer')], {
        overflow: 'hidden',
      });

      tl.to(numSplit.chars, {
        yPercent: 100,
        stagger: 0.025,
      })
        .to(
          titleSplit.chars,
          {
            yPercent: 100,
            stagger: 0.025,
          },
          '-=1'
        )
        .to(
          pSplitsLines,
          {
            yPercent: 100,
            stagger: 0.05,
          },
          '-=1'
        )
        .to(
          slide.querySelector('.slider-2_card-footer a'),
          {
            yPercent: 100,
          },
          '-=1'
        )
        .fromTo(
          imagesSlide.querySelector('.slider-2_card-images'),
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          },
          {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          },
          '-=1'
        );
    });
  }

  async animateInSlide(slide: Element, imagesSlide: Element) {
    await new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          resolve(true);
        },
        defaults: {
          duration: 1,
          ease: (i) => 1 - Math.pow(1 - i, 4),
        },
      });
      //  // console.log(imagesSlide.querySelector('.slider-2_card-images'));

      tl.fromTo(
        imagesSlide.querySelector('.slider-2_card-images'),
        {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }
      )
        .to(
          slide.querySelectorAll('.slider-2_card-header .slider-2_card-title.is-num .is-num-char'),
          {
            yPercent: 0,
            stagger: 0.025,
            delay: 0.01,
          },
          '-=1'
        )
        .to(
          slide.querySelectorAll('.slider-2_card-header .slider-2_card-title .is-title-char'),
          {
            yPercent: 0,
            stagger: 0.025,
          },
          '-=1'
        )
        .to(
          slide.querySelectorAll('.is-p-line'),
          {
            yPercent: 0,
            stagger: 0.05,
          },
          '-=1'
        )
        .to(
          slide.querySelector('.slider-2_card-footer a'),
          {
            yPercent: 0,
          },
          '-=1'
        );
    });
  }
  async introAnimation() {
    await new Promise((resolve) => {
      this.prepareNextSlid(this.textSlides![0], this.imagesSlides![0]);
      ScrollTrigger.create({
        trigger: this.textSliderEl,
        start: 'top 50%',
        markers: false,
        onEnter: () => {
          this.animateInSlide(this.textSlides![0], this.imagesSlides![0]).then(() => {
            resolve(true);
          });
        },
      });
    });
  }

  initButtons() {
    this.nextEl?.addEventListener('click', () => this.animateNextSlide());
    this.prevEl?.addEventListener('click', () => this.animatePrevSlide());
  }
  initEmblaEvents() {
    this.textEmblaApi?.on('select', () => {
      this.animateInSlide(
        this.textSlides![this.currentIndex],
        this.imagesSlides![this.currentIndex]
      ).then(() => {
        this.prevSlideSplits.numSplit!.revert();
        this.prevSlideSplits.titleSplit!.revert();
        this.prevSlideSplits.pSplits.forEach((pSplit) => pSplit.revert());
        this.nextSlideSplits.numSplit!.revert();
        this.nextSlideSplits.titleSplit!.revert();
        this.nextSlideSplits.pSplits.forEach((pSplit) => pSplit.revert());
        this.isAnimating = false;
        this.innerSliders![this.currentIndex]?.plugins()?.autoplay.play();
        // this.animateInnerImages();
      });
    });
  }

  initMobileDrag() {
    this.textSliderEl.addEventListener('touchstart', (e) => {
      this.isMobileDragging = true;
      this.mobileDragStartX = e.changedTouches[0].clientX;
      this.mobileDragStartY = e.changedTouches[0].clientY;
    });
    this.textSliderEl.addEventListener('touchend', (e) => {
      this.isMobileDragging = false;
      this.mobileDragDirection = null;
      const mobileDragEndX = e.changedTouches[0].clientX;
      const mobileDragEndY = e.changedTouches[0].clientY;
      const mobileDragDistanceX = mobileDragEndX - this.mobileDragStartX;
      const mobileDragDistanceY = mobileDragEndY - this.mobileDragStartY;

      const dragDistance = Math.sqrt(
        Math.pow(mobileDragDistanceX, 2) + Math.pow(mobileDragDistanceY, 2)
      );
      const minDragThreshold = 50;

      if (
        dragDistance > minDragThreshold &&
        Math.abs(mobileDragDistanceX) > Math.abs(mobileDragDistanceY)
      ) {
        if (mobileDragDistanceX > 0) {
          this.mobileDragDirection = 'left';
        } else {
          this.mobileDragDirection = 'right';
        }

        if (this.mobileDragDirection === 'left') {
          this.animatePrevSlide();
        } else {
          this.animateNextSlide();
        }
      }
    });
  }
}

export const diningSlider = () => {
  const textSliderEl = document.querySelector('.slider-2_collection-wrap.is-texts');
  const imagesSliderEl = document.querySelector('.slider-2_collection-wrap.is-images');
  if (!textSliderEl || !imagesSliderEl) return;
  new DiningSlider(textSliderEl as HTMLElement, imagesSliderEl as HTMLElement);
};
