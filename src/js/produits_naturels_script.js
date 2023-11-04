"use strict";

const cardsNat = document.querySelector(".produits-naturels-grid-container");
const cardPics = document.querySelectorAll(".cardpic");

const contact = document.querySelector(".contact");
const scrollToContact = document.querySelectorAll(".scroll-to-contact");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Faire apparaître la grid

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.add("trans");
  entry.target.classList.remove("section-hidden");

  observer.unobserve(entry.target);
};

const revealPdtsNat = function (entries, observer) {
  revealSection(entries, observer);
};

const pdtsNatOptions = {
  root: null,
  threshold: 0.3,
};

const pdtsNatObserver = new IntersectionObserver(revealPdtsNat, pdtsNatOptions);
pdtsNatObserver.observe(cardsNat);

const loadImage = function (img) {
  img.src = img.dataset.src;
  img.classList.remove("icone-lazy");
};

const revealImages = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  cardPics.forEach((image) => {
    loadImage(image);
  });
  observer.unobserve(entry.target);
};

const cardPicsOptions = {
  root: null,
  threshold: 0,
  rootMargin: "+50px",
};

const cardPicsObserver = new IntersectionObserver(revealImages, cardPicsOptions);
cardPicsObserver.observe(cardsNat);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const notIfMobile = function () {
  // On ne le fait pas sur tel
  if (viewportWidthCondition) return;
  cardsNat.classList.add("section-hidden");
  cardPics.forEach((div) => {
    div.classList.add("icone-lazy");
  });
};

notIfMobile();
