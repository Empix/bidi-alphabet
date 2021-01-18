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
  if (this.value == secretohehehe(true)) {
    secretohehehe(false);
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
var _0xea56 = [
  '0123456789',
  '.links',
  '40MqLDvU',
  '44819rmZnwb',
  '1969451puBQlR',
  '1czVCyt',
  '<span\x20class=\x22secreto\x22>Eu\x20sou\x20quem\x20vocês\x20sabem\x20que\x20eu\x20sou.\x2021/01/21</span>',
  '3CsrPob',
  '239jggQPw',
  'bfM',
  '.links\x20.secreto',
  '948791xcoCHa',
  '561518DqCEQr',
  '3fQMsLO',
  '1etozAm',
  '529847bwNATb',
  '4395eDNzVP',
  '1073050aGBofF',
];
var _0x1d38 = function (_0x51276f, _0x31f456) {
  _0x51276f = _0x51276f - 0x12b;
  var _0xea5672 = _0xea56[_0x51276f];
  return _0xea5672;
};
(function (_0x5f20cb, _0x2f2b6c) {
  var _0x3cfe71 = _0x1d38;
  while (!![]) {
    try {
      var _0x362dc4 =
        parseInt(_0x3cfe71(0x135)) * -parseInt(_0x3cfe71(0x134)) +
        -parseInt(_0x3cfe71(0x139)) +
        parseInt(_0x3cfe71(0x136)) * -parseInt(_0x3cfe71(0x133)) +
        -parseInt(_0x3cfe71(0x12b)) * parseInt(_0x3cfe71(0x13c)) +
        parseInt(_0x3cfe71(0x130)) * parseInt(_0x3cfe71(0x138)) +
        -parseInt(_0x3cfe71(0x12d)) * parseInt(_0x3cfe71(0x137)) +
        -parseInt(_0x3cfe71(0x12f)) * -parseInt(_0x3cfe71(0x12c));
      if (_0x362dc4 === _0x2f2b6c) break;
      else _0x5f20cb['push'](_0x5f20cb['shift']());
    } catch (_0x53c0aa) {
      _0x5f20cb['push'](_0x5f20cb['shift']());
    }
  }
})(_0xea56, 0xe2fdc);
function secretohehehe(_0x5452ae) {
  var _0x1c7217 = _0x1d38;
  if (document['querySelector'](_0x1c7217(0x132))) return _0x1c7217(0x13a);
  if (_0x5452ae) return _0x1c7217(0x131);
  document['querySelector'](_0x1c7217(0x13b))['innerHTML'] += _0x1c7217(0x12e);
}
