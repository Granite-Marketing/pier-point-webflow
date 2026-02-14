"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/accordion.ts
  var accordion = () => {
    const accordionTrigger = document.querySelectorAll(".accordion_header");
    if (accordionTrigger) {
      accordionTrigger.forEach((item, index) => {
        const contentWrapper = item.nextElementSibling;
        contentWrapper.style.maxHeight = "0px";
        let accordionId = `accordion-${index}`;
        let accordionTargetId = `accordion-target-${index}`;
        item.id = accordionId;
        item.setAttribute("aria-controls", accordionTargetId);
        item.nextSibling.id = accordionTargetId;
        item.nextSibling.setAttribute("labelledby", accordionId);
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const contentWrapperHeight = contentWrapper.querySelector(".accordion_content").offsetHeight;
          toggleAccordion(item, contentWrapperHeight);
        });
      });
    }
    function toggleAccordion(item, height) {
      accordionTrigger.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.setAttribute("aria-expanded", "false");
          otherItem.classList.remove("is-active");
          const otherContent = otherItem.nextElementSibling;
          if (otherContent) {
            otherContent.style.maxHeight = "0px";
          }
        }
      });
      let ariaExpanded = item.getAttribute("aria-expanded");
      ariaExpanded = ariaExpanded === "true" ? "false" : "true";
      item.setAttribute("aria-expanded", ariaExpanded);
      item.classList.toggle("is-active");
      const text = item.nextElementSibling;
      if (text) {
        text.style.maxHeight = text.style.maxHeight === "0px" ? `${height + 9 * 14}px` : "0px";
      }
    }
  };

  // src/utils/colorScroll.ts
  var colorScroll = () => {
    function attr(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "")
        return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean")
        return true;
      if (attrVal === "false" && defaultValType === "boolean")
        return false;
      if (isNaN(attrVal) && defaultValType === "string")
        return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number")
        return +attrVal;
      return defaultVal;
    }
    const colorThemes = [];
    const htmlStyles = getComputedStyle(document.documentElement);
    const targetStylesheet = document.querySelector("#color-themes");
    const regex = /--([^:\s]+):\s*var\(--([^)]+)\);/g;
    if (targetStylesheet) {
      const rules = targetStylesheet.sheet.cssRules || targetStylesheet.sheet.rules;
      for (const rule of rules) {
        const styleObject = {};
        let match;
        while ((match = regex.exec(rule.cssText)) !== null) {
          const key = "--" + match[1];
          const value = htmlStyles.getPropertyValue("--" + match[2]);
          styleObject[key] = value;
        }
        colorThemes.push(styleObject);
      }
      const durationSetting = attr(0.4, targetStylesheet.getAttribute("speed")), easeSetting = attr("power1.out", targetStylesheet.getAttribute("ease")), offsetSetting = attr(50, targetStylesheet.getAttribute("percent-from-top")), breakpointSetting = attr(0, targetStylesheet.getAttribute("min-width"));
      gsap.registerPlugin(ScrollTrigger);
      const triggerElements = document.querySelectorAll("section, footer.footer, [color-mode]");
      triggerElements.forEach((element, index) => {
        if (element.hasAttribute("color-mode-ignore"))
          return;
        let triggerElement = element;
        let startSetting = `clamp(top ${offsetSetting}%)`;
        let endSetting = `clamp(bottom ${offsetSetting}%)`;
        if (index === triggerElements.length - 1)
          endSetting = `bottom ${offsetSetting}%`;
        let modeIndex = 1;
        if (element.hasAttribute("color-mode")) {
          modeIndex = element?.getAttribute("color-mode") ?? "1";
          modeIndex = parseInt(modeIndex);
        } else {
          const bgColor = getComputedStyle(element).getPropertyValue("background-color");
          if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent")
            modeIndex = 2;
        }
        gsap.matchMedia().add(`(min-width: ${breakpointSetting}px)`, () => {
          const colorScroll2 = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: startSetting,
              end: endSetting,
              toggleActions: "play complete none reverse",
              markers: false
            }
          });
          colorScroll2.to("body", {
            ...colorThemes[modeIndex - 1],
            duration: durationSetting,
            ease: easeSetting
          });
        });
      });
    }
    const mainWrapper = document.querySelector(".main-wrapper");
    if (!mainWrapper)
      return;
    const { navColor } = mainWrapper.dataset;
    if (navColor === "light") {
      setTimeout(() => {
        document.querySelector("body")?.setAttribute("style", "");
      }, 15);
    } else if (navColor === "dark" || navColor === void 0) {
      setTimeout(() => {
        document.querySelector("body")?.setAttribute(
          "style",
          "--color--text: var(--text-color--text-primary); --color-button-background: #100b00; --color-background: #100b00;"
        );
      }, 15);
    }
    window.COLOR_THEMES = colorThemes;
  };

  // node_modules/.pnpm/embla-carousel-fade@8.6.0_embla-carousel@8.6.0/node_modules/embla-carousel-fade/esm/embla-carousel-fade.esm.js
  function clampNumber(number, min, max) {
    return Math.min(Math.max(number, min), max);
  }
  function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  }
  function Fade(userOptions = {}) {
    const fullOpacity = 1;
    const noOpacity = 0;
    const fadeFriction = 0.68;
    let emblaApi;
    let opacities = [];
    let fadeToNextDistance;
    let distanceFromPointerDown = 0;
    let fadeVelocity = 0;
    let progress = 0;
    let shouldFadePair = false;
    let defaultSettledBehaviour;
    let defaultProgressBehaviour;
    function init(emblaApiInstance) {
      emblaApi = emblaApiInstance;
      const selectedSnap = emblaApi.selectedScrollSnap();
      const {
        scrollBody,
        containerRect,
        axis
      } = emblaApi.internalEngine();
      const containerSize = axis.measureSize(containerRect);
      fadeToNextDistance = clampNumber(containerSize * 0.75, 200, 500);
      shouldFadePair = false;
      opacities = emblaApi.scrollSnapList().map((_, index) => index === selectedSnap ? fullOpacity : noOpacity);
      defaultSettledBehaviour = scrollBody.settled;
      defaultProgressBehaviour = emblaApi.scrollProgress;
      scrollBody.settled = settled;
      emblaApi.scrollProgress = scrollProgress;
      emblaApi.on("select", select).on("slideFocus", fadeToSelectedSnapInstantly).on("pointerDown", pointerDown).on("pointerUp", pointerUp);
      disableScroll();
      fadeToSelectedSnapInstantly();
    }
    function destroy() {
      const {
        scrollBody
      } = emblaApi.internalEngine();
      scrollBody.settled = defaultSettledBehaviour;
      emblaApi.scrollProgress = defaultProgressBehaviour;
      emblaApi.off("select", select).off("slideFocus", fadeToSelectedSnapInstantly).off("pointerDown", pointerDown).off("pointerUp", pointerUp);
      emblaApi.slideNodes().forEach((slideNode) => {
        const slideStyle = slideNode.style;
        slideStyle.opacity = "";
        slideStyle.transform = "";
        slideStyle.pointerEvents = "";
        if (!slideNode.getAttribute("style"))
          slideNode.removeAttribute("style");
      });
    }
    function fadeToSelectedSnapInstantly() {
      const selectedSnap = emblaApi.selectedScrollSnap();
      setOpacities(selectedSnap, fullOpacity);
    }
    function pointerUp() {
      shouldFadePair = false;
    }
    function pointerDown() {
      shouldFadePair = false;
      distanceFromPointerDown = 0;
      fadeVelocity = 0;
    }
    function select() {
      const duration = emblaApi.internalEngine().scrollBody.duration();
      fadeVelocity = duration ? 0 : fullOpacity;
      shouldFadePair = true;
      if (!duration)
        fadeToSelectedSnapInstantly();
    }
    function getSlideTransform(position) {
      const {
        axis
      } = emblaApi.internalEngine();
      const translateAxis = axis.scroll.toUpperCase();
      return `translate${translateAxis}(${axis.direction(position)}px)`;
    }
    function disableScroll() {
      const {
        translate,
        slideLooper
      } = emblaApi.internalEngine();
      translate.clear();
      translate.toggleActive(false);
      slideLooper.loopPoints.forEach(({
        translate: translate2
      }) => {
        translate2.clear();
        translate2.toggleActive(false);
      });
    }
    function lockExcessiveScroll(fadeIndex) {
      const {
        scrollSnaps,
        location: location2,
        target
      } = emblaApi.internalEngine();
      if (!isNumber(fadeIndex) || opacities[fadeIndex] < 0.5)
        return;
      location2.set(scrollSnaps[fadeIndex]);
      target.set(location2);
    }
    function setOpacities(fadeIndex, velocity) {
      const scrollSnaps = emblaApi.scrollSnapList();
      scrollSnaps.forEach((_, indexA) => {
        const absVelocity = Math.abs(velocity);
        const currentOpacity = opacities[indexA];
        const isFadeIndex = indexA === fadeIndex;
        const nextOpacity = isFadeIndex ? currentOpacity + absVelocity : currentOpacity - absVelocity;
        const clampedOpacity = clampNumber(nextOpacity, noOpacity, fullOpacity);
        opacities[indexA] = clampedOpacity;
        const fadePair = isFadeIndex && shouldFadePair;
        const indexB = emblaApi.previousScrollSnap();
        if (fadePair)
          opacities[indexB] = 1 - clampedOpacity;
        if (isFadeIndex)
          setProgress(fadeIndex, clampedOpacity);
        setOpacity(indexA);
      });
    }
    function setOpacity(index) {
      const slidesInSnap = emblaApi.internalEngine().slideRegistry[index];
      const {
        scrollSnaps,
        containerRect
      } = emblaApi.internalEngine();
      const opacity = opacities[index];
      slidesInSnap.forEach((slideIndex) => {
        const slideStyle = emblaApi.slideNodes()[slideIndex].style;
        const roundedOpacity = parseFloat(opacity.toFixed(2));
        const hasOpacity = roundedOpacity > noOpacity;
        const position = hasOpacity ? scrollSnaps[index] : containerRect.width + 2;
        const transform = getSlideTransform(position);
        if (hasOpacity)
          slideStyle.transform = transform;
        slideStyle.opacity = roundedOpacity.toString();
        slideStyle.pointerEvents = opacity > 0.5 ? "auto" : "none";
        if (!hasOpacity)
          slideStyle.transform = transform;
      });
    }
    function setProgress(fadeIndex, opacity) {
      const {
        index,
        dragHandler,
        scrollSnaps
      } = emblaApi.internalEngine();
      const pointerDown2 = dragHandler.pointerDown();
      const snapFraction = 1 / (scrollSnaps.length - 1);
      let indexA = fadeIndex;
      let indexB = pointerDown2 ? emblaApi.selectedScrollSnap() : emblaApi.previousScrollSnap();
      if (pointerDown2 && indexA === indexB) {
        const reverseSign = Math.sign(distanceFromPointerDown) * -1;
        indexA = indexB;
        indexB = index.clone().set(indexB).add(reverseSign).get();
      }
      const currentPosition = indexB * snapFraction;
      const diffPosition = (indexA - indexB) * snapFraction;
      progress = currentPosition + diffPosition * opacity;
    }
    function getFadeIndex() {
      const {
        dragHandler,
        index,
        scrollBody
      } = emblaApi.internalEngine();
      const selectedSnap = emblaApi.selectedScrollSnap();
      if (!dragHandler.pointerDown())
        return selectedSnap;
      const directionSign = Math.sign(scrollBody.velocity());
      const distanceSign = Math.sign(distanceFromPointerDown);
      const nextSnap = index.clone().set(selectedSnap).add(directionSign * -1).get();
      if (!directionSign || !distanceSign)
        return null;
      return distanceSign === directionSign ? nextSnap : selectedSnap;
    }
    function fade(emblaApi2) {
      const {
        dragHandler,
        scrollBody
      } = emblaApi2.internalEngine();
      const pointerDown2 = dragHandler.pointerDown();
      const velocity = scrollBody.velocity();
      const duration = scrollBody.duration();
      const fadeIndex = getFadeIndex();
      const noFadeIndex = !isNumber(fadeIndex);
      if (pointerDown2) {
        if (!velocity)
          return;
        distanceFromPointerDown += velocity;
        fadeVelocity = Math.abs(velocity / fadeToNextDistance);
        lockExcessiveScroll(fadeIndex);
      }
      if (!pointerDown2) {
        if (!duration || noFadeIndex)
          return;
        fadeVelocity += (fullOpacity - opacities[fadeIndex]) / duration;
        fadeVelocity *= fadeFriction;
      }
      if (noFadeIndex)
        return;
      setOpacities(fadeIndex, fadeVelocity);
    }
    function settled() {
      const {
        target,
        location: location2
      } = emblaApi.internalEngine();
      const diffToTarget = target.get() - location2.get();
      const notReachedTarget = Math.abs(diffToTarget) >= 1;
      const fadeIndex = getFadeIndex();
      const noFadeIndex = !isNumber(fadeIndex);
      fade(emblaApi);
      if (noFadeIndex || notReachedTarget)
        return false;
      return opacities[fadeIndex] > 0.999;
    }
    function scrollProgress() {
      return progress;
    }
    const self = {
      name: "fade",
      options: userOptions,
      init,
      destroy
    };
    return self;
  }
  Fade.globalOptions = void 0;

  // node_modules/.pnpm/embla-carousel-autoplay@8.6.0_embla-carousel@8.6.0/node_modules/embla-carousel-autoplay/esm/embla-carousel-autoplay.esm.js
  var defaultOptions = {
    active: true,
    breakpoints: {},
    delay: 4e3,
    jump: false,
    playOnInit: true,
    stopOnFocusIn: true,
    stopOnInteraction: true,
    stopOnMouseEnter: false,
    stopOnLastSnap: false,
    rootNode: null
  };
  function normalizeDelay(emblaApi, delay) {
    const scrollSnaps = emblaApi.scrollSnapList();
    if (typeof delay === "number") {
      return scrollSnaps.map(() => delay);
    }
    return delay(scrollSnaps, emblaApi);
  }
  function getAutoplayRootNode(emblaApi, rootNode) {
    const emblaRootNode = emblaApi.rootNode();
    return rootNode && rootNode(emblaRootNode) || emblaRootNode;
  }
  function Autoplay(userOptions = {}) {
    let options;
    let emblaApi;
    let destroyed;
    let delay;
    let timerStartTime = null;
    let timerId = 0;
    let autoplayActive = false;
    let mouseIsOver = false;
    let playOnDocumentVisible = false;
    let jump = false;
    function init(emblaApiInstance, optionsHandler) {
      emblaApi = emblaApiInstance;
      const {
        mergeOptions,
        optionsAtMedia
      } = optionsHandler;
      const optionsBase = mergeOptions(defaultOptions, Autoplay.globalOptions);
      const allOptions = mergeOptions(optionsBase, userOptions);
      options = optionsAtMedia(allOptions);
      if (emblaApi.scrollSnapList().length <= 1)
        return;
      jump = options.jump;
      destroyed = false;
      delay = normalizeDelay(emblaApi, options.delay);
      const {
        eventStore,
        ownerDocument
      } = emblaApi.internalEngine();
      const isDraggable = !!emblaApi.internalEngine().options.watchDrag;
      const root = getAutoplayRootNode(emblaApi, options.rootNode);
      eventStore.add(ownerDocument, "visibilitychange", visibilityChange);
      if (isDraggable) {
        emblaApi.on("pointerDown", pointerDown);
      }
      if (isDraggable && !options.stopOnInteraction) {
        emblaApi.on("pointerUp", pointerUp);
      }
      if (options.stopOnMouseEnter) {
        eventStore.add(root, "mouseenter", mouseEnter);
      }
      if (options.stopOnMouseEnter && !options.stopOnInteraction) {
        eventStore.add(root, "mouseleave", mouseLeave);
      }
      if (options.stopOnFocusIn) {
        emblaApi.on("slideFocusStart", stopAutoplay);
      }
      if (options.stopOnFocusIn && !options.stopOnInteraction) {
        eventStore.add(emblaApi.containerNode(), "focusout", startAutoplay);
      }
      if (options.playOnInit)
        startAutoplay();
    }
    function destroy() {
      emblaApi.off("pointerDown", pointerDown).off("pointerUp", pointerUp).off("slideFocusStart", stopAutoplay);
      stopAutoplay();
      destroyed = true;
      autoplayActive = false;
    }
    function setTimer() {
      const {
        ownerWindow
      } = emblaApi.internalEngine();
      ownerWindow.clearTimeout(timerId);
      timerId = ownerWindow.setTimeout(next, delay[emblaApi.selectedScrollSnap()]);
      timerStartTime = (/* @__PURE__ */ new Date()).getTime();
      emblaApi.emit("autoplay:timerset");
    }
    function clearTimer() {
      const {
        ownerWindow
      } = emblaApi.internalEngine();
      ownerWindow.clearTimeout(timerId);
      timerId = 0;
      timerStartTime = null;
      emblaApi.emit("autoplay:timerstopped");
    }
    function startAutoplay() {
      if (destroyed)
        return;
      if (documentIsHidden()) {
        playOnDocumentVisible = true;
        return;
      }
      if (!autoplayActive)
        emblaApi.emit("autoplay:play");
      setTimer();
      autoplayActive = true;
    }
    function stopAutoplay() {
      if (destroyed)
        return;
      if (autoplayActive)
        emblaApi.emit("autoplay:stop");
      clearTimer();
      autoplayActive = false;
    }
    function visibilityChange() {
      if (documentIsHidden()) {
        playOnDocumentVisible = autoplayActive;
        return stopAutoplay();
      }
      if (playOnDocumentVisible)
        startAutoplay();
    }
    function documentIsHidden() {
      const {
        ownerDocument
      } = emblaApi.internalEngine();
      return ownerDocument.visibilityState === "hidden";
    }
    function pointerDown() {
      if (!mouseIsOver)
        stopAutoplay();
    }
    function pointerUp() {
      if (!mouseIsOver)
        startAutoplay();
    }
    function mouseEnter() {
      mouseIsOver = true;
      stopAutoplay();
    }
    function mouseLeave() {
      mouseIsOver = false;
      startAutoplay();
    }
    function play(jumpOverride) {
      if (typeof jumpOverride !== "undefined")
        jump = jumpOverride;
      startAutoplay();
    }
    function stop() {
      if (autoplayActive)
        stopAutoplay();
    }
    function reset() {
      if (autoplayActive)
        startAutoplay();
    }
    function isPlaying() {
      return autoplayActive;
    }
    function next() {
      const {
        index
      } = emblaApi.internalEngine();
      const nextIndex = index.clone().add(1).get();
      const lastIndex = emblaApi.scrollSnapList().length - 1;
      const kill = options.stopOnLastSnap && nextIndex === lastIndex;
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext(jump);
      } else {
        emblaApi.scrollTo(0, jump);
      }
      emblaApi.emit("autoplay:select");
      if (kill)
        return stopAutoplay();
      startAutoplay();
    }
    function timeUntilNext() {
      if (!timerStartTime)
        return null;
      const currentDelay = delay[emblaApi.selectedScrollSnap()];
      const timePastSinceStart = (/* @__PURE__ */ new Date()).getTime() - timerStartTime;
      return currentDelay - timePastSinceStart;
    }
    const self = {
      name: "autoplay",
      options: userOptions,
      init,
      destroy,
      play,
      stop,
      reset,
      isPlaying,
      timeUntilNext
    };
    return self;
  }
  Autoplay.globalOptions = void 0;

  // src/utils/diningSwiper.ts
  var DiningSlider = class {
    constructor(textSliderEl, imagesSliderEl) {
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
      this.prevSlideSplits = {
        numSplit: null,
        titleSplit: null,
        pSplits: []
      };
      this.nextSlideSplits = {
        numSplit: null,
        titleSplit: null,
        pSplits: []
      };
      this.init();
    }
    init() {
      this.textSlides = this.textSliderEl.querySelectorAll(".slider-2_collection .slider-2_item");
      this.imagesSlides = this.imagesSliderEl?.querySelectorAll(
        ".slider-2_collection .slider-2_item"
      );
      this.nextEl = this.textSliderEl.parentElement.querySelector("[swiper-button-next]");
      this.prevEl = this.textSliderEl.parentElement.querySelector("[swiper-button-prev]");
      this.initSliders();
      this.initButtons();
      this.introAnimation().then(() => {
        this.innerSliders[0]?.plugins()?.autoplay.play();
        this.initEmblaEvents();
        this.initMobileDrag();
      });
    }
    initSliders() {
      this.textEmblaApi = EmblaCarousel(this.textSliderEl, this.options);
      this.imagesEmblaApi = EmblaCarousel(this.imagesSliderEl, this.options);
      const innerSlidersEl = this.imagesSliderEl.querySelectorAll(".slider-2_card-images");
      this.innerSliders = Array.from(innerSlidersEl).map(
        (sliderEl) => EmblaCarousel(
          sliderEl,
          {
            loop: true,
            // duration: 0,
            watchDrag: false,
            container: sliderEl
          },
          [
            Fade(),
            Autoplay({
              playOnInit: false,
              delay: 3e3
            })
          ]
        )
      );
    }
    prepareNextSlid(slide, imagesSlide) {
      const numSplit = new SplitText(
        slide.querySelector(".slider-2_card-header .slider-2_card-title.is-num"),
        {
          type: "lines, chars",
          linesClass: "is-num-line",
          charsClass: "is-num-char"
        }
      );
      const titleSplit = new SplitText(
        slide.querySelector(".slider-2_card-header h2.slider-2_card-title"),
        {
          type: "chars, lines",
          linesClass: "is-title-line",
          charsClass: "is-title-char"
        }
      );
      this.nextSlideSplits.numSplit = numSplit;
      this.nextSlideSplits.titleSplit = titleSplit;
      const paragraphs = slide.querySelectorAll(".slider-2-card_content p");
      gsap.set(paragraphs, {
        fontKerning: "none",
        textRendering: "optimizeSpeed"
      });
      const pSplits = Array.from(paragraphs).map((p) => {
        const pSplit = new SplitText(p, {
          type: "lines",
          mask: "lines",
          linesClass: "is-p-line"
          // deepSlice: true,
        });
        this.nextSlideSplits.pSplits.push(pSplit);
        return pSplit;
      });
      const pSplitsLines = pSplits.map((pSplit) => pSplit.lines).flat();
      gsap.set([numSplit.lines, titleSplit.lines, slide.querySelector(".slider-2_card-footer")], {
        overflow: "hidden"
      });
      gsap.set(numSplit.chars, {
        yPercent: 100
      });
      gsap.set(titleSplit.chars, {
        yPercent: 100
      });
      gsap.set(pSplitsLines, {
        yPercent: 100
      });
      gsap.set(slide.querySelector(".slider-2_card-footer a"), {
        yPercent: 100
      });
      gsap.set(imagesSlide.querySelector(".slider-2_card-images"), {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
      });
    }
    animateNextSlide() {
      if (this.isAnimating)
        return;
      this.isAnimating = true;
      this.nextSlideSplits.pSplits = [];
      this.prevSlideSplits.pSplits = [];
      const localNextIndex = this.currentIndex + 1 > this.textSlides.length - 1 ? 0 : this.currentIndex + 1;
      this.innerSliders[this.currentIndex]?.plugins()?.autoplay.stop();
      this.prepareNextSlid(this.textSlides[localNextIndex], this.imagesSlides[localNextIndex]);
      this.animateOutSlide(
        this.textSlides[this.currentIndex],
        this.imagesSlides[this.currentIndex]
      ).then(() => {
        if (this.currentIndex === this.textSlides.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex += 1;
        }
        this.textEmblaApi?.scrollNext();
        this.imagesEmblaApi?.scrollNext();
      });
    }
    animatePrevSlide() {
      if (this.isAnimating)
        return;
      this.isAnimating = true;
      this.nextSlideSplits.pSplits = [];
      this.prevSlideSplits.pSplits = [];
      const localNextIndex = this.currentIndex - 1 < 0 ? this.textSlides.length - 1 : this.currentIndex - 1;
      this.innerSliders[this.currentIndex]?.plugins()?.autoplay.stop();
      this.prepareNextSlid(this.textSlides[localNextIndex], this.imagesSlides[localNextIndex]);
      this.animateOutSlide(
        this.textSlides[this.currentIndex],
        this.imagesSlides[this.currentIndex]
      ).then(() => {
        if (this.currentIndex === 0) {
          this.currentIndex = this.textSlides.length - 1;
        } else {
          this.currentIndex -= 1;
        }
        this.textEmblaApi?.scrollPrev();
        this.imagesEmblaApi?.scrollPrev();
      });
    }
    async animateOutSlide(slide, imagesSlide) {
      await new Promise((resolve) => {
        const numSplit = new SplitText(
          slide.querySelector(".slider-2_card-header .slider-2_card-title.is-num"),
          {
            type: "lines, chars"
          }
        );
        const titleSplit = new SplitText(
          slide.querySelector(".slider-2_card-header h2.slider-2_card-title"),
          {
            type: "chars, lines"
          }
        );
        this.prevSlideSplits.numSplit = numSplit;
        this.prevSlideSplits.titleSplit = titleSplit;
        const paragraphs = slide.querySelectorAll(".slider-2-card_content p");
        gsap.set(paragraphs, {
          fontKerning: "none",
          textRendering: "optimizeSpeed"
        });
        const pSplits = Array.from(paragraphs).map((p) => {
          const pSplit = new SplitText(p, {
            type: "lines",
            mask: "lines"
            // deepSlice: true,
          });
          this.prevSlideSplits.pSplits.push(pSplit);
          return pSplit;
        });
        const pSplitsLines = pSplits.map((pSplit) => pSplit.lines).flat();
        const tl = gsap.timeline({
          onComplete: () => {
            resolve(true);
          },
          defaults: {
            duration: 1,
            ease: (i) => 1 - Math.pow(1 - i, 4)
          }
        });
        tl.set([numSplit.lines, titleSplit.lines, slide.querySelector(".slider-2_card-footer")], {
          overflow: "hidden"
        });
        tl.to(numSplit.chars, {
          yPercent: 100,
          stagger: 0.025
        }).to(
          titleSplit.chars,
          {
            yPercent: 100,
            stagger: 0.025
          },
          "-=1"
        ).to(
          pSplitsLines,
          {
            yPercent: 100,
            stagger: 0.05
          },
          "-=1"
        ).to(
          slide.querySelector(".slider-2_card-footer a"),
          {
            yPercent: 100
          },
          "-=1"
        ).fromTo(
          imagesSlide.querySelector(".slider-2_card-images"),
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          },
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          },
          "-=1"
        );
      });
    }
    async animateInSlide(slide, imagesSlide) {
      await new Promise((resolve) => {
        const tl = gsap.timeline({
          onComplete: () => {
            resolve(true);
          },
          defaults: {
            duration: 1,
            ease: (i) => 1 - Math.pow(1 - i, 4)
          }
        });
        tl.fromTo(
          imagesSlide.querySelector(".slider-2_card-images"),
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          }
        ).to(
          slide.querySelectorAll(".slider-2_card-header .slider-2_card-title.is-num .is-num-char"),
          {
            yPercent: 0,
            stagger: 0.025,
            delay: 0.01
          },
          "-=1"
        ).to(
          slide.querySelectorAll(".slider-2_card-header .slider-2_card-title .is-title-char"),
          {
            yPercent: 0,
            stagger: 0.025
          },
          "-=1"
        ).to(
          slide.querySelectorAll(".is-p-line"),
          {
            yPercent: 0,
            stagger: 0.05
          },
          "-=1"
        ).to(
          slide.querySelector(".slider-2_card-footer a"),
          {
            yPercent: 0
          },
          "-=1"
        );
      });
    }
    async introAnimation() {
      await new Promise((resolve) => {
        this.prepareNextSlid(this.textSlides[0], this.imagesSlides[0]);
        ScrollTrigger.create({
          trigger: this.textSliderEl,
          start: "top 50%",
          markers: false,
          onEnter: () => {
            this.animateInSlide(this.textSlides[0], this.imagesSlides[0]).then(() => {
              resolve(true);
            });
          }
        });
      });
    }
    initButtons() {
      this.nextEl?.addEventListener("click", () => this.animateNextSlide());
      this.prevEl?.addEventListener("click", () => this.animatePrevSlide());
    }
    initEmblaEvents() {
      this.textEmblaApi?.on("select", () => {
        this.animateInSlide(
          this.textSlides[this.currentIndex],
          this.imagesSlides[this.currentIndex]
        ).then(() => {
          this.prevSlideSplits.numSplit.revert();
          this.prevSlideSplits.titleSplit.revert();
          this.prevSlideSplits.pSplits.forEach((pSplit) => pSplit.revert());
          this.nextSlideSplits.numSplit.revert();
          this.nextSlideSplits.titleSplit.revert();
          this.nextSlideSplits.pSplits.forEach((pSplit) => pSplit.revert());
          this.isAnimating = false;
          this.innerSliders[this.currentIndex]?.plugins()?.autoplay.play();
        });
      });
    }
    initMobileDrag() {
      this.textSliderEl.addEventListener("touchstart", (e) => {
        this.isMobileDragging = true;
        this.mobileDragStartX = e.changedTouches[0].clientX;
        this.mobileDragStartY = e.changedTouches[0].clientY;
      });
      this.textSliderEl.addEventListener("touchend", (e) => {
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
        if (dragDistance > minDragThreshold && Math.abs(mobileDragDistanceX) > Math.abs(mobileDragDistanceY)) {
          if (mobileDragDistanceX > 0) {
            this.mobileDragDirection = "left";
          } else {
            this.mobileDragDirection = "right";
          }
          if (this.mobileDragDirection === "left") {
            this.animatePrevSlide();
          } else {
            this.animateNextSlide();
          }
        }
      });
    }
  };
  var diningSlider = () => {
    const textSliderEl = document.querySelector(".slider-2_collection-wrap.is-texts");
    const imagesSliderEl = document.querySelector(".slider-2_collection-wrap.is-images");
    if (!textSliderEl || !imagesSliderEl)
      return;
    new DiningSlider(textSliderEl, imagesSliderEl);
  };

  // src/utils/dualImage.ts
  var titleAnimation = (headerTitle, tl, order) => {
    gsap.set(headerTitle, {
      textWrap: "nowrap"
    });
    const titleSplit = new SplitText(headerTitle, {
      type: "words",
      mask: "words"
      // reduceWhiteSpace: true,
    });
    const parent = headerTitle.parentElement;
    const isRotated = parent?.hasAttribute("data-90deg-text");
    const animationOrder = headerTitle.getAttribute("data-animation-order");
    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      gsap.set(headerTitle, {
        textWrap: "wrap"
      });
    });
    if (isRotated) {
      tl.fromTo(
        titleSplit.words,
        {
          xPercent: 100
        },
        {
          xPercent: 0
        },
        order ?? animationOrder ?? null
      );
    } else {
      tl.fromTo(
        titleSplit.words,
        {
          yPercent: 100
        },
        {
          yPercent: 0
        },
        order ?? animationOrder ?? null
      );
    }
  };
  var figureAnimation = (figures, tl, order) => {
    figures.forEach((figure, index) => {
      const animationOrder = figure.getAttribute("data-animation-order");
      tl.fromTo(
        figure,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        },
        order ? "-=75%" : animationOrder ?? `-=${index * 0.75}`
      );
    });
  };
  var paragraphsAnimation = (paragraphs, tl, order) => {
    paragraphs.forEach((paragraph) => {
      const animationOrder = paragraph.getAttribute("data-animation-order");
      const paragraphSplit = new SplitText(paragraph, {
        type: "words,lines",
        mask: "lines"
      });
      gsap.set(paragraphSplit.lines, {
        overflow: "hidden"
      });
      gsap.set(paragraphSplit.lines, {
        yPercent: 100
      });
      tl.to(
        paragraphSplit.lines,
        {
          yPercent: 0,
          stagger: 0.15
        },
        order ?? animationOrder ?? null
      );
    });
  };
  var dualImage = () => {
    const sections = document.querySelectorAll("[data-animation-general]");
    const elems = document.getElementsByTagName("*");
    if (sections.length > 0) {
      sections.forEach((section) => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const tl = gsap.timeline({
            defaults: {
              duration: 1,
              ease: "power2.inOut"
            },
            onComplete: () => {
              section.classList.add("is-animated");
            }
          });
          const figures = section.querySelectorAll("figure");
          const headerTitles = section.querySelectorAll("header > *:first-child");
          const paragraphs = section.querySelectorAll("p");
          const links = section.querySelectorAll("a.button.is-link");
          const liItems = section.querySelectorAll("li");
          const otherLinks = section.querySelectorAll("a.sticky-details_link");
          const indexOfTitle = Array.from(elems).indexOf(headerTitles[0]);
          const indexOfFirstFigure = Array.from(elems).indexOf(figures[0]);
          const indexOfFirstParagraph = Array.from(elems).indexOf(paragraphs[0]);
          if (indexOfTitle >= 0 && indexOfTitle < indexOfFirstFigure) {
            if (headerTitles.length > 0) {
              headerTitles.forEach((headerTitle) => {
                titleAnimation(headerTitle, tl);
              });
            }
            if (indexOfFirstFigure > indexOfFirstParagraph) {
              if (paragraphs.length > 0) {
                paragraphsAnimation(paragraphs, tl, "-=70%");
              }
              if (figures.length > 0) {
                figureAnimation(figures, tl, true);
              }
            } else {
              if (figures.length > 0) {
                figureAnimation(figures, tl, true);
              }
              if (paragraphs.length > 0) {
                paragraphsAnimation(paragraphs, tl, "-=50%");
              }
            }
          } else {
            figureAnimation(figures, tl);
            if (indexOfFirstParagraph > indexOfTitle) {
              if (headerTitles.length > 0) {
                headerTitles.forEach((headerTitle) => {
                  titleAnimation(headerTitle, tl, "-=85%");
                });
              }
              if (paragraphs.length > 0) {
                paragraphsAnimation(paragraphs, tl, "-=60%");
              }
            } else {
              if (paragraphs.length > 0) {
                paragraphsAnimation(paragraphs, tl, "-=50%");
              }
              if (headerTitles.length > 0) {
                headerTitles.forEach((headerTitle) => {
                  titleAnimation(headerTitle, tl);
                });
              }
            }
          }
          if (links.length > 0) {
            links.forEach((link) => {
              const linkSplit = new SplitText(link.querySelector("div"), {
                type: "words,lines",
                mask: "lines"
              });
              const icon = link.querySelector("svg");
              gsap.set(link, {
                overflow: "hidden"
              });
              gsap.set(linkSplit.lines, {
                overflow: "hidden"
              });
              tl.fromTo(
                linkSplit.lines,
                {
                  yPercent: 100
                },
                {
                  yPercent: 0,
                  // duration: 1,
                  stagger: 0.05
                },
                "-=.75"
              ).fromTo(
                icon,
                {
                  yPercent: 140
                },
                {
                  yPercent: 0,
                  // duration: 1,
                  stagger: 0.1
                },
                "-=.75"
              );
            });
          }
          if (liItems.length > 0) {
            liItems.forEach((li) => {
              const liSplit = new SplitText(li, {
                type: "lines",
                mask: "lines"
              });
              gsap.set(liSplit.lines, {
                overflow: "hidden"
              });
              tl.fromTo(
                liSplit.lines,
                {
                  yPercent: 120
                },
                {
                  yPercent: 0,
                  stagger: 0.01
                },
                "-=1"
              );
            });
          }
          if (otherLinks.length > 0) {
            otherLinks.forEach((otherLink) => {
              const otherLinkSplit = new SplitText(otherLink.querySelector("div"), {
                type: "lines",
                mask: "lines"
              });
              gsap.set(otherLink, {
                overflow: "hidden"
              });
              gsap.set(otherLinkSplit.lines, {
                overflow: "hidden"
              });
              tl.fromTo(
                otherLink.querySelector("svg"),
                {
                  yPercent: 140
                },
                {
                  yPercent: 0
                },
                "-=1"
              ).fromTo(
                otherLinkSplit.lines,
                {
                  yPercent: 100
                },
                {
                  yPercent: 0
                },
                "-=.75"
              );
            });
          }
          ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            markers: false,
            animation: tl
          });
        });
        mm.add("(max-width: 767px)", () => {
          const duration = 0.5;
          const ease = "ease.out";
          const figures = section.querySelectorAll("figure");
          const headerTitle = section.querySelector("header > *:first-child");
          const paragraphs = section.querySelectorAll("p");
          const links = section.querySelectorAll("a.button.is-link");
          const liItems = section.querySelectorAll("li");
          const otherLinks = section.querySelectorAll("a.sticky-details_link");
          const totalAnimations = figures.length + (headerTitle ? 1 : 0) + paragraphs.length + links.length + (liItems.length > 0 ? 1 : 0) + otherLinks.length;
          let completedCount = 0;
          const maybeAddCompleteClass = () => {
            completedCount += 1;
            if (completedCount >= totalAnimations) {
              section.classList.add("is-animated");
            }
          };
          if (figures.length > 0) {
            figures.forEach((figure) => {
              const tl = gsap.timeline({
                defaults: {
                  duration,
                  ease
                },
                onComplete: maybeAddCompleteClass
              });
              gsap.set(figure, {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
              });
              tl.to(figure, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              });
              ScrollTrigger.create({
                trigger: figure,
                start: "top 80%",
                markers: false,
                animation: tl
              });
            });
          }
          if (headerTitle) {
            const tl = gsap.timeline({
              defaults: {
                duration,
                ease
              },
              onComplete: maybeAddCompleteClass
            });
            const titleSplit = new SplitText(headerTitle, {
              type: "lines",
              mask: "lines"
            });
            const parent = headerTitle.parentElement;
            const isRotated = parent?.hasAttribute("data-90deg-text");
            gsap.set(titleSplit.lines, {
              overflow: "hidden"
            });
            if (isRotated) {
              tl.fromTo(
                titleSplit.lines,
                {
                  xPercent: 100
                },
                {
                  xPercent: 0,
                  stagger: 0.05
                }
              );
            } else {
              tl.fromTo(
                titleSplit.lines,
                {
                  yPercent: 100
                },
                {
                  yPercent: 0,
                  stagger: 0.05
                }
              );
            }
            ScrollTrigger.create({
              trigger: headerTitle,
              start: "top 80%",
              markers: false,
              animation: tl
            });
          }
          if (paragraphs.length > 0) {
            paragraphs.forEach((paragraph) => {
              const tl = gsap.timeline({
                defaults: {
                  duration,
                  ease
                },
                onComplete: maybeAddCompleteClass
              });
              const paragraphSplit = new SplitText(paragraph, {
                type: "lines",
                mask: "lines"
              });
              gsap.set(paragraphSplit.lines, {
                overflow: "hidden"
              });
              gsap.set(paragraphSplit.lines, {
                yPercent: 100
              });
              tl.to(paragraphSplit.lines, {
                yPercent: 0,
                stagger: 0.01
              });
              ScrollTrigger.create({
                trigger: paragraph,
                start: "top 80%",
                markers: false,
                animation: tl
              });
            });
          }
          if (links.length > 0) {
            links.forEach((link) => {
              const tl = gsap.timeline({
                defaults: {
                  duration,
                  ease
                },
                onComplete: maybeAddCompleteClass
              });
              const linkSplit = new SplitText(link.querySelector("div"), {
                type: "lines",
                mask: "lines"
              });
              const icon = link.querySelector("svg");
              gsap.set(link, {
                overflow: "hidden"
              });
              gsap.set(linkSplit.lines, {
                overflow: "hidden"
              });
              tl.fromTo(
                linkSplit.lines,
                {
                  yPercent: 100
                },
                {
                  yPercent: 0,
                  stagger: 0.05
                }
              ).fromTo(
                icon,
                {
                  yPercent: 140
                },
                {
                  yPercent: 0,
                  stagger: 0.1
                },
                "-=1"
              );
              ScrollTrigger.create({
                trigger: link,
                start: "top 80%",
                markers: false,
                animation: tl
              });
            });
          }
          if (liItems.length > 0) {
            const tl = gsap.timeline({
              defaults: {
                duration,
                ease
              },
              onComplete: maybeAddCompleteClass
            });
            liItems.forEach((li) => {
              const liSplit = new SplitText(li, {
                type: "lines",
                mask: "lines"
              });
              gsap.set(liSplit.lines, {
                overflow: "hidden"
              });
              tl.fromTo(
                liSplit.lines,
                {
                  yPercent: 120
                },
                {
                  yPercent: 0,
                  stagger: 0.01
                }
              );
              ScrollTrigger.create({
                trigger: li.parentElement,
                start: "top 80%",
                markers: false,
                animation: tl
              });
            });
          }
          if (otherLinks.length > 0) {
            otherLinks.forEach((otherLink) => {
              const tl = gsap.timeline({
                defaults: {
                  duration,
                  ease
                },
                onComplete: maybeAddCompleteClass
              });
              const otherLinkSplit = new SplitText(otherLink.querySelector("div"), {
                type: "lines",
                mask: "lines"
              });
              gsap.set(otherLink, {
                overflow: "hidden"
              });
              gsap.set(otherLinkSplit.lines, {
                overflow: "hidden"
              });
              tl.fromTo(
                otherLink.querySelector("svg"),
                {
                  yPercent: 140
                },
                {
                  yPercent: 0
                }
              ).fromTo(
                otherLinkSplit.lines,
                {
                  yPercent: 100
                },
                {
                  yPercent: 0
                },
                "-=.75"
              );
              ScrollTrigger.create({
                trigger: otherLink,
                start: "top 80%",
                markers: false,
                animation: tl
              });
            });
          }
        });
      });
    }
  };

  // src/utils/floatingMenu.ts
  var floatingMenu = () => {
    const floatingMenuButton = document.querySelector(".floating-menu-button");
    if (!floatingMenuButton)
      return;
    floatingMenuButton.addEventListener("click", () => {
      floatingMenuButton.classList.toggle("is-active");
      const headerMenuButton = document.querySelector(".header_menu-button");
      if (headerMenuButton) {
        headerMenuButton.click();
      }
    });
  };

  // src/utils/fsCmsFilter.ts
  var fsCmsFilter = () => {
    const clears = document.querySelectorAll(".filter_radio-wrap.is-clear");
    clears.forEach((c) => {
      c.classList.add("fs-cmsfilter_active");
      c.addEventListener("click", () => {
        c.classList.add("fs-cmsfilter_active");
      });
      const form = c.closest("form");
      form.addEventListener("change", () => {
        const inputs = form.querySelectorAll('input[type="radio"]');
        let anyChecked = false;
        inputs.forEach((input) => {
          if (input.checked)
            anyChecked = true;
        });
        if (!anyChecked) {
          c.classList.add("fs-cmsfilter_active");
        } else {
          c.classList.remove("fs-cmsfilter_active");
        }
      });
    });
  };

  // src/utils/gsapBasicAnimations.ts
  var gsapBasicAnimations = () => {
    gsap.set(".slide-in", { y: 25, opacity: 0 });
    ScrollTrigger.batch(".slide-in", {
      start: "top bottom-=100px",
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1 })
    });
    gsap.set(".fade-in", { opacity: 0 });
    ScrollTrigger.batch(".fade-in", {
      start: "top bottom-=100px",
      onEnter: (batch) => gsap.to(batch, { opacity: 1, duration: 1 })
    });
  };

  // src/utils/gsapSmoothScroll.ts
  var lenis = null;
  var gsapSmoothScroll = () => {
    lenis = new Lenis({
      prevent: (node) => node.getAttribute("data-prevent-lenis") === "true"
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1e3);
    });
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("load", () => {
      setTimeout(() => {
        console.log("load -> refresh");
        ScrollTrigger.refresh();
      }, 5e3);
    });
    setTimeout(() => {
      console.log("refresh");
      ScrollTrigger.refresh();
    }, 5e3);
    setTimeout(() => {
      console.log("last refresh");
      ScrollTrigger.refresh();
    }, 15e3);
  };
  var stopSmoothScroll = () => {
    lenis.stop();
  };
  var startSmoothScroll = () => {
    lenis.start();
  };

  // src/utils/HeroImageScale.ts
  var mouseMoveAnimation = () => {
    const heroMask = document.querySelector(".section_hero-mask");
    const heroImages = document.querySelectorAll(
      "[hero-image-masker] .hero-mask_fig"
    );
    const newHeroImageHolder = document.querySelector(
      ".section_hero-home .hero-home_bg"
    );
    if (!heroMask || heroImages.length === 0 || !newHeroImageHolder)
      return;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetHolderX = 0;
    let targetHolderY = 0;
    let currentHolderX = 0;
    let currentHolderY = 0;
    heroMask.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX - window.innerWidth / 2;
      const mouseY = e.clientY - window.innerHeight / 2;
      targetX = mouseX;
      targetY = mouseY;
      targetHolderX = mouseX;
      targetHolderY = mouseY;
    });
    function animateImages() {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      currentHolderX += (targetHolderX - currentHolderX) * 0.1;
      currentHolderY += (targetHolderY - currentHolderY) * 0.1;
      heroImages.forEach((img, index) => {
        const i = index + 1;
        const distanceX2 = currentX / (window.innerWidth / 2) * (i * 7);
        const distanceY2 = currentY / (window.innerHeight / 2) * (i * 7);
        gsap.to(img, {
          duration: 0,
          ease: "power2.inOut",
          transform: `translate(${-distanceX2}%, ${-distanceY2}%)`
        });
      });
      const distanceX = currentHolderX / (window.innerWidth / 2) * 100;
      const distanceY = currentHolderY / (window.innerHeight / 2) * 50;
      gsap.to(newHeroImageHolder, {
        duration: 0,
        ease: "power2.inOut",
        xPercent: -distanceX / 100,
        yPercent: -distanceY / 100
      });
      requestAnimationFrame(animateImages);
    }
    animateImages();
  };
  var flipVideoAnimation = () => {
    const newHeroImageHolder = document.querySelector(
      ".section_hero-home .hero-home_bg"
    );
    const heroImage = document.querySelector(".hero-mask_fig:has(video)");
    const sectionTitle = document.querySelector(".section_hero-home .hero-home_title");
    const sectionDes = document.querySelector(".section_hero-home .hero-home_content p");
    if (!newHeroImageHolder || !heroImage || !sectionTitle || !sectionDes)
      return;
    const state = Flip.getState(heroImage);
    newHeroImageHolder.appendChild(heroImage);
    const mm = gsap.matchMedia();
    const textTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: (i) => 1 - Math.pow(1 - i, 4)
      }
    });
    mm.add("(min-width:768px)", () => {
      gsap.set(sectionTitle, {
        textWrap: "nowrap"
      });
    });
    mm.add("(max-width:768px)", () => {
      gsap.set(sectionTitle, {
        textWrap: "wrap"
      });
    });
    const titleSplit = new SplitText(sectionTitle, {
      type: "words,lines",
      mask: "lines"
    });
    const desSplit = new SplitText(sectionDes, {
      type: "words,lines",
      mask: "lines"
    });
    textTl.fromTo(
      heroImage?.querySelector(".u-overlay"),
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 1
      }
    ).fromTo(
      titleSplit.lines,
      {
        yPercent: 100
      },
      {
        yPercent: 0
      },
      "-=.5"
    ).fromTo(
      desSplit.lines,
      {
        yPercent: 100
      },
      {
        yPercent: 0
      },
      "-=.75"
    );
    ScrollTrigger.create({
      trigger: newHeroImageHolder,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      markers: false,
      animation: Flip.from(state, {
        duration: 1,
        ease: "power2.inOut",
        x: 0,
        y: 0,
        scale: false
      })
    });
    ScrollTrigger.create({
      trigger: newHeroImageHolder,
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      markers: false,
      animation: gsap.to(heroImage, {
        border: "0"
      })
    });
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: newHeroImageHolder,
        start: "top 20%",
        markers: false,
        animation: textTl,
        toggleActions: "play none play reverse"
      });
    });
    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.create({
        trigger: newHeroImageHolder,
        start: "top 40%",
        markers: false,
        animation: textTl,
        toggleActions: "play none play reverse"
      });
    });
  };
  var introAnimation = () => {
    const svg = document.querySelector(".hero-mask_logo");
    const mobSvg = document.querySelector(".header_logo.mob");
    const images = document.querySelectorAll(".hero-mask_fig-wrap .hero-mask_fig");
    const scrollTexts = document.querySelectorAll(".hero-mask_footer");
    if (!svg && !mobSvg || images.length === 0)
      return;
    const tl = gsap.timeline();
    const scrollTextLines = Array.from(scrollTexts).map(
      (scrollText) => new SplitText(scrollText, {
        type: "lines",
        mask: "lines"
      }).lines
    );
    const mm = gsap.matchMedia();
    gsap.set([svg, mobSvg], {
      overflow: "hidden"
    });
    mm.add("(min-width: 768px)", () => {
      tl.fromTo(
        svg?.querySelectorAll("path"),
        {
          yPercent: 100
        },
        {
          yPercent: 0,
          delay: 0.5,
          duration: 1,
          ease: "expo.out"
        }
      );
    });
    mm.add("(max-width: 767px)", () => {
      tl.fromTo(
        mobSvg?.querySelectorAll("path"),
        {
          yPercent: 250
        },
        {
          yPercent: 0,
          delay: 0.5,
          // duration: 1,
          stagger: 0.05,
          ease: "expo.out"
        }
      );
    });
    tl.fromTo(
      images,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        stagger: 0.05,
        ease: "expo.out"
      },
      "-=.5"
    ).fromTo(
      scrollTextLines,
      {
        yPercent: 100
      },
      {
        yPercent: 0
      },
      "-=.5"
    );
  };
  var headerAnimation = () => {
    const header = document.querySelector(".header_bar");
    const cta = document.querySelector(".floating-cta");
    const triggerSection = document.querySelector(".section_hero-home");
    if (!header || !cta || !triggerSection)
      return;
    const tl = gsap.timeline();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      tl.fromTo(
        header,
        {
          yPercent: -100
        },
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power2.inOut"
        },
        "0"
      );
    });
    tl.fromTo(
      cta,
      {
        yPercent: 200
      },
      {
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut"
      },
      "0"
    );
    ScrollTrigger.create({
      trigger: triggerSection,
      start: "top top",
      end: "bottom bottom",
      animation: tl,
      toggleActions: "play none none reverse",
      markers: false
    });
  };
  var setupHeroIntro = () => {
    const svg = document.querySelector(".hero-mask_logo");
    const mobSvg = document.querySelector(".header_logo.mob");
    const images = document.querySelectorAll(".hero-mask_fig-wrap .hero-mask_fig");
    const scrollTexts = document.querySelectorAll(".hero-mask_footer");
    const header = document.querySelector(".header_component");
    const headerBar = document.querySelector(".header_bar");
    const cta = document.querySelector(".floating-cta");
    if (!svg && !mobSvg)
      return;
    if (images.length === 0)
      return;
    if (!cta)
      return;
    const mm = gsap.matchMedia();
    const scrollTextLines = Array.from(scrollTexts).map(
      (scrollText) => new SplitText(scrollText, {
        type: "lines",
        mask: "lines"
      }).lines
    );
    console.log({ svg, mobSvg });
    gsap.set([!svg, !mobSvg], {
      overflow: "hidden"
    });
    mm.add("(min-width: 768px)", () => {
      gsap.set(svg?.querySelectorAll("path"), {
        yPercent: 100
      });
      gsap.set(headerBar, {
        yPercent: -100
      });
    });
    mm.add("(max-width: 767px)", () => {
      gsap.set(mobSvg?.querySelectorAll("path"), {
        yPercent: 250
      });
    });
    gsap.set(images, {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
    });
    gsap.set(scrollTextLines, {
      yPercent: 100
    });
    gsap.set(cta, {
      yPercent: 200
    });
  };
  var heroImageAnimations = () => {
    const heroImage = document.querySelector(".hero-mask_fig:has(video)");
    const newHeroImageHolder = document.querySelector(
      ".section_hero-home .hero-home_bg"
    );
    if (!heroImage || !newHeroImageHolder) {
      console.log("Hero animation elements not found, skipping animations");
      return;
    }
    introAnimation();
    flipVideoAnimation();
    mouseMoveAnimation();
    headerAnimation();
  };

  // src/utils/horizontalScroll.ts
  var horizontalScroll = () => {
    if (matchMedia("(min-width: 992px)").matches === false)
      return;
    const horizontalScrollSections = document.querySelectorAll(".h-scroll_transition-wrap-wrap");
    if (horizontalScrollSections.length > 0) {
      horizontalScrollSections.forEach((section) => {
        const scrollWrapper = section.querySelector(".h-scroll_transition-wrap");
        if (!scrollWrapper)
          return;
        const tl = gsap.timeline();
        gsap.set(scrollWrapper, {
          position: "relative"
        });
        tl.to(scrollWrapper, {
          x: "100vw",
          xPercent: -100,
          ease: "none"
        });
        tl.to(".section_img-mosaic .img-mosaic_component", {
          yPercent: -90,
          ease: "none"
        });
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${scrollWrapper.getBoundingClientRect().width}`,
          scrub: true,
          markers: false,
          pin: true,
          animation: tl
        });
      });
    }
  };

  // src/utils/ImageNarrow.ts
  var imageNarrow = () => {
    const imageNarrow2 = document.querySelector(".hero_fig");
    const image = imageNarrow2?.querySelector("img");
    if (!imageNarrow2 || !image)
      return;
    const tl = gsap.timeline();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.set(imageNarrow2, {
        overflow: "hidden"
      });
      tl.to(
        imageNarrow2,
        {
          scale: 0.9
        },
        "0"
      );
      tl.to(
        image,
        {
          y: 100,
          scale: 1.2
        },
        "0"
      );
      ScrollTrigger.create({
        trigger: imageNarrow2,
        start: "top 40%",
        end: "bottom center",
        scrub: true,
        markers: false,
        animation: tl
      });
    });
  };

  // src/utils/imagesScroll.ts
  var imagesScroll = () => {
    const sections = document.querySelectorAll(".section_flashy-gallery .flashy-gallery_component");
    if (sections.length > 0) {
      sections.forEach((section) => {
        const imageWrappers = section.querySelectorAll(".flashy-gallery_fig-2-wrap");
        const images = section.querySelectorAll(".flashy-gallery_fig-2");
        const background = section.querySelector(".flashy-gallery_component-bg");
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const tl = gsap.timeline();
          tl.to(
            imageWrappers,
            {
              yPercent: -100
            },
            "0"
          ).to(
            images,
            {
              y: `-${images.length * 50}%`,
              ease: "none"
            },
            "0"
          );
          ScrollTrigger.create({
            trigger: section,
            markers: false,
            pin: true,
            scrub: true,
            start: "top top",
            end: `+=${images.length * 50}%`,
            animation: tl
          });
          ScrollTrigger.create({
            trigger: section,
            markers: false,
            scrub: true,
            start: "top top",
            end: "bottom 50%",
            animation: gsap.fromTo(background, { scaleX: 0.95 }, { scaleX: 1, duration: 0.5 }, "0")
          });
        });
        mm.add("(max-width: 767px)", () => {
          const tl = gsap.timeline();
          tl.to(images, {
            x: `-${images.length * 100}%`,
            ease: "none"
          });
          ScrollTrigger.create({
            trigger: section,
            markers: false,
            pin: true,
            scrub: true,
            start: "top top",
            end: `+=${images.length * 100}%`,
            animation: tl
          });
          ScrollTrigger.create({
            trigger: section,
            markers: false,
            scrub: true,
            start: "top top",
            end: "bottom 50%",
            animation: gsap.fromTo(background, { scaleX: 0.9 }, { scaleX: 1, duration: 0.5 }, "0")
          });
        });
      });
    }
  };

  // src/utils/map.ts
  var map;
  var markers = [];
  var infoWindow;
  var colors = {
    normal: { bg: "#FFFDF7", line: "#272516" },
    active: { bg: "#272516", line: "#FFFDF7" },
    unique: { bg: "#272516", line: "#FFFDF7" }
  };
  var pinSvgString = "";
  var activePinSvgString = "";
  var uniquePinSvgString = "";
  var initMap = async () => {
    const mapEl = document.querySelector(".the-map");
    if (!mapEl)
      return;
    const positions = getPositions();
    getDefaultPosition(mapEl, positions);
    const lats = positions.map((p) => p.position.lat);
    const lngs = positions.map((p) => p.position.lng);
    const centerPosition = {
      lat: (Math.max(...lats) + Math.min(...lats)) / 2,
      lng: (Math.max(...lngs) + Math.min(...lngs)) / 2
    };
    let mapZoom = mapEl.getAttribute("map-zoom");
    if (!mapZoom)
      mapZoom = 17;
    mapZoom = Number(mapZoom);
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(mapEl, {
      zoom: mapZoom,
      center: centerPosition,
      mapId: "DEMO_MAP_ID"
    });
    await setInfoWindow();
    readPinColors(mapEl);
    createPinSvgs();
    positions.forEach((p) => {
      createMarker(p, positions.length == 1, infoWindow);
    });
    mapInteractions(positions, infoWindow);
  };
  var getPositions = () => {
    const mapCoordWraps = document.querySelectorAll("[the-map-coord-wrap]");
    const positions = [];
    mapCoordWraps.forEach((w) => {
      const name = w.getAttribute("title") ?? "No name";
      let lat = w.getAttribute("lat");
      let lng = w.getAttribute("lng");
      const slug = w.getAttribute("slug");
      if (!lat || !lng || !slug)
        return;
      lat = Number(lat);
      lng = Number(lng);
      if (isNaN(lat) || isNaN(lng))
        return;
      positions.push({
        unique: false,
        name,
        slug,
        position: {
          lat,
          lng
        }
      });
    });
    return positions;
  };
  var getDefaultPosition = (mapEl, positions) => {
    let lat = mapEl.getAttribute("default-lat");
    let lng = mapEl.getAttribute("default-lng");
    if (!lat || !lng)
      return;
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng))
      return;
    const name = mapEl.getAttribute("default-title") ?? "No name";
    positions.push({
      unique: true,
      name,
      position: {
        lat,
        lng
      }
    });
  };
  var setInfoWindow = async () => {
    const { InfoWindow } = await google.maps.importLibrary("maps");
    infoWindow = new InfoWindow();
  };
  var createMarker = async (p, active, infoWindow2) => {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const parser = new DOMParser();
    const svgHtml = p.unique ? uniquePinSvgString : active ? activePinSvgString : pinSvgString;
    const pinSvg = parser.parseFromString(svgHtml, "image/svg+xml").documentElement;
    const marker = new AdvancedMarkerElement({
      map,
      position: p.position,
      content: pinSvg,
      title: p.name,
      gmpClickable: true
    });
    markers.push({ marker, slug: p.slug });
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
      infoWindow2.close();
      infoWindow2.setContent(marker.title);
      infoWindow2.open(marker.map, marker);
    });
    if (p.unique) {
      marker.targetElement.querySelector("svg").style.transform = "scale(1.5)";
      marker.targetElement.style.zIndex = "202020";
    }
  };
  var mapInteractions = (positions, infoWindow2) => {
    const mapCoordWraps = document.querySelectorAll("[the-map-coord-wrap]");
    mapCoordWraps.forEach((w) => {
      w.addEventListener("click", () => {
        infoWindow2.close();
        let slug = "";
        if (w.classList.contains("is-active")) {
          w.classList.remove("is-active");
        } else {
          slug = w.getAttribute("slug");
          if (!slug)
            return;
          w.classList.add("is-active");
        }
        markers.forEach((m) => {
          const uniquePin = positions.filter((p) => p.unique);
          if (uniquePin.slug == m.slug)
            return;
          const styles = m.slug === slug ? {
            transform: "scale(1.5)",
            stroke: colors.active.line,
            fill: colors.active.bg,
            zIndex: "101010"
          } : {
            transform: "scale(1)",
            stroke: colors.normal.line,
            fill: colors.normal.bg,
            zIndex: "1"
          };
          m.marker.targetElement.querySelector("svg").style.transform = styles.transform;
          m.marker.targetElement.style.zIndex = styles.zIndex;
          m.marker.targetElement.querySelectorAll("svg path").forEach((p) => p.style.stroke = styles.stroke);
          m.marker.targetElement.querySelectorAll("svg circle").forEach((c) => c.style.fill = styles.fill);
        });
        mapCoordWraps.forEach((ow) => {
          if (ow !== w)
            ow.classList.remove("is-active");
        });
      });
    });
  };
  var readPinColors = (mapEl) => {
    const c0 = mapEl.getAttribute("color-pin") ?? null;
    const c1 = mapEl.getAttribute("color-pin-line") ?? null;
    const c2 = mapEl.getAttribute("color-active-pin") ?? null;
    const c3 = mapEl.getAttribute("color-active-pin-line") ?? null;
    const c4 = mapEl.getAttribute("color-unique-pin") ?? null;
    const c5 = mapEl.getAttribute("color-unique-pin-line") ?? null;
    if (c0)
      colors.normal.bg = c0;
    if (c1)
      colors.normal.line = c1;
    if (c2)
      colors.active.bg = c2;
    if (c3)
      colors.active.line = c3;
    if (c4)
      colors.unique.bg = c4;
    if (c5)
      colors.unique.line = c5;
  };
  var createPinSvgs = () => {
    pinSvgString = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 300ms ease-in-out;">
<circle cx="18" cy="18" r="18" fill="${colors.normal.bg}" style="transition: fill 300ms ease-in-out"/>
<path d="M26 16.5555C26 22.7778 18 28.1111 18 28.1111C18 28.1111 10 22.7778 10 16.5555C10 14.4338 10.8429 12.399 12.3431 10.8987C13.8434 9.3984 15.8783 8.55554 18 8.55554C20.1217 8.55554 22.1566 9.3984 23.6569 10.8987C25.1571 12.399 26 14.4338 26 16.5555Z" stroke="${colors.normal.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
<path d="M18.0002 19.2222C19.4729 19.2222 20.6668 18.0283 20.6668 16.5555C20.6668 15.0828 19.4729 13.8889 18.0002 13.8889C16.5274 13.8889 15.3335 15.0828 15.3335 16.5555C15.3335 18.0283 16.5274 19.2222 18.0002 19.2222Z" stroke="${colors.normal.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
</svg>
`;
    activePinSvgString = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 300ms ease-in-out; transform: scale(1.5);">
<circle cx="18" cy="18" r="18" fill="${colors.active.bg}" style="transition: fill 300ms ease-in-out"/>
<path d="M26 16.5555C26 22.7778 18 28.1111 18 28.1111C18 28.1111 10 22.7778 10 16.5555C10 14.4338 10.8429 12.399 12.3431 10.8987C13.8434 9.3984 15.8783 8.55554 18 8.55554C20.1217 8.55554 22.1566 9.3984 23.6569 10.8987C25.1571 12.399 26 14.4338 26 16.5555Z" stroke="${colors.active.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
<path d="M18.0002 19.2222C19.4729 19.2222 20.6668 18.0283 20.6668 16.5555C20.6668 15.0828 19.4729 13.8889 18.0002 13.8889C16.5274 13.8889 15.3335 15.0828 15.3335 16.5555C15.3335 18.0283 16.5274 19.2222 18.0002 19.2222Z" stroke="${colors.active.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
</svg>
`;
    uniquePinSvgString = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 300ms ease-in-out;">
<circle cx="18" cy="18" r="18" fill="${colors.unique.bg}" style="transition: fill 300ms ease-in-out"/>
<path d="M26 16.5555C26 22.7778 18 28.1111 18 28.1111C18 28.1111 10 22.7778 10 16.5555C10 14.4338 10.8429 12.399 12.3431 10.8987C13.8434 9.3984 15.8783 8.55554 18 8.55554C20.1217 8.55554 22.1566 9.3984 23.6569 10.8987C25.1571 12.399 26 14.4338 26 16.5555Z" stroke="${colors.unique.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
<path d="M18.0002 19.2222C19.4729 19.2222 20.6668 18.0283 20.6668 16.5555C20.6668 15.0828 19.4729 13.8889 18.0002 13.8889C16.5274 13.8889 15.3335 15.0828 15.3335 16.5555C15.3335 18.0283 16.5274 19.2222 18.0002 19.2222Z" stroke="${colors.unique.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
</svg>
`;
  };

  // src/utils/mapNeeds.ts
  var mapNeeds = () => {
    const mapEl = document.querySelector(".the-map");
    if (!mapEl)
      return;
    ((g) => {
      var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
      b = b[c] || (b[c] = {});
      var d = b.maps || (b.maps = {}), r = /* @__PURE__ */ new Set(), e = new URLSearchParams(), u = () => h || (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => h = n(Error(p + " could not load."));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
      d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
    })({ key: "AIzaSyCtT3ZZCu-VDKcrGFpkNgHekdVwAPlBoNE", v: "weekly" });
  };

  // src/utils/modals.ts
  var modals = () => {
    const modalButtons = document.querySelectorAll('[button-function="modal-open"]');
    modalButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const type = button.getAttribute("button-function-arg1");
        const name = button.getAttribute("button-function-arg2");
        const modal = document.querySelector(`[modal][modal-type=${type}][modal-name=${name}]`);
        modal?.setAttribute("is-open", "");
        document.body.style.top = `-${window.scrollY}px`;
        document.body.classList.add("no-scroll");
        stopSmoothScroll();
      });
    });
    const modalCloseButtons = document.querySelectorAll("[modal-close]");
    modalCloseButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        let scrollY = document.body.style.top;
        scrollY = parseInt(scrollY || "0") * -1;
        button.closest("[modal]")?.removeAttribute("is-open");
        document.body.classList.remove("no-scroll");
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
        startSmoothScroll();
      });
    });
  };

  // src/utils/removeOrphans.ts
  function preventOrphans(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element.hasAttribute("ignore-orphan"))
        return;
      if (!element.textContent)
        return;
      if (element.children.length)
        return;
      const textContent = element.textContent;
      const words = textContent.split(" ");
      if (words.length < 2)
        return;
      const lastTwoWords = words.slice(-2).join("\xA0");
      const remainingWords = words.slice(0, -2).join(" ");
      element.innerHTML = `${remainingWords} ${lastTwoWords}`;
    });
  }
  var removeOrphans = () => {
    preventOrphans("p");
    preventOrphans(".orphan-free, [orphan-free]");
    preventOrphans("h1, h2, h3, h4, h5, h6");
  };

  // src/utils/sortItems.ts
  var sortItems = () => {
    const parents = document.querySelectorAll("[data-sort]");
    parents.forEach((parent) => {
      const children = parent.querySelectorAll("[data-sort-order]");
      children.forEach((child) => {
        const sort = child.getAttribute("data-sort-order");
        if (!sort)
          return;
        child.style.order = sort;
      });
    });
  };

  // src/utils/roomsCards.ts
  var roomsCards = () => {
    const roomsCards2 = document.querySelector(".rooms-cards-animation");
    if (!roomsCards2)
      return;
    const headerTitle = roomsCards2.querySelector(".slider-1_header h2");
    const headerDescription = roomsCards2.querySelector(".slider-1_content p");
    const buttons = roomsCards2.querySelectorAll(".slider-1_nav a.slider-1_nav-button");
    const cards = roomsCards2.querySelectorAll(".slider-1_item");
    if (!headerTitle || !headerDescription || cards.length === 0)
      return;
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
    const titleSplits = Array.from(cards).map((card) => {
      const title = card.querySelector(".slider-1_card-header h3");
      const titlesSplit = new SplitText(title, {
        type: "words,lines",
        mask: "lines"
      });
      return titlesSplit.lines;
    });
    const descriptionSplits = Array.from(cards).map((card) => {
      const description = card.querySelector(".text-rich-text p ");
      const descriptionsSplit = new SplitText(description, {
        type: "words,lines",
        mask: "lines"
      });
      return descriptionsSplit.lines;
    });
    const cardsImages = Array.from(cards).map(
      (card) => card.querySelector(".slider-1_item-fig")
    );
    const cardsButtonLinks = Array.from(cards).map(
      (card) => card.querySelector(".slider-1_card-footer a")
    );
    const headerTitleSplit = new SplitText(headerTitle, {
      type: "words,lines",
      mask: "lines"
    });
    const headerDescriptionSplit = new SplitText(headerDescription, {
      type: "words,lines",
      mask: "lines"
    });
    gsap.set(buttons[0].parentElement, {
      overflow: "hidden"
    });
    cards.forEach((card) => {
      const button = card.querySelector(".slider-1_card-footer");
      gsap.set(button, {
        overflow: "hidden"
      });
    });
    tl.add("header", 0);
    tl.add("cards", 0.75);
    tl.fromTo(
      headerTitleSplit.lines,
      {
        yPercent: 100
      },
      {
        yPercent: 0
      },
      "header"
    ).fromTo(
      headerDescriptionSplit.lines,
      {
        yPercent: 100
      },
      {
        yPercent: 0,
        stagger: 0.1
      },
      "header+=.15"
    ).fromTo(
      buttons,
      {
        yPercent: 100
      },
      {
        yPercent: 0
      },
      "header+=.15"
    ).fromTo(
      cardsImages,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        stagger: 0.05
      },
      "cards"
    ).fromTo(
      titleSplits,
      {
        yPercent: 100
      },
      {
        yPercent: 0
      },
      "cards+=.15"
    ).fromTo(
      descriptionSplits,
      {
        yPercent: 100
      },
      {
        yPercent: 0,
        stagger: 0.05
      },
      "cards+=.5"
    ).fromTo(
      cardsButtonLinks,
      {
        yPercent: 100
      },
      {
        yPercent: 0
      },
      "cards+=.5"
    );
    ScrollTrigger.create({
      trigger: roomsCards2,
      start: "top 70%",
      // end: 'bottom 50%',
      markers: false,
      animation: tl
    });
  };

  // src/utils/swiperSliders.ts
  var swiperSliders = () => {
    const sliderWrapperControllable = document.querySelectorAll("[swiper_slider_controllable]");
    sliderWrapperControllable.forEach((slider) => {
      const swiperEl = slider.querySelector("[swiper]");
      const swiperWrapper = slider.querySelector("[swiper-wrapper]");
      const swiperSlides = slider.querySelectorAll("[swiper-slide]");
      if (!swiperEl)
        return;
      swiperEl.classList.add("swiper");
      swiperWrapper?.classList.add("swiper-wrapper");
      swiperSlides.forEach((s) => s.classList.add("swiper-slide"));
    });
    const sliderWrapper = document.querySelectorAll("[swiper_slider]");
    sliderWrapper.forEach((slider) => {
      const swiperEl = slider.querySelector("[swiper]");
      const isDefault = swiperEl?.hasAttribute("swiper-default");
      const isAuto = swiperEl?.hasAttribute("swiper-auto");
      const swiperWrapper = slider.querySelector("[swiper-wrapper]");
      const swiperSlides = slider.querySelectorAll("[swiper-slide]");
      const nextEl = slider.querySelector("[swiper-button-next]") ?? null;
      const prevEl = slider.querySelector("[swiper-button-prev]") ?? null;
      const isController = swiperEl?.hasAttribute("swiper-controller");
      let swiper = null;
      if (!swiperEl)
        return;
      swiperEl.classList.add("swiper");
      swiperWrapper?.classList.add("swiper-wrapper");
      swiperSlides.forEach((s) => s.classList.add("swiper-slide"));
      if (isDefault) {
        swiper = new Swiper(swiperEl, {
          loop: true,
          speed: 1e3,
          slidesPerView: "auto",
          grabCursor: true,
          watchSlidesProgress: true,
          navigation: {
            prevEl,
            nextEl
          }
        });
      } else if (isAuto) {
        swiper = new Swiper(swiperEl, {
          loop: true,
          speed: 1e3,
          effect: "fade",
          fadeEffect: {
            crossFade: true
          },
          spaceBetween: 0,
          slidesPerView: "auto",
          autoplay: {
            delay: 1e3,
            disableOnInteraction: false
          },
          grabCursor: false,
          watchSlidesProgress: false,
          navigation: {
            prevEl,
            nextEl
          }
        });
      }
      if (swiper && isController) {
        const controlId = swiperEl.getAttribute("swiper-control-id");
        if (!controlId)
          return;
        const syncedSwiper = document.querySelector(
          `[swiper-controllable][swiper-control-id="${controlId}"]`
        );
        if (!syncedSwiper)
          return;
        const controllableSwiper = new Swiper(syncedSwiper, {
          loop: true,
          effect: "fade",
          fadeEffect: {
            crossFade: true
          },
          slidesPerView: "auto",
          grabCursor: false,
          watchSlidesProgress: false,
          disableOnInteraction: false
        });
        swiper.controller.control = controllableSwiper;
      }
    });
  };

  // src/utils/colorScrollForHScroll.ts
  var checkElementOverlap = () => {
    const header = document.querySelector(".header");
    const target = document.querySelector(".section_img-mosaic.is-transition");
    if (!header || !target) {
      console.warn("Required elements not found.");
      return;
    }
    function isIntersecting(rect1, rect2) {
      return !(rect1.bottom < rect2.top || rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.left > rect2.right);
    }
    function applyCSSVariablesToBody(variables) {
      if (!variables || typeof variables !== "object") {
        console.warn("Invalid input: expected an object of CSS variables.");
        return;
      }
      Object.entries(variables).forEach(([key, value]) => {
        document.body.style.setProperty(key, value);
      });
    }
    function updateIntersectionStatus() {
      const headerRect = header.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (isIntersecting(headerRect, targetRect)) {
        applyCSSVariablesToBody(window.COLOR_THEMES[1]);
      } else {
        applyCSSVariablesToBody(window.COLOR_THEMES[0]);
      }
    }
    window.__overlapListeners = () => {
      window.addEventListener("scroll", updateIntersectionStatus, { passive: true });
      window.addEventListener("resize", updateIntersectionStatus);
      updateIntersectionStatus();
    };
    window.__removeOverlapListeners = () => {
      window.removeEventListener("scroll", updateIntersectionStatus);
      window.removeEventListener("resize", updateIntersectionStatus);
    };
    window.__overlapListeners();
  };
  var colorScrollForHScroll = () => {
    if (!window.COLOR_THEMES)
      return;
    const scrollWrap = document.querySelector(".h-scroll_transition-wrap-wrap");
    if (!scrollWrap) {
      console.warn(".h-scroll_transition-wrap-wrap not found.");
      return;
    }
    const scrollWrapper = scrollWrap.querySelector(".h-scroll_transition-wrap");
    ScrollTrigger.create({
      trigger: scrollWrap,
      start: "top top",
      end: `+=${scrollWrapper ? scrollWrapper.getBoundingClientRect().width : 0}`,
      onEnter: () => checkElementOverlap(),
      onEnterBack: () => checkElementOverlap(),
      onLeave: () => {
        if (typeof window.__removeOverlapListeners === "function") {
          window.__removeOverlapListeners();
        }
      },
      onLeaveBack: () => {
        if (typeof window.__removeOverlapListeners === "function") {
          window.__removeOverlapListeners();
        }
      }
    });
  };

  // src/utils/intro.ts
  var intro = () => {
    return new Promise(async (resolve) => {
      const lottieElement = document.querySelector("[data-lottie]");
      if (!lottieElement) {
        console.log("No lottie element found, skipping intro animation");
        resolve();
        return;
      }
      const links = lottieElement.getAttribute("data-lottie").split(",");
      const randomLink = links[Math.floor(Math.random() * links.length)];
      console.log({ randomNumber: Math.floor(Math.random() * links.length) });
      const { DotLottie } = await import(
        // @ts-ignore
        "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@latest/+esm"
      );
      const target = document.querySelector("#intro");
      console.log(target);
      const canvas = document.createElement("canvas");
      canvas.style.cssText = `
      width: 100%;
    `;
      canvas.id = "lottie-animation";
      target?.appendChild(canvas);
      const dotLottie = new DotLottie({
        canvas,
        src: randomLink,
        autoplay: true
      });
      dotLottie.addEventListener("complete", () => {
        gsap.to("#intro", {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            target?.remove();
            resolve();
          }
        });
      });
    });
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const isHomePage = document.querySelector("[data-lottie]");
    if (isHomePage) {
      setupHeroIntro();
      intro().then(() => {
        heroImageAnimations();
      });
    }
    mapNeeds();
    sortItems();
    removeOrphans();
    fsCmsFilter();
    floatingMenu();
    gsapSmoothScroll();
    accordion();
    gsapBasicAnimations();
    swiperSliders();
    diningSlider();
    modals();
    dualImage();
    roomsCards();
    horizontalScroll();
    imagesScroll();
    imageNarrow();
    colorScroll();
    colorScrollForHScroll();
    setTimeout(() => {
      initMap();
    }, 1e3);
  });
})();
//# sourceMappingURL=index.js.map
