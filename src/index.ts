console.log('hi there');

const map = document.querySelector('#map');

for (let i = 0; i < 2000; i++) {
  const block = document.createElement('div');
  block.classList.add('block');
  block.addEventListener('mouseover', () => {
    block.classList.add('clicked');
  });
  block.addEventListener('mouseleave', () => {
    block.classList.remove('clicked');
  });
  block.addEventListener('drag', () => {
    block.classList.add('drag');
    console.log('dragging');
  });
  map.appendChild(block);
}
