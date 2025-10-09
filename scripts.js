"use strict";

// ==========================================================
// 1. SCROLL REVEAL ANIMATION
// ==========================================================
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  const observerOptions = { threshold: 0.1 };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        // Re-reveal when scrolling back in
        entry.target.classList.remove("active");
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // Directional tagging for team cards based on grid columns
  function tagDirectionalReveals() {
    const teamGrid = document.querySelector(".team-grid");
    if (!teamGrid) return;
    const cards = Array.from(teamGrid.querySelectorAll(".team-card.reveal"));
    if (cards.length === 0) return;
    const styles = window.getComputedStyle(teamGrid);
    const template = styles.getPropertyValue("grid-template-columns");
    const colCount = template ? template.split(" ").length : 1;
    cards.forEach((card, idx) => {
      card.classList.remove("reveal-left", "reveal-right");
      if (colCount <= 1) {
        idx % 2 === 0
          ? card.classList.add("reveal-left")
          : card.classList.add("reveal-right");
      } else {
        const colIndex = idx % colCount;
        if (colIndex < colCount / 2) card.classList.add("reveal-left");
        else card.classList.add("reveal-right");
      }
    });
  }

  // Run once and on resize (debounced)
  tagDirectionalReveals();
  let tagDirTimer;
  window.addEventListener("resize", () => {
    clearTimeout(tagDirTimer);
    tagDirTimer = setTimeout(tagDirectionalReveals, 150);
  });
}

// ==========================================================
// 2. COUNTER ANIMATION
// ==========================================================
function setupCounters() {
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const targetValue = parseInt(counter.getAttribute("data-target"));
          let currentValue = 0;
          const increment = Math.ceil(targetValue / 500);

          const updateCounter = () => {
            currentValue += increment;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              counter.textContent =
                currentValue === 500 ? `${currentValue}+` : currentValue;
              // Stop observing once animated
              counterObserver.unobserve(counter);
              return;
            }
            counter.textContent = currentValue;
            requestAnimationFrame(updateCounter);
          };
          requestAnimationFrame(updateCounter);
        }
      });
    },
    { threshold: 0.7 }
  ); // High threshold to ensure it's in view

  counters.forEach((counter) => counterObserver.observe(counter));
}

// ==========================================================
// 3. FAQ ACCORDION
// ==========================================================
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      // Close all other open items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("open")) {
          otherItem.classList.remove("open");
        }
      });
      // Toggle the 'open' class to trigger the CSS height animation
      item.classList.toggle("open");
    });
  });
}

// ==========================================================
// 4. CAROUSEL FUNCTIONALITY
// ==========================================================
function setupCarousel() {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".project-card");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!carousel || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let animating = false;

  // position helper
  function applyTranslate(index) {
    const translateX = -carousel.clientWidth * index;
    carousel.style.transform = `translateX(${translateX}px)`;
  }

  function clearAnimClasses(el) {
    el.classList.remove(
      "anim-enter",
      "anim-exit",
      "anim-enter-prev",
      "anim-exit-prev"
    );
  }

  function goTo(nextIndex, direction) {
    if (animating || nextIndex === currentIndex) return;
    animating = true;
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[nextIndex];

    // ensure clean state
    clearAnimClasses(currentSlide);
    clearAnimClasses(nextSlide);

    // trigger exit on current and entry on next
    if (direction === "next") {
      currentSlide.classList.add("anim-exit");
      nextSlide.classList.add("anim-enter");
    } else {
      currentSlide.classList.add("anim-exit-prev");
      nextSlide.classList.add("anim-enter-prev");
    }

    // Move the track to the next index slightly after starting the animation
    // so the motion+transform feel cohesive
    requestAnimationFrame(() => {
      // give a tiny delay to let CSS start exit animation
      setTimeout(() => {
        applyTranslate(nextIndex);
      }, 20);
    });

    const onAnimEnd = () => {
      // cleanup classes and listeners
      currentSlide.removeEventListener("animationend", onAnimEnd);
      nextSlide.removeEventListener("animationend", onAnimEnd);
      clearAnimClasses(currentSlide);
      clearAnimClasses(nextSlide);
      currentIndex = nextIndex;
      animating = false;
    };

    // end after the entering slide finishes (longer duration)
    nextSlide.addEventListener("animationend", onAnimEnd, { once: true });
  }

  function next() {
    const ni = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
    goTo(ni, "next");
  }
  function prev() {
    const pi = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
    goTo(pi, "prev");
  }

  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  window.addEventListener("resize", () => applyTranslate(currentIndex));
  applyTranslate(currentIndex); // Initial load
}

// ==========================================================
// 5. HERO PARALLAX
// ==========================================================
function setupHeroParallax() {
  const heroTitle = document.querySelector(".hero h1");
  const heroText = document.querySelector(".hero p");

  if (!heroTitle || !heroText) return;

  const onScroll = () => {
    const scrollPosition = window.scrollY;
    // Title moves slower than the scroll (Parallax effect)
    heroTitle.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    // Text moves even slower
    heroText.style.transform = `translateY(${scrollPosition * 0.1}px)`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ==========================================================
// 6. STARS ANIMATION
// ==========================================================
function setupStarsAnimation() {
  const canvas = document.getElementById("starsCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let stars = [];
  const numStars = 100;
  const starSpeed = 0.05;
  const starSize = 2;

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  let lastMouseX = mouseX;
  let lastMouseY = mouseY;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    createStars();
  });

  window.addEventListener("mousemove", (e) => {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function createStars() {
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * starSize,
        speedX: (Math.random() - 0.5) * starSpeed,
        speedY: (Math.random() - 0.5) * starSpeed,
        // 50% chance to follow the mouse for a subtle parallax effect
        followMouse: Math.random() < 0.5,
      });
    }
  }

  function updateStars() {
    const deltaX = mouseX - lastMouseX;
    const deltaY = mouseY - lastMouseY;

    stars.forEach((star) => {
      if (star.followMouse) {
        // Move stars slightly based on mouse position (subtle parallax)
        star.x += star.speedX + deltaX * 0.01;
        star.y += star.speedY + deltaY * 0.01;
      } else {
        // Base movement
        star.x += star.speedX;
        star.y += star.speedY;
      }

      // Wrap stars around the edges
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;
    });

    // Reset mouse delta for the next frame
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.size / starSize})`;
      ctx.fill();
    });
  }

  function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
  }

  createStars();
  animate();
}

// ==========================================================
// 7. TIMELINE SCROLL ANIMATION
// ==========================================================
function setupTimelineAnimation() {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;

  // Smooth animator that eases from current to target progress
  let animating = false;
  let currentProgress = 0; // 0..100
  let targetProgress = 0; // 0..100
  let animationStart = 0;
  const easeIn = (t) => t * t; // simple ease-in; feels like "starts slow, speeds up"
  const DURATION_MS = 500; // total duration of the easing when target changes
  const START_DELAY_MS = 120; // slight delay before starting, per request

  function startAnimation(newTarget) {
    // Clamp and set target
    targetProgress = Math.max(0, Math.min(100, newTarget));

    // If we're already close, snap to avoid jitter
    if (Math.abs(targetProgress - currentProgress) < 0.1) {
      currentProgress = targetProgress;
      timeline.style.setProperty("--scroll-progress", `${currentProgress}%`);
      return;
    }

    const startFrom = currentProgress;
    const delta = targetProgress - startFrom;
    let delayedStart = false;
    let delayStartTime = 0;

    function step(ts) {
      if (!delayedStart) {
        delayStartTime = delayStartTime || ts;
        const waited = ts - delayStartTime;
        if (waited < START_DELAY_MS) {
          requestAnimationFrame(step);
          return;
        }
        delayedStart = true;
        animationStart = ts;
      }

      const elapsed = ts - animationStart;
      const t = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeIn(t);
      currentProgress = startFrom + delta * eased;
      timeline.style.setProperty("--scroll-progress", `${currentProgress}%`);
      if (t < 1) {
        animating = true;
        requestAnimationFrame(step);
      } else {
        animating = false;
      }
    }

    if (!animating) requestAnimationFrame(step);
  }

  function updateProgress() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const timelineStart = rect.top;
    const timelineEnd = rect.bottom;
    const timelineHeight = rect.height;

    // Calculate the center point of the viewport
    const viewportCenter = windowHeight / 2;

    // Calculate where the timeline intersects with the center of the viewport
    let progress = 0;
    if (timelineStart <= viewportCenter && timelineEnd >= viewportCenter) {
      // Calculate how far along the timeline the viewport center is
      progress = ((viewportCenter - timelineStart) / timelineHeight) * 100;
      progress = Math.min(Math.max(progress, 0), 100);
    } else if (timelineEnd < viewportCenter) {
      progress = 100;
    }

    // Animate towards the new target progress using easing
    startAnimation(progress);
  }

  // Update on scroll with throttling
  let ticking = false;
  document.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initial update
  updateProgress();
}

// ==========================================================
// 8. CINEMATIC HERO INTRO & SCROLL-OUT
// ==========================================================
function setupCinematicHero() {
  const hero = document.querySelector(".cinematic-hero");
  if (!hero) return;

  // Lock scroll on load for intro
  document.body.classList.add("hero-active");

  // Helper to trigger the cinematic animation
  function triggerHeroIntroAnimation() {
    hero.classList.remove("hero-out");
    hero.classList.add("hero-animate-in");
    setTimeout(() => {
      hero.classList.remove("hero-animate-in");
    }, 1500); // matches heroContentIntro duration
  }

  // Initial cinematic intro
  setTimeout(() => {
    document.body.classList.remove("hero-active");
    triggerHeroIntroAnimation();
  }, 2700); // matches total intro animation duration

  // Animate hero out on scroll, and back in when at top
  let lastHeroState = "in";
  function handleHeroScroll() {
    if (window.scrollY > window.innerHeight * 0.2) {
      if (lastHeroState !== "out") {
        hero.classList.add("hero-out");
        lastHeroState = "out";
      }
    } else {
      if (lastHeroState !== "in") {
        triggerHeroIntroAnimation();
        lastHeroState = "in";
      }
    }
  }
  window.addEventListener("scroll", handleHeroScroll, { passive: true });
}

// ==========================================================
// 9. CONTACT FORM HANDLING
// ==========================================================
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = form.email?.value.trim() || "";
    const message = form.message?.value.trim() || "";
    if (status) status.textContent = "";
    if (!email || !message) {
      if (status) {
        status.textContent = "Please fill in both fields.";
        status.style.color = "#e57373";
      }
      return;
    }
    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      if (status) {
        status.textContent = "Please enter a valid email address.";
        status.style.color = "#e57373";
      }
      return;
    }
    // Open mail client with prefilled data
    const mailto = `mailto:szryoqziiofficial@gmail.com?subject=Contact from ${encodeURIComponent(
      email
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
    if (status) {
      status.textContent = "Opening your email client...";
      status.style.color = "#6bcae8";
    }
    form.reset();
  });
  // Auto-expand textarea
  const textarea = form.message;
  if (textarea) {
    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
    // Trigger once in case of prefilled value
    textarea.dispatchEvent(new Event("input"));
  }
}

// ==========================================================
// INITIALIZATION (Run once after DOM is ready)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  setupScrollReveal();
  setupCounters();
  setupFaqAccordion();
  setupCarousel();
  setupHeroParallax();
  setupStarsAnimation();
  setupTimelineAnimation();
  setupCinematicHero();
  setupContactForm();
  setupMobileNav();
});

// ==========================================================
// 10. MOBILE NAV TOGGLE
// ==========================================================
function setupMobileNav() {
  const navContainer = document.querySelector(".nav-container");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");
  if (!navContainer || !navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navContainer.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close menu when clicking a link (use capturing for delegation safety)
  navLinks.addEventListener(
    "click",
    (e) => {
      const target = e.target;
      if (target && target.tagName === "A") {
        navContainer.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    },
    true
  );

  if (navOverlay) {
    navOverlay.addEventListener("click", () => {
      navContainer.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  }
}
