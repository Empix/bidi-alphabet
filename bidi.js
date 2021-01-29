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

data['\n'] = '\n';

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

const bidiResult = document.querySelector('#bidi-result');

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

class BIDI {
  constructor({ input, outputs, type }) {
    this.input = input;
    this.outputs = Array.isArray(outputs) ? outputs : [outputs];
    this.type = type;

    if (!BIDI[type]) {
      throw new Error(`"${this.type}" type does not exist!`);
    }

    input.addEventListener('input', ({ target }) => {
      this.outputs.forEach((output) => {
        if (output.nodeName != 'TEXTAREA' || output.nodeName != 'INPUT') {
          output.innerText = BIDI[this.type](target.value);
        } else {
          output.value = BIDI[this.type](target.value);
        }
      });
    });
  }

  static encrypt(string) {
    // console.time('Tempo');
    let loops = 0;

    string = string
      .toLowerCase()
      // .replaceAll('a', 'á')
      // .replaceAll('à', 'á')
      // .replaceAll('ã', 'â')
      // .replaceAll('e', 'ê')
      // .replaceAll('o', 'ô')
      // .replaceAll('õ', 'ô')
      // .replaceAll('i', 'í')
      // .replaceAll('u', 'ú')
      .replaceAll('\n', ' \n ');

    let result = '';

    string.split(' ').forEach((word) => {
      let bidi = [];

      let dataToFind = {};
      for (const set in data) {
        if (word.includes(set)) {
          dataToFind[set] = data[set];
        }
      }

      let end = word.length;
      let found = false;
      for (let i = 0; i < word.length; i++) {
        if (found) i = 0;

        loops++;

        const find = word.substring(i, end);
        if (dataToFind[find]) {
          end -= find.length;
          i = 0;
          found = true;
          bidi.unshift(dataToFind[find]);
        } else if (!dataToFind[find] && find.length == 1) {
          end -= find.length;
          i = 0;
          found = true;
          bidi.unshift('?');
        } else {
          found = false;
        }

        if (end <= 0) break;
      }

      result += bidi.join('');
    });

    // console.log(`Resultado: \n${result}`);
    // console.log(`Loops: ${loops}`);
    // console.timeEnd('Tempo');
    return result;
  }

  static decrypt(string, withSpaces = true) {
    // console.time('Tempo');
    let loops = 0;

    let result = '';

    const dataToFind = {};
    for (const set in data) {
      if (string.includes(data[set])) {
        dataToFind[data[set]] = set;
      }
    }

    let start = 0;
    for (let i = string.length - 1; i >= 0; i--) {
      if (i > 2) continue;

      loops++;

      const find = string.substring(start, i + start + 1);
      if (dataToFind[find]) {
        start += find.length;
        i = string.length;
        if (withSpaces) {
          result += ` ${dataToFind[find]} `;
        } else {
          result += dataToFind[find];
        }
      } else if (!dataToFind[find] && find.length == 1) {
        start += 1;
        i = string.length - 1;
        result += '?';
      }
    }

    result = result
      .replaceAll(/  +/g, ' ')
      .trim()
      .replaceAll(' \n ', '\n')
      .replaceAll('\n ', '\n');

    // console.log(`Resultado: \n${result}`);
    // console.log(`Loops: ${loops}`);
    // console.timeEnd('Tempo');
    return result;
  }
}
