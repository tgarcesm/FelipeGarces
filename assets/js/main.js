document.addEventListener('DOMContentLoaded', function () {
  // Año actual en el footer
  var yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Menú móvil (dropdown)
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  function closeNav() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var willOpen = !mainNav.classList.contains('is-open');
      if (willOpen) {
        mainNav.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
      } else {
        closeNav();
      }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function (event) {
      if (!mainNav.classList.contains('is-open')) return;
      var target = event.target;
      if (mainNav.contains(target) || navToggle.contains(target)) {
        return;
      }
      closeNav();
    });

    // Cerrar al hacer clic en cualquier link del menú
    var navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeNav();
      });
    });
  }

  // Acordeón FAQ
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq-question');
    if (!button) return;
    button.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Seguimiento de eventos con Google Analytics
  function trackEvent(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params || {});
    }
  }

  // Click en enlaces de WhatsApp
  var whatsappLinks = document.querySelectorAll('.js-whatsapp-link');
  whatsappLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      trackEvent('click_whatsapp', {
        link_text: link.textContent.trim(),
        location: window.location.pathname
      });
    });
  });

  // Click en botones "Agendar por WhatsApp" del header
  var agendarButtons = document.querySelectorAll('.js-agendar-btn');
  agendarButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      trackEvent('click_agendar', {
        link_text: btn.textContent.trim(),
        location: window.location.pathname
      });
    });
  });
});

