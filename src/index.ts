import '@material/mwc-icon-button';

const map = document.querySelector('#map');
const blocksPerSide = 50;

let z = 0;
let scale = 0.5;

init();

function init() {
  initBlocks();
  initZoom();
  initButtons();
  initKeyboardEvents();
  transformMap(z, scale);
}

function initZoom() {
  const handleZoomEvent = (event) => {
    event.preventDefault();
    transformMap(0, event.deltaY * -0.01);
  };

  map.addEventListener('wheel', handleZoomEvent);
}

function initBlocks() {
  const totalBlocks = blocksPerSide * blocksPerSide;

  for (let i = 0; i < totalBlocks; i++) {
    const block = document.createElement('div');
    block.classList.add('block');

    block.addEventListener('mouseover', () => {
      block.classList.add('mouseover');
    });
    block.addEventListener('mouseleave', () => {
      block.classList.remove('mouseover');
    });

    const applyClicked = (event: PointerEvent) => {
      if (event.pressure > 0) block.classList.add('clicked');
    };
    block.addEventListener('pointerdown', applyClicked);
    block.addEventListener('pointerenter', applyClicked);

    map.appendChild(block);
  }
}

function transformMap(zInc: number, scaleInc: number): void {
  z += zInc;
  const newScale = scale + scaleInc;
  if (newScale > 0.5 && newScale < 4) {
    scale += scaleInc;
  }

  const columns = `grid-template-columns: repeat(${blocksPerSide}, min(1.5vh, 1vw));`;
  const rotation = `transform: rotateX(55deg) rotateZ(${z}deg) scale(${scale});`;

  map.setAttribute('style', columns + rotation);
}

function initKeyboardEvents() {
  const handleKeyboardEvent = (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        transformMap(0, -0.5);
        break;
      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        transformMap(0, 0.5);
        break;
      case 'Left': // IE/Edge specific value
      case 'ArrowLeft':
        transformMap(-45, 0);
        break;
      case 'Right': // IE/Edge specific value
      case 'ArrowRight':
        transformMap(45, 0);
        break;
      default:
        return;
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  };

  document.addEventListener('keydown', handleKeyboardEvent, true);
}

function initButtons() {
  document
    .querySelector('#rotate_right')
    .addEventListener('click', () => transformMap(45, 0));

  document
    .querySelector('#rotate_left')
    .addEventListener('click', () => transformMap(-45, 0));

  document
    .querySelector('#zoom_in')
    .addEventListener('click', () => transformMap(0, 0.5));

  document
    .querySelector('#zoom_out')
    .addEventListener('click', () => transformMap(0, -0.5));
}
