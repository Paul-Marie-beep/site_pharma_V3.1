"use strict";

const jumbo = document.querySelector(".jumbo");
const nav = document.querySelector(".navlinks");
const navBar = document.querySelector(".navbar");

const viewportWidthCondition = window.innerWidth < 750;

// Navbar

// Function to handle the change of opacity when we hover on the links of the navbar
const handlerover = function (event) {
  if (event.target.classList.contains("navlink")) {
    const link = event.target;
    const siblings = link.closest(".navbar").querySelectorAll(".navlink");

    siblings.forEach((element) => {
      if (element !== link) element.style.opacity = this;
    });
  } else {
    document.querySelectorAll(".navlink").forEach((element) => (element.style.opacity = 1));
  }
};

const startNavHover = function () {
  navBar.addEventListener("mouseover", handlerover.bind(0.5));
  navBar.addEventListener("mouseout", handlerover.bind(0.5));
};

if (!viewportWidthCondition) startNavHover();

// Sticky nav function
const obsCallback = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    navBar.classList.remove("nav-sticky");
  } else {
    if (entry.target.getBoundingClientRect().bottom < 0) {
      navBar.classList.add("nav-sticky");
    }
  }
};

const obsOptions = {
  threshold: 0,
};

const navObserver = new IntersectionObserver(obsCallback, obsOptions);

// The sticky nav is for bigger screens
if (!viewportWidthCondition) {
  navObserver.observe(jumbo);
}

// Apparition navbar responsive
const navSlide = function () {
  const burger = document.querySelector(".burger");
  const links = document.querySelectorAll(".navlink");

  const burgerPress = function () {
    //toggle nav
    nav.classList.toggle("nav-active");
    nav.classList.add("nav-visible");
    // Reveal the links
    links.forEach((link, index) => {
      link.style.opacity = 0;
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.3s ease forwards ${index / 7 + 1}s`;
      }
    });
    // Burger animation
    burger.classList.toggle("toggle");
  };
  burger.addEventListener("click", burgerPress);
};
navSlide();

// Supprimer une classe pour ne pas avoir d'animation quand on a déjà cliqué sur le burger et qu'on change la dimension de la page.
const removeVisibility = function () {
  if (!viewportWidthCondition) {
    nav.classList.remove("nav-visible");
  }
};
window.addEventListener("resize", removeVisibility);
