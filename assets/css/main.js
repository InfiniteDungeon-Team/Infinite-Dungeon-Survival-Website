// assets/js/main.js
document.addEventListener('DOMContentLoaded', function () {
  // -------- NAV / HAMBURGER --------
  var topbar = document.querySelector('.topbar');
  var btn = document.querySelector('.nav-toggle');

  if (btn && topbar) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // don't let this click bubble to document
      var open = topbar.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!topbar.contains(e.target)) {
        topbar.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -------- IMAGE LIGHTBOX --------
  var lightbox = document.getElementById('lightbox');
  var lbImg = lightbox ? lightbox.querySelector('img') : null;
  var lbCaption = lightbox ? lightbox.querySelector('figcaption') : null;
  var lbClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  function openLightbox(imgElement) {
    if (!lightbox || !lbImg) return;

    lbImg.src = imgElement.src;
    lbImg.alt = imgElement.alt || '';

    if (lbCaption) {
      var parentFig = imgElement.closest('figure');
      var figcap = parentFig ? parentFig.querySelector('figcaption') : null;
      lbCaption.textContent = figcap ? figcap.textContent : '';
    }

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  // Attach click handlers to all gallery thumbs
  document.querySelectorAll('img.thumb').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img);
    });
  });

  // Close button
  if (lbClose) {
    lbClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // Click outside the inner card to close
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Esc key closes both nav + lightbox
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (topbar && btn) {
        topbar.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
      closeLightbox();
    }
  });
});
