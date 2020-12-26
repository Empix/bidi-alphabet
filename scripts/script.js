const input = document.querySelector('.phrase-input input');

const canvas = document.querySelector('#preview');
const ctx = canvas.getContext('2d');

canvas.width = 17;
canvas.height = 16;
ctx.imageSmoothingEnabled = false;

const image = new Image();
image.onload = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(image, 0, 0);
};

const allowedCharacter = [
  'A',
  'Á',
  'Â',
  'B',
  'C',
  'D',
  'E',
  'É',
  'Ê',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'Ó',
  'Ô',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  ' ',
];

input.addEventListener('keypress', function (event) {
  if (!allowedCharacter.includes(event.key.toUpperCase())) {
    event.preventDefault();
  }

  if (event.key == 'Enter') {
    draw();
  }
});

input.addEventListener('input', () => {
  draw();
});

let sets = [];

async function draw() {
  let value = input.value.toUpperCase();
  value = value.replaceAll('A', 'Á');
  value = value.replaceAll('E', 'É');
  value = value.replaceAll('O', 'Ó');
  value = value.split(' ');

  await createSetOfLetters(value[value.length - 1])
    .then((result) => {
      image.src = result;
      sets[value.length - 1] = result;
      sets = sets.slice(0, value.length);
      input.classList.remove('wrong');
    })
    .catch((err) => {
      console.log(err);
      input.classList.add('wrong');
    });

  drawFullText();
}

const preview = document.querySelector('#full-text img');
const fullText = document.createElement('canvas');
const fullTextContext = fullText.getContext('2d');
let previewImagesToLoad = 0;

fullText.width = 17 * 4;
fullText.height = 16;
fullTextContext.imageSmoothingEnabled = false;

function drawFullText() {
  fullText.width = 17 * sets.length;
  previewImagesToLoad = sets.length;

  fullTextContext.clearRect(0, 0, fullText.width, fullText.height);

  sets.forEach((set, index) => {
    const image = new Image();
    image.src = set;
    image.dataset.index = index;
    image.onload = function () {
      fullTextContext.drawImage(this, this.dataset.index * 17, 0);

      previewImagesToLoad--;
      if (previewImagesToLoad == 0) {
        updatePreview();
      }
    };
  });
}

function updatePreview() {
  const boxPreview = preview.parentElement;
  boxPreview.scrollLeft = boxPreview.scrollWidth;

  preview.src = fullText.toDataURL();
}
