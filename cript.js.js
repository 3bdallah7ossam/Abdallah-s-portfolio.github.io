// Animated changing text
let words = document.querySelectorAll(".word");
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

// Active menu on scroll
let menuLi = document.querySelectorAll("header ul li a");
let sections = document.querySelectorAll("section");

function activeMenu() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
  menuLi.forEach((a) => a.classList.remove("active"));
  if (menuLi[len]) menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

// Sticky header
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("Sticky", window.scrollY > 50);
});

// Mobile menu
const menuIcon = document.getElementById("menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", function () {
  navlist.classList.toggle("open");
  this.classList.toggle("bx-x");
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show-items", entry.isIntersecting);
  });
});

document.querySelectorAll(".scroll-scale").forEach((el) => observer.observe(el));
document.querySelectorAll(".scroll-bottom").forEach((el) => observer.observe(el));
