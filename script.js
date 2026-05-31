// --- Sticky Navbar ---
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// --- Mobile Menu Toggle ---
const menuIcon = document.getElementById("menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
  navlist.classList.toggle("open");
  menuIcon.classList.toggle("bx-x");
});

// Close menu when clicking a link
document.querySelectorAll('.navlist a').forEach(link => {
  link.addEventListener('click', () => {
    navlist.classList.remove('open');
    menuIcon.classList.remove('bx-x');
  });
});

// --- Typing Effect ---
const textArray = ["Data Analyst", "BI Developer", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function type() {
  const currentText = textArray[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typingSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
    typingSpeed = 500; // Pause before next word
  }

  setTimeout(type, typingSpeed);
}
document.addEventListener("DOMContentLoaded", type);

// --- Scroll Reveal Animation ---
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100; // point of reveal
    
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navlist a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// --- Project Image Slider ---
let slideIndexes = { 'supply-slider': 0 };

function updateSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  const slides = slider.children;
  const index = slideIndexes[sliderId];
  
  // Move slider
  slider.style.transform = `translateX(-${index * 100}%)`;
  
  // Update indicators (dots)
  const dotsContainer = document.getElementById(sliderId.replace('slider', 'indicators'));
  if (dotsContainer) {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    dots[index].classList.add('active');
  }
}

function changeSlide(direction, sliderId) {
  const slider = document.getElementById(sliderId);
  const totalSlides = slider.children.length;
  
  slideIndexes[sliderId] += direction;
  
  // Loop logic
  if (slideIndexes[sliderId] >= totalSlides) {
    slideIndexes[sliderId] = 0;
  } else if (slideIndexes[sliderId] < 0) {
    slideIndexes[sliderId] = totalSlides - 1;
  }
  
  updateSlider(sliderId);
}

function goToSlide(index, sliderId) {
  slideIndexes[sliderId] = index;
  updateSlider(sliderId);
}
