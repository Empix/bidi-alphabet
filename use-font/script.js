const toAdd = ['á_', 'â_', 'é_', 'ê_', 'i_', 'ó_', 'ô_', 'u_']; // vogais para adicionar
const bidi = ['a', 'a', 'e', 'e', 'i', 'o', 'o', 'u']; // correspondencia em bidi (repete por conta da posição)
const vowels = ['á', 'â', 'é', 'ê', 'í', 'ó', 'ô', 'ú']; // i, u com acento
const vowels2 = ['á', 'â', 'é', 'ê', 'i', 'ó', 'ô', 'u']; // i, u sem acento
const AllVowels = ['á', 'â', 'é', 'ê', 'i', 'í', 'ó', 'ô', 'u', 'ú'];
const AllVowelsBidi = ['á', 'â', 'é', 'ê', 'í', 'í', 'ó', 'ô', 'ú', 'ú'];
const consonants = [
  'b_',
  'c_',
  'd_',
  'f_',
  'g_',
  'h_',
  'j_',
  'k_',
  'l_',
  'm_',
  'n_',
  'p_',
  'q_',
  'r_',
  's_',
  't_',
  'v_',
  'w_',
  'x_',
  'y_',
  'z_',
  'ç_',
]; // consoantes para adicionar

consonants.forEach((set) => {
  AllVowels.forEach((vowel, indexVowel) => {
    data[set.replace('_', vowel)] = `${set.replace('_', '')}${
      AllVowelsBidi[indexVowel]
    }`;
  });
}); // Adiciona as consoantes com as vogais

consonants.forEach((set) => {
  data[set.replace('_', '')] = set.replace('_', '');
}); // Adicionar as consoantes sozinhas

toAdd.forEach((set, index) => {
  AllVowels.forEach((vowel, indexVowel) => {
    data[
      set.replace('_', vowel)
    ] = `${bidi[index]}${AllVowelsBidi[indexVowel]}`;
  });
}); // Adiciona as vogais com as vogais

vowels2.forEach((vowel, index) => {
  data[vowel] = bidi[index];
}); // Adiciona as vogais sozinhas

/**
 *
 *
 * INICIO SUBSTITUIÇÃO
 *
 *
 */

const info = document.querySelector('#info');
const phrase = document.querySelector('#phrase');
const bidiPhrase = document.querySelector('#bidi-phrase');
const bidiResult = document.querySelector('#bidi-result');

phrase.addEventListener('input', function () {
  let result = '';

  this.value
    .toLowerCase()
    .replace('a', 'á')
    .replace('e', 'ê')
    .replace('o', 'ô')
    .replace('i', 'í')
    .replace('u', 'ú')
    .split(' ')
    .forEach((syllable) => {
      if (syllable === '') {
        info.innerHTML = '';
        return;
      }

      if (data[syllable]) {
        result += data[syllable];
        info.innerHTML = '';
      } else {
        result += '<span class="wrong">?</span>';
        info.innerHTML = `Não encontrei uma correspondência em BIDI para "<span>${syllable}</span>"`;
      }
    });

  bidiPhrase.innerHTML = result;
  bidiResult.innerHTML = result;

  bidiPhrase.scrollLeft = bidiPhrase.scrollWidth;
  bidiResult.scrollTop = bidiResult.scrollHeight;
});

document.querySelector('#change-font').addEventListener('click', function () {
  if (
    bidiResult.style.fontFamily != 'BIDI' &&
    bidiResult.style.fontFamily != ''
  ) {
    this.innerHTML = 'Usar fonte Hi-res <span>exêmŒô</span>';
    bidiResult.style.fontFamily = 'BIDI';
    this.children[0].style.fontFamily = 'BidiStylishHi_res-Regular';
  } else {
    this.innerHTML = 'Usar fonte Pixel <span>exêmŒô</span>';
    bidiResult.style.fontFamily = 'BidiStylishHi_res-Regular';
    this.children[0].style.fontFamily = 'BIDI';
  }
});
