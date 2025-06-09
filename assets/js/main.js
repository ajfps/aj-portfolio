function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: false,
});

sr.reveal(".featured-text-card", {});
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });

sr.reveal(".project-box", { interval: 200 });

sr.reveal(".top-header", {});

const srLeft = ScrollReveal({
  origin: "left",
  distance: "80px",
  duration: 2000,
  reset: false,
});

srLeft.reveal(".profile-card", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

const srRight = ScrollReveal({
  origin: "right",
  distance: "80px",
  duration: 2000,
  reset: false,
});

srRight.reveal(".form-control", { delay: 100 });

sr.reveal(".skills-card h3", { delay: 50 });
sr.reveal(".skills-category h4", { interval: 100, delay: 150 });
sr.reveal(".skill-item", {
  interval: 30,
  duration: 800,
  easing: "ease-out",
  reset: false,
  viewFactor: 0.2,
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const navHeader = document.getElementById("header");

function scrollActive() {
  const scrollY = window.scrollY;
  const navHeader = document.getElementById("header");
  let currentSectionId = null;
  let maxSectionTop = -Infinity;

  sections.forEach((current) => {
    let sectionTop = current.offsetTop - navHeader.offsetHeight - 1;
    if (current.getAttribute("id") === "about") {
      sectionTop -= 20;
    }
    if (scrollY >= sectionTop && sectionTop > maxSectionTop) {
      maxSectionTop = sectionTop;
      currentSectionId = current.getAttribute("id");
    }
  });

  navLinks.forEach((link) => link.classList.remove("active-link"));
  if (currentSectionId) {
    document
      .querySelector(`.nav-menu a[href*='${currentSectionId}']`)
      .classList.add("active-link");
  }
}

window.addEventListener("scroll", scrollActive);
window.addEventListener("load", scrollActive);

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navHeight = navHeader.offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      const menuBtn = document.getElementById("myNavMenu");
      if (menuBtn.classList.contains("responsive")) {
        myMenuFunction();
      }
    }
  });
});

const aboutTabBtns = document.querySelectorAll(".about-tab-btn");
const aboutTabContents = document.querySelectorAll(".about-tab-content");

aboutTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    aboutTabBtns.forEach((b) => b.classList.remove("active"));
    aboutTabContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");

    const tabId = btn.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");

    sr.sync();
  });
});

var typed = new Typed(".typed-name", {
  strings: ["Aaron Geron"],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 1000,
  loop: false,
  showCursor: false,
  onComplete: (self) => {
    console.log(
      "Aaron Geron Typed.js instance complete. Initializing Software Developer Typed.js instance."
    );

    new Typed(".typed-title", {
      strings: ["Software Developer"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      loop: false,
      showCursor: true,
      onComplete: (self) => {
        console.log("Software Developer Typed.js instance complete.");
      },
    });
  },
});
