/*

ALTO NIVEL DE GAMBIARRA

*/

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
  'À',
  'Â',
  'Ã',
  'Ä',

  'B',
  'C',
  'D',

  'E',
  'É',
  'È',
  'Ê',
  'Ë',

  'F',
  'G',
  'H',

  'I',
  'Í',
  'Ì',
  'Î',
  'Ï',

  'J',
  'K',
  'L',
  'M',
  'N',

  'O',
  'Ó',
  'Ò',
  'Ô',
  'Õ',
  'Ö',

  'P',
  'Q',
  'R',
  'S',
  'T',

  'U',
  'Ú',
  'Ù',
  'Û',
  'Ü',

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

input.addEventListener('input', function () {
  secretohehehe(this.value);

  draw();
});

let sets = [];

async function draw() {
  let value = input.value.toUpperCase();
  value = value.replaceAll('A', 'Á');
  value = value.replaceAll('À', 'Á');
  value = value.replaceAll('Ã', 'Â');
  value = value.replaceAll('Ä', 'Â');

  value = value.replaceAll('E', 'É');
  value = value.replaceAll('È', 'É');
  value = value.replaceAll('Ë', 'Ê');

  value = value.replaceAll('Í', 'I');
  value = value.replaceAll('Ì', 'I');
  value = value.replaceAll('Î', 'I');
  value = value.replaceAll('Ï', 'I');

  value = value.replaceAll('O', 'Ó');
  value = value.replaceAll('Ò', 'Ó');
  value = value.replaceAll('Õ', 'Ô');
  value = value.replaceAll('Ö', 'Ô');

  value = value.replaceAll('Ú', 'U');
  value = value.replaceAll('Ù', 'U');
  value = value.replaceAll('Û', 'U');
  value = value.replaceAll('Ü', 'U');

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

// ---------------- secreto hehe
var _0x5a89 = [
  '\x2E\x6C\x69\x6E\x6B\x73\x20\x2E\x73\x65\x63\x72\x65\x74\x6F',
  '\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72',
  '\x72\x65\x6D\x6F\x76\x65',
  '\x62\x66\x4E\x4D',
  '\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C',
  '\x2E\x6C\x69\x6E\x6B\x73',
  '\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x73\x65\x63\x72\x65\x74\x6F\x22\x3E\x4D\x61\x6E\x64\x65\x20\x70\x61\x72\x61\x20\x6F\x20\x46\xE1\x62\x69\x6F\x20\x65\x73\x74\x65\x20\x63\xF3\x64\x69\x67\x6F\x3A\x20\x36\x31\x32\x39\x31\x35\x32\x31\x31\x39\x32\x30\x31\x35\x31\x39\x31\x33\x31\x31\x38\x33\x31\x35\x31\x39\x3C\x2F\x73\x70\x61\x6E\x3E',
  '\x62\x66\x4D',
  '\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x73\x65\x63\x72\x65\x74\x6F\x22\x3E\x45\x75\x20\x73\x6F\x75\x20\x71\x75\x65\x6D\x20\x76\x6F\x63\xEA\x73\x20\x73\x61\x62\x65\x6D\x20\x71\x75\x65\x20\x65\x75\x20\x73\x6F\x75\x2E\x20\x32\x31\x2F\x31\x32\x2F\x32\x31\x3C\x2F\x73\x70\x61\x6E\x3E',
];
function secretohehehe(_0x18acx2) {
  if (document[_0x5a89[1]](_0x5a89[0])) {
    document[_0x5a89[1]](_0x5a89[0])[_0x5a89[2]]();
  }
  if (_0x18acx2 == _0x5a89[3]) {
    document[_0x5a89[1]](_0x5a89[5])[_0x5a89[4]] += _0x5a89[6];
  }
  if (_0x18acx2 == _0x5a89[7]) {
    document[_0x5a89[1]](_0x5a89[5])[_0x5a89[4]] += _0x5a89[8];
  }
}
