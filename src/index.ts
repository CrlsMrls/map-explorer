const map = document.querySelector('#map');

for (let i = 0; i < 100; i++) {
  const block = document.createElement('div');
  block.classList.add('block');
  block.innerHTML = `
    <div class="block__front"></div>
    <div class="block__left"></div>
    <div class="block__back"></div>
    <div class="block__right"></div>
    <div class="block__top"></div>

  `;
  block.addEventListener('mouseover', () => {
    block.classList.add('mouseover');
  });
  block.addEventListener('mouseleave', () => {
    block.classList.remove('mouseover');
  });
  block.addEventListener('click', () => {
    block.classList.add('clicked');
  });

  map.appendChild(block);
}

let actualRotation = 0;

document.querySelector('#rotate').addEventListener('click', () => {
  const map = document.querySelector('#map');
  map.classList.remove(`rotation-${actualRotation}`);
  actualRotation = (actualRotation + 1) % 4;
  map.classList.add(`rotation-${actualRotation}`);
});
