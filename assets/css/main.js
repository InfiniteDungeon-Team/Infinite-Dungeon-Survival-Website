// assets/js/main.js
document.addEventListener('DOMContentLoaded', function () {
  // -------- NAV / HAMBURGER --------
  var topbar = document.querySelector('.topbar');
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('primary-menu');

  function closeNav() {
    if (!topbar || !btn) return;
    topbar.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  if (topbar && btn && menu) {
    // Toggle menu when hamburger is clicked
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // don't let this click bubble to document
      var isOpen = topbar.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close nav when clicking outside of the topbar
    document.addEventListener('click', function (e) {
      if (!topbar.contains(e.target)) {
        closeNav();
      }
    });
  }

  // -------- IMAGE LIGHTBOX --------
  var lightbox = document.getElementById('lightbox');

  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCaption = lightbox.querySelector('figcaption');
    var lbClose = lightbox.querySelector('.lightbox-close');

    function openLightbox(imgElement) {
      if (!lbImg) return;

      // Use the thumbnail source for now
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
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    // Click on any gallery thumbnail to open
    document.querySelectorAll('img.thumb').forEach(function (img) {
      img.addEventListener('click', function () {
        openLightbox(img);
      });
    });

    // Close button (X)
    if (lbClose) {
      lbClose.addEventListener('click', function (e) {
        e.stopPropagation();
        closeLightbox();
      });
    }

    // Click outside the inner card to close
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Esc key closes lightbox and nav
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeLightbox();
        closeNav();
      }
    });
  } else {
    // Even if lightbox doesn't exist, still let Esc close the nav
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeNav();
      }
    });
  }
});
