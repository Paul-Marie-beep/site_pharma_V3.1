("use strict");

const navContact = document.querySelector(".navlinks__right--contact");
const categories = document.querySelector(".categories");
const items = document.querySelectorAll(".item");
const momentProducts = document.querySelector(".moment-products");
const [...momentProductsImages] = document.querySelectorAll(".product__pic");

const contact = document.getElementById("contact");

const arrowLeft = document.querySelector(".arrows__arrow--left");
const arrowRight = document.querySelector(".arrows__arrow--right");
let i = 1;
let carryOn = true;
let allowKey;

const allAfter = document.querySelectorAll(".mark");
const rightBlock = document.querySelector(".right-bloc");

const allHorairesBtn = document.querySelectorAll(".horaires-btn");
const btnContainer = document.querySelector(".horaires-btn-container");
const horairesContent = document.querySelectorAll(".horaires-content");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// navBar

// Scroll to contact
navContact.addEventListener("click", () => {
  contact.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////////////////////////////////////////////////////////////////////

// Reveal categories

const changeBackground = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  items.forEach((item) => {
    item.style = item.dataset.style;
  });

  observer.unobserve(entry.target);
};

const backgroundOptions = {
  root: null,
  threshold: 0,
  ///////////////
  // À affiner
  rootMargin: "+50px",
  ///////////////
};

const backgroundObserver = new IntersectionObserver(changeBackground, backgroundOptions);

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const categoriesOptions = {
  root: null,
  threshold: 0.5,
};

const categoriesObserver = new IntersectionObserver(revealSection, categoriesOptions);

const loadImage = function (img) {
  img.src = img.dataset.src;
  img.classList.remove("icone-lazy");
};

// We want to replace the 'lazy' images by the real ones when the user scroll donws on the page
const loadProductImages = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  momentProductsImages.forEach((img) => {
    loadImage(img);
  });

  observer.unobserve(entry.target);
};

const productImagesOptions = {
  root: null,
  threshold: 0,
  ///////////////
  // À affiner
  rootMargin: "+50px",
  ///////////////
};

const productImagesObserver = new IntersectionObserver(loadProductImages, productImagesOptions);
productImagesObserver.observe(momentProducts);

const revealProductsOptions = {
  root: null,
  threshold: 0.4,
};

const productsObserver = new IntersectionObserver(revealSection, revealProductsOptions);

const allowKeyboardUse = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    allowKey = true;
  } else {
    allowKey = false;
  }
};

const allowKeyObserver = new IntersectionObserver(allowKeyboardUse, productImagesOptions);
allowKeyObserver.observe(momentProducts);

const contactOptions = {
  root: null,
  threshold: 0.3,
};

const contactObserver = new IntersectionObserver(revealSection, contactOptions);

const revealAdress = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  allAfter.forEach((div) => {
    div.classList.add("erase-after");
    observer.unobserve(rightBlock);
  });
};

const adressOptions = {
  root: null,
  threshold: 0.7,
};

const adressObserver = new IntersectionObserver(revealAdress, adressOptions);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour le slider des produits du moment

// Remove the first picture of the node list of the images since it has to load immediatly
momentProductsImages.shift();

////Add lazy class to the lazy images
momentProductsImages.forEach((img) => {
  img.classList.add("icone-lazy");
});

const moveTitlesRight = function () {
  const currentTitle = document.querySelector(`.titles__title--${i}`);
  const newtitle = document.querySelector(`.titles__title--${i - 1}`);
  const allTitles = document.querySelectorAll(".titles__title");

  currentTitle.classList.add("hidden");
  newtitle.classList.remove("hidden");
  // On doit bien mettre i-1 car l'incrémentation se fait après qu'on est ajouté la classe que l'on veut enlever, donc on a un décalage
  allTitles.forEach((el) => el.classList.remove(`translate--${i - 1}00`));
};

const moveTitlesLeft = function () {
  const currentTitle = document.querySelector(`.titles__title--${i}`);
  const newtitle = document.querySelector(`.titles__title--${i + 1}`);
  const allTitles = document.querySelectorAll(".titles__title");

  currentTitle.classList.add("hidden");
  newtitle.classList.remove("hidden");
  allTitles.forEach((el) => el.classList.add(`translate--${i}00`));
};

const moveDescriptionsRight = function () {
  const currentDescription = document.querySelector(`.descriptions__description--${i}`);
  const newDescription = document.querySelector(`.descriptions__description--${i - 1}`);
  const allDescriptions = document.querySelectorAll(".descriptions__description");

  currentDescription.classList.add("hidden");
  newDescription.classList.remove("hidden");
  // On doit bien mettre i-1 car l'incrémentation se fait après qu'on est ajouté la classe que l'on veut enlever, donc on a un décalage
  allDescriptions.forEach((el) => el.classList.remove(`translate--${i - 1}00`));
};

const moveDescriptionsLeft = function () {
  const currentDescription = document.querySelector(`.descriptions__description--${i}`);
  const newDescription = document.querySelector(`.descriptions__description--${i + 1}`);
  const allDescriptions = document.querySelectorAll(".descriptions__description");

  currentDescription.classList.add("hidden");
  newDescription.classList.remove("hidden");
  allDescriptions.forEach((el) => el.classList.add(`translate--${i}00`));
};

const moveImagesRight = function () {
  const currentImage = document.querySelector(`.product__pic--${i}`);
  currentImage.classList.remove(`translate--${i - 1}00`);
  currentImage.classList.add("hidden");
};

const moveimagesLeft = function () {
  const nextImage = document.querySelector(`.product__pic--${i + 1}`);
  nextImage.classList.add(`translate--${i}00`);
  nextImage.classList.remove("hidden");
};

const retreatProgressBar = function (index) {
  setTimeout(function () {
    const currentBall = document.querySelector(`.stepper__ball--${index - 1}`);
    currentBall.classList.add("unscale");
    carryOn = true;
  }, 200);
};

const advanceProgressBar = function () {
  const treatedBall = document.querySelector(`.stepper__ball--${i}`);
  treatedBall.classList.remove("unscale");
};

const atrophyGreenBall = function () {
  const nextGreenBall = document.querySelector(`.green--${i}`);
  nextGreenBall.classList.add("atrophy");
  // On bloque la possibilité de cliquer sur une autre slide avant que la barre verte ne soit rétractée.
  carryOn = false;
};

const revealGreenBall = function (index) {
  // On met une paramètre dans la fonction pour être sûr que l'incrémentation du timer ne sera pas effectuée avant la fin de l'intervalle.
  carryOn = false;
  setTimeout(function () {
    const nextGreenBall = document.querySelector(`.green--${index + 1}`);
    nextGreenBall.classList.remove("atrophy");
    carryOn = true;
  }, 300);
};

const leftAction = function () {
  // On met une guard si on est sur la première slide
  if (i === 1) return;
  // On met une guard pour être sûr que l'on ne change pas de slide avant la fin de l'intervalle
  if (!carryOn) return;
  // Si on était sur la  dernière slide on remet la flèche de droite entièrement visible
  if (i === 4) arrowRight.style.opacity = 1;
  moveTitlesRight();
  moveDescriptionsRight();
  moveImagesRight();
  retreatProgressBar(i);
  atrophyGreenBall();

  i--;
  // Si on est sur la première slide, on rend la flèche de gauche transparente.
  if (i === 1) arrowLeft.style.opacity = 0.5;
};

const rightAction = function () {
  // On met une guard arrivé au bout des slides
  if (i === 4) return;
  // Si c'est le premier appui sur la flèche on remet la flèche de gauche à la bonne couleur.
  // On met une guard pour être sûr que l'on ne change pas de slide avant la fin de l'intervalle
  if (!carryOn) return;
  if (i === 1) arrowLeft.style.opacity = 1;
  moveTitlesLeft();
  moveDescriptionsLeft();
  moveimagesLeft();
  advanceProgressBar();
  revealGreenBall(i);
  i++;
  // On met la flèche en transparence une fois arrivé au bout des slides.
  if (i === 4) arrowRight.style.opacity = 0.5;
};

// function to handle the user's order via the keyboard
const stepperKey = function () {
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && allowKey) {
      leftAction();
    }
    if (event.key === "ArrowRight" && allowKey) {
      rightAction();
    }
  });
};

// function to handle the user's order via the mouse
const stepperClick = function () {
  arrowRight.addEventListener("click", rightAction);
  arrowLeft.addEventListener("click", leftAction);
};

// The arrows will change aspect

const shrinkArrowLeft = function () {
  // On met une guard si on est sur la première slide
  if (i === 1) return;
  // On met une guard pour être sûr que l'on ne change pas de slide avant la fin de l'intervalle
  if (!carryOn) return;
  this.classList.toggle("shrink-left");
};

const shrinkArrowRight = function () {
  // On met une guard si on est sur la dernière slide
  if (i === 4) return;
  // On met une guard pour être sûr que l'on ne change pas de slide avant la fin de l'intervalle
  if (!carryOn) return;
  this.classList.toggle("shrink-right");
};

const startArrowResizing = function () {
  arrowLeft.addEventListener("mousedown", shrinkArrowLeft);
  arrowLeft.addEventListener("mouseup", shrinkArrowLeft);
  arrowRight.addEventListener("mousedown", shrinkArrowRight);
  arrowRight.addEventListener("mouseup", shrinkArrowRight);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Tabbed compenent horaires
btnContainer.addEventListener("click", function (e) {
  const clicked = e.target;
  if (!clicked.classList.contains("horaires-btn")) return;

  allHorairesBtn.forEach((a) => {
    a.classList.remove("horaires-btn-active");
  });
  clicked.classList.add("horaires-btn-active");

  horairesContent.forEach((h) => {
    h.classList.add("horaires-content-hidden");
  });

  document.querySelector(`.horaires-content--${clicked.dataset.tab}`).classList.remove("horaires-content-hidden");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const notIfMobile = function () {
  // Guard to prevent the various JS functions from kicking off if the screen is too small
  if (viewportWidthCondition) return;
  backgroundObserver.observe(categories);
  categoriesObserver.observe(categories);
  categories.classList.add("section-hidden");
  productsObserver.observe(momentProducts);
  momentProducts.classList.add("section-hidden");
  contactObserver.observe(contact);
  contact.classList.add("section-hidden");
  adressObserver.observe(rightBlock);
  allAfter.forEach((div) => {
    div.classList.add("after");
  });
  startArrowResizing();
  stepperClick();
  stepperKey();
};

notIfMobile();
