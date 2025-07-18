document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav')) {
            navLinks.classList.remove('show');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = '';
        }
    });
});

// --- Modal popup logic for Learn More (run immediately) ---
const modal = document.getElementById('service-modal');
const modalBody = document.getElementById('service-modal-body');
const closeBtn = document.querySelector('.service-modal-close');
const modalHeading = document.getElementById('service-modal-heading');

if (modal && modalBody && closeBtn) {
    document.querySelectorAll('.learn-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const service = btn.getAttribute('data-service');
            const card = document.querySelector('.service-card[data-service="' + service + '"]');
            const info = card.querySelector('.service-extra-info').innerHTML;
            // Get icon and heading
            const icon = card.querySelector('i') ? card.querySelector('i').outerHTML : '';
            const heading = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
            modalHeading.innerHTML = icon + '<span style="margin-left:10px;">' + heading + '</span>';
            modalBody.innerHTML = info;
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalBody.innerHTML = '';
        if (modalHeading) modalHeading.innerHTML = '';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalBody.innerHTML = '';
            if (modalHeading) modalHeading.innerHTML = '';
        }
    });
}

// HERO CAROUSEL SCRIPT
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');

function showSlide(idx) {
    if (!slides.length) return;
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
    });
    // Update dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot' + (i === idx ? ' active' : '');
            dot.onclick = () => moveToSlide(i);
            dotsContainer.appendChild(dot);
        });
    }
}

function moveCarousel(dir) {
    currentSlide = (currentSlide + dir + slides.length) % slides.length;
    showSlide(currentSlide);
}

function moveToSlide(idx) {
    currentSlide = idx;
    showSlide(currentSlide);
}

// Auto-slide
let carouselInterval = setInterval(() => moveCarousel(1), 4000);

// Pause on hover
const carousel = document.getElementById('heroCarousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => moveCarousel(1), 4000);
    });
}

// Initialize
showSlide(currentSlide);

// Testimonial Slider Logic
// Read testimonials from .testimonial-data if present
let testimonials = [];
const testimonialDataDivs = document.querySelectorAll('.testimonial-data > div');
if (testimonialDataDivs.length > 0) {
  testimonials = Array.from(testimonialDataDivs).map(div => ({
    text: div.getAttribute('data-text'),
    name: div.getAttribute('data-name'),
    role: div.getAttribute('data-role')
  }));
} else {
  testimonials = [
    {
      text: "I am happy with the machine performance and varadom's support.",
      name: "VIP Car Wash",
      role: "Mangalwedha, Solapur"
    },
    {
      text: "The car wash machine is performing as expected, and I am pleased with its operation. It has been a valuable addition to my setup. Thank you!",
      name: "F k Auto Service",
      role: "Mangalore"
    },
    {
      text: "The car wash machine installed at our showroom has been a great asset. With over 100 cars being washed daily, it's saving us a lot of time. Thank you for the excellent product!",
      name: "Panchajanya Automobiles",
      role: "Pune"
    },
    {
      text: "The automatic truck wash and wheel wash systems are performing exceptionally well. They've greatly improved the efficiency of vehicle cleaning and maintenance. We're very pleased with the results. Thank you!",
      name: "Indian Army",
      role: "Shriganganagar"
    },
    {
      text: "The leakage test and gauge test systems installed at Dahod Railway Rolling Stock work shop for leakage test functioning smoothly. They've significantly improved the testing process and provided accurate results. Thank you!",
      name: "HSMLE",
      role: "Indian Railway"
    },
    {
      text: "कार वॉश मशीनमुळे आमच्या व्यवसायात चांगली वाढ झाली आहे. मशीनमुळे अधिक Customers Attract केले आहेत, आणि त्याचे देखील आमचे income वाढले आहे. व्यवसाय उत्कृष्ट Support साठी धन्यवाद!",
      name: "Dharmatma Washing Center",
      role: "Shevgaon Ahmednagar"
    },
    {
      text: "The Maintenance service for our roller bearing machine at Tirupati Railway is progressing well. Varadom's Serviceman is maintaining the machine in excellent condition.Thank you!",
      name: "Tirupati Railway",
      role: ""
    },
    {
      text: "It's been wonderful to collaborate with you! We're pleased with how the partnership is progressing, and we're confident that our combined efforts will lead to great success in the northern region. Looking forward to a fruitful future together!",
      name: "Tritech Automotives",
      role: "Delhi"
    },
    {
      text: "The car wash machine has been a great addition to our business. We've noticed an increase in customers, and the machine itself has become an attraction. Thank you!",
      name: "Magic Wash",
      role: "Chhatrapati Sambhajinagar"
    }
  ];
}
let testimonialIndex = 0;
function showTestimonial(idx) {
  const t = testimonials[idx];
  document.getElementById('testimonialText').textContent = t.text;
  document.getElementById('testimonialName').textContent = t.name;
  document.getElementById('testimonialRole').textContent = t.role;
}
function moveTestimonial(dir) {
  testimonialIndex = (testimonialIndex + dir + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
}
// Initialize
if (document.getElementById('testimonialText')) {
  showTestimonial(testimonialIndex);
}
// Auto-scroll testimonials
let testimonialInterval = setInterval(() => moveTestimonial(1), 4000);
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
  testimonialSlider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
  testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => moveTestimonial(1), 4000);
  });
} 