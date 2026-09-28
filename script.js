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


// Pedidos: elegir automáticamente el WhatsApp correcto según la hora de Mérida.
const ORDER_MESSAGE = 'Hola, quiero hacer un pedido en Café Petropolys. 🍽️';
const DAY_NUMBER = '529992249678';
const NIGHT_NUMBER = '529995463816';

function getMeridaHour() {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Merida',
      hour: '2-digit',
      hour12: false
    }).formatToParts(new Date());
    const hourPart = parts.find((part) => part.type === 'hour');
    return Number(hourPart?.value ?? new Date().getHours());
  } catch (error) {
    return new Date().getHours();
  }
}

function updateOrderRouting() {
  const hour = getMeridaHour();
  const isDay = hour >= 6 && hour < 18;
  const activeNumber = isDay ? DAY_NUMBER : NIGHT_NUMBER;
  const activePhone = isDay ? '999 224 9678' : '999 546 3816';
  const activeSchedule = isDay ? '6:00 AM – 6:00 PM' : '6:00 PM – 6:00 AM';
  const orderUrl = `https://wa.me/${activeNumber}?text=${encodeURIComponent(ORDER_MESSAGE)}`;

  document.querySelectorAll('[data-order-dynamic]').forEach((link) => {
    link.href = orderUrl;
    link.setAttribute('aria-label', `Hacer un pedido por WhatsApp al ${activePhone}`);
  });

  const dayCard = document.getElementById('orderDay');
  const nightCard = document.getElementById('orderNight');
  if (dayCard && nightCard) {
    dayCard.classList.toggle('is-active', isDay);
    dayCard.classList.toggle('is-inactive', !isDay);
    nightCard.classList.toggle('is-active', !isDay);
    nightCard.classList.toggle('is-inactive', isDay);
  }

  const nowText = document.getElementById('orderNowText');
  if (nowText) {
    nowText.textContent = `Pedidos disponibles ahora: ${activePhone} · ${activeSchedule}`;
  }
}

updateOrderRouting();
setInterval(updateOrderRouting, 60 * 1000);
