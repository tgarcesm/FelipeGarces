document.addEventListener('DOMContentLoaded', function () {
  // Año actual en el footer
  var yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Menú móvil
  var navToggle = document.getElementById('nav-toggle');
  var body = document.body;
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      body.classList.toggle('nav-open');
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

