import '@material/mwc-icon-button';

const map = document.querySelector('#map');

for (let i = 0; i < 2500; i++) {
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

let z = 45;
let scale = 1;

function transform(zInc: number, scaleInc: number): void {
  z += zInc;
  if (scale + scaleInc > 0) {
    scale += scaleInc;
  }
  const map = document.querySelector('#map');
  map.setAttribute(
    'style',
    `transform: rotateX(55deg) rotateZ(${z}deg) scale(${scale})`
  );
}

document
  .querySelector('#rotate_right')
  .addEventListener('click', () => transform(45, 0));

document
  .querySelector('#rotate_left')
  .addEventListener('click', () => transform(-45, 0));

document
  .querySelector('#zoom_in')
  .addEventListener('click', () => transform(0, 0.5));

document
  .querySelector('#zoom_out')
  .addEventListener('click', () => transform(0, -0.5));
