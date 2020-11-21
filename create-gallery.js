import galleryImg from './gallery-items.js';
console.log(galleryImg);


const galleryList = document.querySelector('.js-gallery');
console.log(galleryList);
const lightboxRef = document.querySelector('.lightbox');
console.log(lightboxRef);

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

console.log(createGalleryItem);
 
