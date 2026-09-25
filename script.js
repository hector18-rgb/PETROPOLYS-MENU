const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeBtn = document.querySelector('.close-lightbox');

function openLightbox(src, title){
  lightboxImg.src = src;
  lightboxTitle.textContent = title || 'Imagen del menú';
  lightbox.showModal();
}

document.querySelectorAll('[data-open]').forEach((el) => {
  el.addEventListener('click', () => openLightbox(el.dataset.open, el.dataset.title));
});

closeBtn.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  const box = lightbox.querySelector('.lightbox-box');
  const rect = box.getBoundingClientRect();
  const inside = rect.left <= event.clientX && event.clientX <= rect.right && rect.top <= event.clientY && event.clientY <= rect.bottom;
  if (!inside) lightbox.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.open) lightbox.close();
});
