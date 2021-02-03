data['\n'] = '\n';

class BIDI {
  constructor({ input, outputs, type, onConvert }) {
    this.input = input;
    this.outputs = Array.isArray(outputs) ? outputs : [outputs];
    this.type = type;
    this.errors = [];
    this.syllables = [];
    this.onConvert = onConvert || (() => {});

    if (!this[this.type]) {
      throw new Error(`"${this.type}" type does not exist!`);
    }

    input.addEventListener('input', ({ target }) => {
      this.outputs.forEach((output) => {
        if (output.nodeName != 'TEXTAREA' || output.nodeName != 'INPUT') {
          const result = this[this.type](target.value);
          output.innerHTML = result;
        } else {
          output.value = this[this.type](target.value);
        }
      });
    });
  }

  encrypt(string) {
    // console.time('Tempo');
    let loops = 0;

    this.errors = [];
    this.syllables = [];

    string = string
      .toLowerCase()
      // .replaceAll('a', 'á')
      .replaceAll('à', 'á')
      .replaceAll('ã', 'â')
      // .replaceAll('e', 'ê')
      // .replaceAll('o', 'ô')
      .replaceAll('õ', 'ô')
      // .replaceAll('i', 'í')
      // .replaceAll('u', 'ú')
      .replaceAll('í', 'i')
      .replaceAll('ú', 'u')
      .replaceAll('\n', ' \n ');

    let result = '';

    string.split(' ').forEach((word) => {
      let bidi = [];
      let syllables = [];

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
          bidi.unshift(
            dataToFind[find].replaceAll('?', '<span class="alert">?</span>')
          );
          syllables.unshift(find);
        } else if (!dataToFind[find] && find.length == 1) {
          end -= find.length;
          i = 0;
          found = true;
          bidi.unshift('<span class="wrong">?</span>');
          syllables.unshift('?');
          this.errors.push([find, word]);
        } else {
          found = false;
        }

        if (end <= 0) break;
      }

      this.syllables.push([word, syllables.join('-')]);
      result += bidi.join('');
    });

    // console.log(`Resultado: \n${result}`);
    // console.log(`Loops: ${loops}`);
    // console.timeEnd('Tempo');
    this.onConvert(this);
    return result;
  }

  encryptOld(string) {
    let result = '';

    this.errors = [];

    string
      .toLowerCase()
      // .replaceAll('a', 'á')
      .replaceAll('à', 'á')
      .replaceAll('ã', 'â')
      // .replaceAll('e', 'ê')
      // .replaceAll('o', 'ô')
      .replaceAll('õ', 'ô')
      // .replaceAll('i', 'í')
      // .replaceAll('u', 'ú')
      .replaceAll('í', 'i')
      .replaceAll('ú', 'u')
      .replaceAll('\n', ' \n ')
      .split(' ')
      .forEach((syllable, index) => {
        if (syllable === '') {
          return;
        }

        if (data[syllable]) {
          result += data[syllable].replaceAll(
            '?',
            '<span class="alert">?</span>'
          );
        } else {
          result += '<span class="wrong">?</span>';
          this.errors.push([syllable, index + 1]);
        }
      });

    this.onConvert(this);
    return result;
  }

  decrypt(string, withSpaces = true) {
    // console.time('Tempo');
    let loops = 0;

    this.errors = [];

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
        this.errors.push([find, start + 1]);
        start += 1;
        i = string.length - 1;
        result += '<span class="wrong">?</span>';
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
    this.onConvert(this);

    return result;
  }
}
