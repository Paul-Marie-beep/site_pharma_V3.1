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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Snow effect

const NUMBER_OF_SNOWFLAKES = 300;
const MAX_SNOWFLAKE_SIZE = 5;
const MAX_SNOWFLAKE_SPEED = 2;
const SNOWFLAKE_COLOUR = "#ddd";
const snowflakes = [];

//Le <canvas> est un élément qui peut être utilisé pour dessiner des graphiques, des images et des animations sur une page web.
const canvas = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = "0px";
// We do not want the snowflakes to prevent the user from interacting with the page
canvas.style.pointerEvents = "none";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// we add the canvas element as the last child of the body element
document.body.appendChild(canvas);

//La méthode getContext est appelée sur un élément <canvas> pour obtenir le contexte de rendu. Le paramètre '2d' indique que vous souhaitez obtenir un contexte de rendu bidimensionnel, qui est utilisé pour le dessin en 2D.
const context = canvas.getContext("2d");

// By adding parenthesis to the arrow function, it will return an object
const createSnowFlake = () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  // We add +1 to be sure that the radius will never be 0
  radius: Math.floor(Math.random() * MAX_SNOWFLAKE_SIZE) + 1,
  colour: SNOWFLAKE_COLOUR,
  speed: Math.random() * MAX_SNOWFLAKE_SPEED + 3,
  sway: Math.random() - 0.5,
  // substract 0.5 allows us to get a value that's randomly positive or negative
});

const drawSnowFlake = (snowflake) => {
  context.beginPath();
  context.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  context.fillStyle = snowflake.colour;
  context.fill();
  context.closePath();
};

const updateSnowflake = (snowflake) => {
  snowflake.y += snowflake.speed;
  snowflake.x += snowflake.sway;
  if (snowflake.y > canvas.height) {
    Object.assign(snowflake, createSnowFlake());
  }
};

const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach((snowflake) => {
    updateSnowflake(snowflake);
    drawSnowFlake(snowflake);
  });
  requestAnimationFrame(animate);
};

for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
  snowflakes.push(createSnowFlake());
}

//We want to make sure that the animation will be seen on the whole window width in case the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// To make sure that the animation will carry on if we scroll
window.addEventListener("scroll", () => {
  canvas.style.top = `${window.scrollY}px`;
});

animate();
