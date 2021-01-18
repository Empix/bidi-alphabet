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
  if (this.value.toUpperCase() == secretohehehe(true)) {
    secretohehehe();
  }

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
var _0x3ed4 = [
  '2oMRigp',
  '.links',
  '49oLzDDV',
  '1382221wiHttv',
  '58167cmYcdz',
  '3MpuFNM',
  'BFM',
  '187948hoJQmJ',
  '1TVDHsY',
  '19678iWjEAa',
  '8743LVceYB',
  '640282iCaCVa',
  '1KkKNLY',
  '9IpNCPj',
  'innerHTML',
  '147988CExxcH',
];
var _0xb379 = function (_0x3cd068, _0x297bc0) {
  _0x3cd068 = _0x3cd068 - 0x1ae;
  var _0x3ed434 = _0x3ed4[_0x3cd068];
  return _0x3ed434;
};
(function (_0x2c2fa2, _0x52de86) {
  var _0x2626e0 = _0xb379;
  while (!![]) {
    try {
      var _0x59181d =
        parseInt(_0x2626e0(0x1af)) * -parseInt(_0x2626e0(0x1b8)) +
        parseInt(_0x2626e0(0x1b9)) * parseInt(_0x2626e0(0x1b3)) +
        -parseInt(_0x2626e0(0x1b0)) +
        parseInt(_0x2626e0(0x1b7)) * parseInt(_0x2626e0(0x1b4)) +
        -parseInt(_0x2626e0(0x1b5)) * -parseInt(_0x2626e0(0x1bc)) +
        parseInt(_0x2626e0(0x1b1)) * -parseInt(_0x2626e0(0x1bb)) +
        -parseInt(_0x2626e0(0x1b6)) * -parseInt(_0x2626e0(0x1ae));
      if (_0x59181d === _0x52de86) break;
      else _0x2c2fa2['push'](_0x2c2fa2['shift']());
    } catch (_0x58afb7) {
      _0x2c2fa2['push'](_0x2c2fa2['shift']());
    }
  }
})(_0x3ed4, 0xdf719);
function secretohehehe(_0x11c737) {
  var _0x7b2a29 = _0xb379;
  if (_0x11c737) return _0x7b2a29(0x1b2);
  document['querySelector'](_0x7b2a29(0x1bd))[_0x7b2a29(0x1ba)] +=
    '<span\x20class=\x22secreto\x22>Eu\x20sou\x20quem\x20vocês\x20sabem\x20que\x20eu\x20sou.</span>';
}
