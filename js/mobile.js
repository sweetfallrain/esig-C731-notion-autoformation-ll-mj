/* ===================================================================
   Confort de lecture, surtout sur téléphone :
   1. Agrandir une image : un clic (ou Enter) sur une capture ou un schéma
      l'ouvre en grand dans une fenêtre où l'on peut faire défiler et zoomer.
      Esc ou le bouton « Fermer » la referme.
   2. Tableaux de cours : chaque cellule reçoit le titre de sa colonne
      (data-label), pour qu'un tableau s'affiche en fiches sur petit écran.
   =================================================================== */
(function () {
  'use strict';

  function setupZoom() {
    const images = document.querySelectorAll('.screenshot img, .illustration img, .home-hero__image img');
    if (!images.length || typeof HTMLDialogElement === 'undefined') { return; }

    const dialog = document.createElement('dialog');
    dialog.className = 'zoom';
    dialog.setAttribute('aria-label', 'Image agrandie');
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'btn btn-light zoom__close';
    close.textContent = 'Fermer ×';
    const frame = document.createElement('div');
    frame.className = 'zoom__frame';
    const big = document.createElement('img');
    big.alt = '';
    frame.appendChild(big);
    dialog.appendChild(close);
    dialog.appendChild(frame);
    document.body.appendChild(dialog);

    let opener = null;
    function open(img) {
      opener = img;
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      const natural = img.naturalWidth || Number(img.getAttribute('width')) || 800;
      big.style.width = Math.max(natural, Math.round(window.innerWidth * 0.9)) + 'px';
      if (natural > window.innerWidth) { big.style.width = natural + 'px'; }
      dialog.showModal();
      frame.scrollTo(0, 0);
      close.focus();
    }
    close.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog || event.target === frame) { dialog.close(); } });
    dialog.addEventListener('close', function () { if (opener) { opener.focus(); } });

    images.forEach(function (img) {
      img.classList.add('is-zoomable');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Agrandir l\'image : ' + img.alt);
      img.addEventListener('click', function () { open(img); });
      img.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(img); }
      });
    });
  }

  function labelTables() {
    document.querySelectorAll('.prose > .db-sim__scroll > table.db-table').forEach(function (table) {
      const heads = Array.from(table.querySelectorAll('thead th')).map(function (th) { return th.textContent.trim(); });
      if (!heads.length) { return; }
      table.classList.add('db-table--stack');
      table.querySelectorAll('tbody tr').forEach(function (row) {
        Array.from(row.children).forEach(function (cell, i) {
          if (heads[i] && !cell.hasAttribute('data-label')) { cell.setAttribute('data-label', heads[i]); }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupZoom();
    labelTables();
  });
})();
