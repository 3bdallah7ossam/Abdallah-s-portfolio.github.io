// 1. Animated changing text (مع حماية من الأخطاء)
let words = document.querySelectorAll(".word");
if (words.length > 0) {
  words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.className = "letter";
      word.append(span);
    });
  });

  let currentWordIndex = 0;
  let maxWordIndex = words.length - 1;
  words[currentWordIndex].style.opacity = "1";

  let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
      setTimeout(() => { letter.className = "letter out"; }, i * 80);
    });

    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
      letter.className = "letter behind";
      setTimeout(() => { letter.className = "letter in"; }, 340 + i * 80);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
  };

  changeText();
  setInterval(changeText, 3000);
}

// 2. Active menu on scroll
let menuLi = document.querySelectorAll("header ul li a");
let sections = document.querySelectorAll("section");

function activeMenu() {
  if (sections.length === 0 || menuLi.length === 0) return;
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
  menuLi.forEach((a) => a.classList.remove("active"));
  if (len >= 0 && menuLi[len]) menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

// 3. Sticky header
const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("Sticky", window.scrollY > 50);
  });
}

// 4. Mobile menu
const menuIcon = document.getElementById("menu-icon");
const navlist = document.querySelector(".navlist");
if (menuIcon && navlist) {
  menuIcon.addEventListener("click", function () {
    navlist.classList.toggle("open");
    this.classList.toggle("bx-x");
  });
}

// 5. Scroll reveal (إظهار العناصر عند التمرير)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
});

document.querySelectorAll(".scroll-scale, .scroll-bottom").forEach((el) => observer.observe(el));

// 6. Portfolio Image Slider Logic (السلايدر الخاص بالمشاريع)
const sliders = {};

// جعل الدالة Global عشان الـ HTML يشوفها بدون مشاكل
window.moveSlide = function(direction, sliderId) {
  if (sliders[sliderId] === undefined) {
    sliders[sliderId] = 0;
  }
  
  const wrapper = document.getElementById(sliderId);
  if (!wrapper) return; // حماية لو العنصر مش موجود
  
  const totalSlides = wrapper.children.length;
  if (totalSlides === 0) return;
  
  // حساب رقم الصورة الجديدة
  sliders[sliderId] += direction;
  
  // الرجوع للبداية أو النهاية
  if (sliders[sliderId] >= totalSlides) {
    sliders[sliderId] = 0;
  } else if (sliders[sliderId] < 0) {
    sliders[sliderId] = totalSlides - 1;
  }
  
  // تحريك الصور
  const percentage = -(sliders[sliderId] * 100);
  wrapper.style.transform = `translateX(${percentage}%)`;
};
