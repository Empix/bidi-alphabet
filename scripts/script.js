const input = document.querySelector('.phrase-input input');

const canvas = document.querySelector('#preview');
const ctx = canvas.getContext('2d');

canvas.width = 17;
canvas.height = 16;

const image = new Image();
image.onload = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(image, 0, 0);
};

const allowedCharacter = [
  'A',
  'B',
  'C',
  'D',
  'E',
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

const sets = [];

async function draw() {
  const value = input.value.toUpperCase().split(' ');

  await createSetOfLetters(value[value.length - 1])
    .then((result) => {
      image.src = result;
      sets[value.length - 1] = result;
      input.classList.remove('wrong');
    })
    .catch((err) => {
      console.log(err);
      input.classList.add('wrong');
    });

  scheduledAnimationFrame = false;
  drawFullText();
}

const fullText = document.querySelector('#full-text');
const fullTextContext = fullText.getContext('2d');

fullText.width = 17 * 4;
fullText.height = 16;

function drawFullText() {
  fullText.width = 17 * sets.length;

  fullTextContext.clearRect(0, 0, fullText.width, fullText.height);

  sets.forEach((set, index) => {
    const image = new Image();
    image.src = set;
    image.dataset.index = index;
    image.onload = function () {
      fullTextContext.drawImage(this, this.dataset.index * 17, 0);
    };
  });
}
