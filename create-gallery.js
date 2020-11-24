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
};

const closeModal = (event) => {
  lightboxRef.classList.remove("is-open");
  lightboxImgRef.src = "";
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
  let e;
  if (lightboxRef.classList.contains("is-open")) {
    switch (event.keyCode) {
      case (e = 27):
        closeModal();
        break;
      case (e = 39):
        nextImg();
        break;
      case (e = 37):
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
document.addEventListener("keydown", eventKeyDown);
