const toAdd = ['á_', 'â_', 'é_', 'ê_', 'i_', 'ó_', 'ô_', 'u_']; // vogais para adicionar
const bidi = ['a', 'a', 'e', 'e', 'i', 'o', 'o', 'u']; // correspondencia em bidi (repete por conta da posição)
const vowels = ['á', 'â', 'é', 'ê', 'í', 'ó', 'ô', 'ú']; // i, u com acento
const vowels2 = ['á', 'â', 'é', 'ê', 'i', 'ó', 'ô', 'u']; // i, u sem acento
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
]; // consoantes para adicionar

consonants.forEach((set) => {
  vowels.forEach((vowel, indexVowel) => {
    data[set.replace('_', vowels2[indexVowel])] = `${set.replace(
      '_',
      ''
    )}${vowel}`;
  });
}); // Adiciona as consoantes com as vogais

consonants.forEach((set) => {
  data[set.replace('_', '')] = set.replace('_', '');
}); // Adicionar as consoantes sozinhas

toAdd.forEach((set, index) => {
  vowels.forEach((vowel, indexVowel) => {
    data[set.replace('_', vowels2[indexVowel])] = `${bidi[index]}${vowel}`;
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
