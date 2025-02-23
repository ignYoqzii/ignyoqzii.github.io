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

// Fetch and display website views count
async function fetchViewsCount() {
    const response = await fetch('https://www.googleapis.com/analytics/v3/data/ga?ids=ga:VIEW_ID&start-date=30daysAgo&end-date=today&metrics=ga:pageviews', {
        headers: {
            'Authorization': 'Bearer ACCESS_TOKEN'
        }
    });
    const data = await response.json();
    const viewsCount = data.totalsForAllResults['ga:pageviews'];
    document.getElementById('viewsCount').textContent = viewsCount;
}

// Call the function to fetch and display views count
fetchViewsCount();