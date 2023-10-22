"use strict";
// Global Variable
const landingPage = document.querySelector(".landing-page");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const settingBox = document.querySelector(".settingBox");
const navLinks = document.querySelectorAll(".header-area .links li a");
const navbar = document.getElementById("navbar");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    navLinks.forEach((navLink) => {
      navLink.classList.remove('active');
    });
    link.classList.add('active');
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});



// Setting Box
if (closeBtn && openBtn) {
  closeBtn.addEventListener("click", function () {
    settingBox.style.left = "-400px";
  });

  openBtn.addEventListener("click", function () {
    const currentLeft = parseInt(window.getComputedStyle(settingBox).left);

    if (currentLeft === -400) {
      settingBox.style.left = "0px";
    } else if (currentLeft === 0) {
      settingBox.style.left = "-400px";
    }
  });
}

// Switch Colors
const colorsList = document.querySelectorAll(".colorsList li");
if (colorsList.length > 0) {
  let mainColors = localStorage.getItem("colorOption");
  if (mainColors !== null) {
    document.documentElement.style.setProperty("--mainColor", mainColors);
    colorsList.forEach((element) => {
      element.classList.remove("active");
      if (element.dataset.color == mainColors) {
        element.classList.add("active");
      }
    });
  }
  colorsList.forEach((li) => {
    li.addEventListener("click", (e) => {
      document.documentElement.style.setProperty(
        "--mainColor",
        e.target.dataset.color
      );
      localStorage.setItem("colorOption", e.target.dataset.color);
      handleActive(e.target);
    });
  });
}

let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];
let backgroundOption = true;
let backgroundInterval;

function randomImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(function () {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage = `url('./img/${imgArray[randomNumber]}')`;
    }, 3000);
  }
}
randomImg();

// switch random background option

const randomBgSpans = document.querySelectorAll(".randomBackground span");

let bgLocalStorage = localStorage.getItem("bgOption");

if (bgLocalStorage !== null) {
  document.querySelectorAll(".randomBackground span").forEach((element) => {
    element.classList.remove("active");
  });
  if (bgLocalStorage === "true") {
    backgroundOption = true;
    randomImg();
    document.querySelector(".randomBackground .yes").classList.add("active");
  } else {
    backgroundOption = false;
    clearInterval(backgroundInterval);
    document.querySelector(".randomBackground .no").classList.add("active");
  }
}

function setActive(span) {
  const activeSpans = span.parentElement.querySelectorAll(".active");
  activeSpans.forEach((activeSpan) => activeSpan.classList.remove("active"));
  span.classList.add("active");
}

randomBgSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    setActive(e.target);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomImg();
      localStorage.setItem("bgOption", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("bgOption", false);
    }
  });
});

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skillBox .skillProgress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);
    if (img.alt !== null) {
      let imgHeader = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeader.appendChild(imgText);
      popupBox.appendChild(imgHeader);
      let closeButton = document.createElement("span");
      let closeButtonText = document.createTextNode("X");
      closeButton.appendChild(closeButtonText);
      closeButton.className = "close-btn";
      popupBox.appendChild(closeButton);
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinkes = document.querySelectorAll(".links a");

function toggleMenu(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      // handleActive(e.target);
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

toggleMenu(allBullets);
toggleMenu(allLinkes);

// Handle Active Status

function handleActive(ele) {
  ele.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ele.classList.add("active");
}

let bulletsSpans = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalStorage = localStorage.getItem("bullets_option");

if (bulletLocalStorage !== null) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    handleActive(bulletsSpans[0]);
  } else {
    bulletsContainer.style.display = "none";
    handleActive(bulletsSpans[1]);
  }
}

bulletsSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e.target);
  });
});

const resetOptionBtn = document.querySelector(".reset-options"); // Check if it's null or the correct element

if (resetOptionBtn) {
  resetOptionBtn.addEventListener("click", function () {
    localStorage.removeItem("bullets_option");
    console.log("remove");
    localStorage.removeItem("colorOption");
    console.log("remove2");
    localStorage.removeItem("bgOption");
    window.location.reload();
  });
}

let toggleBtn = document.querySelector(".toggle-menu");
let toggleLinks = document.querySelector(".header-area .links");

toggleBtn.addEventListener("click", function (e) {
  toggleLinks.classList.toggle("open");
});

document.addEventListener("click", function (e) {
  if (e.target !== toggleBtn && e.target !== toggleLinks) {
    if (toggleLinks.classList.contains("open")) {
      toggleLinks.classList.remove("open");
    }
  }
});

toggleLinks.addEventListener("click", function (e) {
  e.stopPropagation();
});
