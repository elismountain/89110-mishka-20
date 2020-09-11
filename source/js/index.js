// menu opening
(function() {
const toggleButton = document.getElementById('toggle-button');
  const mainNav = document.querySelector('.main-navigation');
  const siteNavigation = document.querySelector('.site-navigation');
  const userNavigation = document.querySelector('.user-navigation');

  if (mainNav && mainNav.classList.contains('main-navigation--nojs')) {
    mainNav.classList.remove('main-navigation--nojs');

    if (siteNavigation && userNavigation) {
      siteNavigation.classList.add('site-navigation--closed');
      userNavigation.classList.add('user-navigation--closed');
    }
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', function(event) {
      event.preventDefault();
      siteNavigation.classList.toggle('site-navigation--closed');
      userNavigation.classList.toggle('user-navigation--closed');
      this.classList.toggle('main-navigation__toggle--off');
    });
  }

  // modal window

const overlayModal = document.querySelector('.modal');
const catalogBlock = document.querySelector('.catalog-result');
const orderButton = document.querySelector('.promo__button');

if (overlayModal) {
  if (catalogBlock) {
    catalogBlock.addEventListener('click', openOrderForm);
  }

  if (orderButton) {
    orderButton.addEventListener('click', openOrderForm);
  }

  overlayModal.addEventListener('click', closeOrderForm);
  window.addEventListener('keydown', closeOrderForm);
}

function openOrderForm(event) {
  let element = event.target;

  if (
    element.classList.contains('catalog-product__price-wrapper') ||
    element.classList.contains('promo__button')
  ) {
    event.preventDefault();
    overlayModal.classList.add('modal--opened');
  }
}

function closeOrderForm(event) {
  let element = event.target;

  if (element.classList.contains('modal') || event.keyCode === 27) {
    overlayModal.classList.remove('modal--opened');
  }
}
})();
