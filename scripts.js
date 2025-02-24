// Reveal Elements on Scroll (in + out)
const revealElements = document.querySelectorAll(".reveal");
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            // If you want them to animate out when leaving view, remove .active:
            entry.target.classList.remove("active");
        }
    });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));

// Animate Counters on Scroll
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const targetValue = parseInt(counter.getAttribute('data-target'));
            let currentValue = 0;
            const increment = Math.ceil(targetValue / 500);

            const updateCounter = () => {
                currentValue += increment;
                if (currentValue > targetValue) currentValue = targetValue;
                counter.textContent = currentValue;
                if (currentValue < targetValue) {
                    requestAnimationFrame(updateCounter);
                } else if (currentValue === 560) { // For the + sign
                    counter.textContent = `${currentValue}+`;
                }
            };
            requestAnimationFrame(updateCounter);

            // Stop observing once animated
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
        item.classList.toggle("open");
    });
});

// JavaScript for Carousel
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateCarousel() {
    const slideWidth = carousel.clientWidth;
    carousel.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);

// JavaScript for Stars Animation
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 100;
const starSpeed = 0.1;
const starSize = 2;
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let lastMouseX = mouseX;
let lastMouseY = mouseY;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  createStars();
});

window.addEventListener('mousemove', (e) => {
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
      followMouse: Math.random() < 0.5 // 50% chance to follow the mouse
    });
  }
}

function updateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const deltaX = mouseX - lastMouseX;
  const deltaY = mouseY - lastMouseY;
  stars.forEach(star => {
    if (star.followMouse) {
      // Move stars slightly based on mouse position
      star.x += star.speedX + deltaX * 0.01;
      star.y += star.speedY + deltaY * 0.01;
    } else {
      // Move stars randomly
      star.x += star.speedX;
      star.y += star.speedY;
    }

    // Wrap stars around the edges
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
  });
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  requestAnimationFrame(updateStars);
}

createStars();
updateStars();