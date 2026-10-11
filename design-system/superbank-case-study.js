// Keep both versions readable when JavaScript is unavailable.
document.querySelectorAll('[data-comparison]').forEach((comparison) => {
  const controls = comparison.querySelector('.superbank-comparison-controls');
  const buttons = [...comparison.querySelectorAll('[data-comparison-button]')];
  const panels = [...comparison.querySelectorAll('[data-comparison-panel]')];

  const select = (version) => {
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.comparisonButton === version));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.comparisonPanel !== version;
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => select(button.dataset.comparisonButton));
  });
  select(buttons[0].dataset.comparisonButton);
  controls.hidden = false;
});

// One viewer serves every case-study image, including comparison panels.
const imageViewer = document.querySelector('.superbank-image-viewer');
const viewerImage = imageViewer.querySelector('img');
const viewerStage = imageViewer.querySelector('.superbank-viewer-stage');
const zoomOut = imageViewer.querySelector('[data-zoom="out"]');
const zoomIn = imageViewer.querySelector('[data-zoom="in"]');
let imageZoom = 1;
let imageTrigger;

const renderImageZoom = () => {
  if (!imageViewer.open || !viewerImage.naturalWidth) return;
  // Reserve space for the caption and viewport margins, not an empty stage.
  const maxWidth = Math.min(1600, window.innerWidth - 32) - 2;
  const maxHeight = Math.max(100, window.innerHeight - 98);
  const fit = Math.min(
    maxWidth / viewerImage.naturalWidth,
    maxHeight / viewerImage.naturalHeight,
    1
  );
  const width = viewerImage.naturalWidth * fit * imageZoom;
  const height = viewerImage.naturalHeight * fit * imageZoom;
  // Keep the fitted frame fixed so zoom controls never move with the image.
  imageViewer.style.width = `${viewerImage.naturalWidth * fit}px`;
  viewerStage.style.height = `${viewerImage.naturalHeight * fit}px`;
  viewerImage.style.width = `${width}px`;
  viewerImage.style.height = `${height}px`;
  zoomOut.disabled = imageZoom <= 0.5;
  zoomIn.disabled = imageZoom >= 4;
  imageViewer.querySelector('[data-zoom-status]').textContent = `${Math.round(imageZoom * 100)}% of fitted size`;
};

viewerImage.addEventListener('load', renderImageZoom);
document.querySelectorAll('.case-main figure img').forEach((image) => {
  const caption = image.closest('figure').querySelector('figcaption')?.textContent || image.alt || 'Case study image';
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-haspopup', 'dialog');
  image.setAttribute('aria-label', `Enlarge image: ${caption}`);
  image.classList.add('superbank-zoomable');
  const openImage = () => {
    const origin = image.getBoundingClientRect();
    imageViewer.getAnimations().forEach((animation) => animation.cancel());
    imageTrigger = image;
    imageZoom = 1;
    viewerImage.removeAttribute('style');
    viewerImage.alt = image.alt || caption;
    viewerImage.src = image.currentSrc || image.src;
    imageViewer.querySelector('.superbank-viewer-caption').textContent = caption;
    imageViewer.showModal();
    document.body.classList.add('superbank-viewer-open');
    renderImageZoom();
    viewerStage.scrollTo(0, 0);
    imageViewer.querySelector('[data-zoom="close"]').focus({ preventScroll: true });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const destination = imageViewer.getBoundingClientRect();
      imageViewer.animate([
        {
          transform: `translate(${origin.left - destination.left}px, ${origin.top - destination.top}px) scale(${origin.width / destination.width}, ${origin.height / destination.height})`,
          opacity: 0.35
        },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 }
      ], { duration: 260, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
    }
  };
  image.addEventListener('click', openImage);
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openImage();
    }
  });
});

imageViewer.querySelectorAll('[data-zoom]').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.zoom;
    if (action === 'close') return imageViewer.close();
    if (action === 'in') imageZoom = Math.min(4, imageZoom + 0.5);
    if (action === 'out') imageZoom = Math.max(0.5, imageZoom - 0.5);
    if (action === 'fit') imageZoom = 1;
    renderImageZoom();
    if (action === 'fit') viewerStage.scrollTo(0, 0);
  });
});
imageViewer.addEventListener('click', (event) => {
  if (event.target !== imageViewer) return;
  const box = imageViewer.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) imageViewer.close();
});
imageViewer.addEventListener('close', () => {
  imageViewer.getAnimations().forEach((animation) => animation.cancel());
  document.body.classList.remove('superbank-viewer-open');
  imageTrigger?.focus({ preventScroll: true });
});
window.addEventListener('resize', renderImageZoom);
