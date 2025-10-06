// ==========================================================
// 1. SCROLL REVEAL ANIMATION (KEPT)
// ==========================================================
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

// ==========================================================
// 2. COUNTER ANIMATION (MODULARIZED)
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
          // Total steps for counter is 60 frames
          const increment = Math.ceil(targetValue / 60);

          const updateCounter = () => {
            currentValue += increment;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              counter.textContent =
                currentValue === 540 ? `${currentValue}+` : currentValue;
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
setupCounters();

// ==========================================================
// 3. FAQ ACCORDION (FIXED FOR HEIGHT ANIMATION)
// ==========================================================
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
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
setupFaqAccordion();

// ==========================================================
// 4. CAROUSEL FUNCTIONALITY (MODULARIZED)
// ==========================================================
function setupCarousel() {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".project-card");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!carousel || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    // Calculate the width of the slide area (container width)
    const slideWidth = carousel.clientWidth / totalSlides;
    carousel.style.transform = `translateX(${
      -slideWidth * currentIndex * totalSlides
    }px)`;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel(); // Initial load
}
setupCarousel();

// ==========================================================
// 5. HERO PARALLAX (KEPT)
// ==========================================================
function setupHeroParallax() {
  const heroTitle = document.querySelector(".hero h1");
  const heroText = document.querySelector(".hero p");

  if (!heroTitle || !heroText) return;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    // Title moves slower than the scroll (Parallax effect)
    heroTitle.style.transform = `translateY(${scrollPosition * 0.3}px)`;

    // Text moves even slower
    heroText.style.transform = `translateY(${scrollPosition * 0.1}px)`;
  });
}
setupHeroParallax();

// ==========================================================
// 6. STARS ANIMATION (REVERTED TO ORIGINAL)
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
setupStarsAnimation();
