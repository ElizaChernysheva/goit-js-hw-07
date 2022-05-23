import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");
let instance = {};

createGallery();

galleryEl.addEventListener("click", (event) => {
  event.preventDefault();
  const galleryItemEl = event.target;

  if (galleryItemEl.nodeName !== "IMG") return;

  instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
  `);

  instance.show();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && instance.visible()) {
    instance.close();
  }
});

function createGallery() {
  const galleryItemsEl = galleryItems
    .map(({ preview, original, description }) => {
      return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </div>
        `;
    })
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", galleryItemsEl);
}
