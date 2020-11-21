import galleryImg from './gallery-items.js';


const galleryList = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.lightbox');
const lightboxImgRef = document.querySelector('.lightbox__image');
const BtnCloseModal = document.querySelector('[data-action="close-lightbox"]');
const overlayClose = document.querySelector('div.lightbox__overlay');

const createGalleryItem = galleryImg.map(({preview,original,description}) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image")
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
     
});
galleryList.insertAdjacentHTML('afterbegin', createGalleryItem.join(''));

const openModalImg = (event) => {
    event.preventDefault();
    lightboxRef.classList.add('is-open');
    lightboxImgRef.src = event.target.dataset.source;
};

const closeModal = (event) => {
    event.preventDefault();
    lightboxRef.classList.remove('is-open');
    lightboxImgRef.src = '';
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightboxRef.classList.contains('is-open')) {
        lightboxRef.classList.remove('is-open');
        lightboxImgRef.src = '';
    };
});

galleryList.addEventListener('click', openModalImg);
BtnCloseModal.addEventListener('click', closeModal);
overlayClose.addEventListener('click', closeModal);



 
