'use strict';

document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const cards = [...document.querySelectorAll('.product-card')];
const notification = document.querySelector('#notification');
const cartDialog = document.querySelector('#cart-dialog');
const productDialog = document.querySelector('#product-dialog');
const cart = new Map();
let notificationTimer;
let selectedCard;

function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 768px)').addEventListener('change', closeMenu);

function filterProducts(filter) {
  cards.forEach(card => { card.hidden = filter === 'sale' && card.dataset.sale !== 'true'; });
  document.querySelector('#catalog-title').firstChild.textContent = filter === 'sale' ? 'Selected deals ' : 'The collection ';
  document.querySelector('#catalog-title span').textContent = filter === 'sale' ? '02 essentials' : '08 essentials';
  document.querySelector('#show-all').hidden = filter !== 'sale';
}
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  if (link.dataset.filter) filterProducts(link.dataset.filter);
  closeMenu();
});
document.querySelector('#show-all').addEventListener('click', () => filterProducts('all'));

function notify(message) {
  clearTimeout(notificationTimer);
  notification.textContent = message;
  notification.classList.add('is-visible');
  notificationTimer = setTimeout(() => notification.classList.remove('is-visible'), 2800);
}

function renderCart() {
  const list = document.querySelector('#cart-items');
  list.replaceChildren();
  let count = 0;
  let total = 0;
  for (const [id, item] of cart) {
    count += item.quantity;
    total += item.price * item.quantity;
    const row = document.createElement('li');
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = '';
    const text = document.createElement('div');
    text.className = 'cart-item-text';
    const name = document.createElement('strong');
    name.textContent = item.name;
    const price = document.createElement('span');
    price.textContent = `${item.quantity} × $${(item.price / 100).toFixed(2)}`;
    text.append(name, price);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-item';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove ${item.name} from bag`);
    remove.addEventListener('click', () => {
      cart.delete(id);
      renderCart();
      const nextRemove = list.querySelector('button');
      (nextRemove || cartDialog.querySelector('.continue-button')).focus();
      notify(`${item.name} removed from your bag`);
    });
    row.append(image, text, remove);
    list.append(row);
  }
  const badge = document.querySelector('#cart-count');
  badge.textContent = String(count);
  badge.hidden = count === 0;
  document.querySelector('.cart-toggle').setAttribute('aria-label', `Open shopping bag, ${count} items`);
  document.querySelector('#cart-empty').hidden = count > 0;
  document.querySelector('#cart-total').textContent = `$${(total / 100).toFixed(2)}`;
}
function addToCart(card) {
  const id = card.dataset.product;
  const existing = cart.get(id);
  cart.set(id, {
    name: card.dataset.name,
    price: Math.round(Number(card.dataset.price) * 100),
    image: card.querySelector('img').getAttribute('src'),
    quantity: existing ? existing.quantity + 1 : 1
  });
  renderCart();
  notify(`${card.dataset.name} added to your bag`);
}
for (const card of cards) {
  card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(card));
  card.querySelector('.product-image').addEventListener('click', () => {
    selectedCard = card;
    document.querySelector('#detail-title').textContent = card.dataset.name;
    document.querySelector('#detail-category').textContent = card.querySelector('.category').textContent;
    document.querySelector('#detail-price').textContent = `$${card.dataset.price}`;
    const image = document.querySelector('#detail-image');
    image.src = card.querySelector('img').src;
    image.alt = card.querySelector('img').alt;
    productDialog.showModal();
  });
}
document.querySelector('#detail-add').addEventListener('click', () => {
  if (selectedCard) addToCart(selectedCard);
  productDialog.close();
});
document.querySelector('.cart-toggle').addEventListener('click', () => cartDialog.showModal());
document.querySelector('.continue-button').addEventListener('click', () => cartDialog.close());
for (const dialog of [cartDialog, productDialog]) {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  } });
}
