import galleryImg from "./gallery-items.js";

const galleryList = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".lightbox");
const lightboxImgRef = document.querySelector(".lightbox__image");
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');
const overlayModal = document.querySelector("div.lightbox__overlay");
let index = 0;

const createGalleryItem = galleryImg.map(
  ({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a 
  class="gallery__link"
    href="${original}">
    <img
      class="gallery__image")
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  }
);

galleryList.insertAdjacentHTML("afterbegin", createGalleryItem.join(""));

const openModalImg = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lightboxRef.classList.add("is-open");
  lightboxImgRef.src = event.target.dataset.source;
  index = galleryImg.map((elem) => elem.original).indexOf(lightboxImgRef.src);
  document.addEventListener("keydown", eventKeyDown);
};

const closeModal = (event) => {
  lightboxRef.classList.remove("is-open");
  lightboxImgRef.src = "";
  document.removeEventListener("keydown", eventKeyDown);
};

function prevImg() {
  index !== 0 ? (index -= 1) : (index = galleryImg.length - 1);
  lightboxImgRef.src = galleryImg[index].original;
}
function nextImg() {
  index === galleryImg.length - 1 ? (index = 0) : (index += 1);
  lightboxImgRef.src = galleryImg[index].original;
}

const eventKeyDown = (event) => {
  const keys = { ESCAPE_KEY: 27, ARROWRIGHT_KEY: 39, ARROWLEFT_KEY: 37 };
  if (lightboxRef.classList.contains("is-open")) {
    switch (event.keyCode) {
      case keys.ESCAPE_KEY:
        closeModal();
        break;
      case keys.ARROWRIGHT_KEY:
        nextImg();
        break;
      case keys.ARROWLEFT_KEY:
        prevImg();
        break;
      default:
        return;
    }
  }
};

galleryList.addEventListener("click", openModalImg);
btnCloseModal.addEventListener("click", closeModal);
overlayModal.addEventListener("click", closeModal);
