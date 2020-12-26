function createSetOfLetters(syllable) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 17;
    canvas.height = 16;

    if (!syllable) {
      resolve(canvas.toDataURL());
    }

    let letters = syllable.toUpperCase().split('');

    // ¯\_(ツ)_/¯
    if (letters[letters.length - 2] + letters[letters.length - 1] == 'NS') {
      letters = letters.slice(0, letters.length - 2);
      letters.push('NS'); // "phonemeType" só retorna "consonant" porque NS não está no array "vowels"
    }

    const images = letters.map(() => new Image());
    images.push(new Image()); // hasConsonant
    let imagesToLoad = images.length;

    images.forEach((image) => {
      image.onload = function () {
        ctx.drawImage(this, 0, 0);

        imagesToLoad -= 1;

        if (imagesToLoad == 0) {
          resolve(canvas.toDataURL());
        }

        this.remove();
      };

      image.onerror = () => {
        reject('Ocorreu um erro!');
      };
    });

    const allowedLetters = {
      vowels: ['A', 'E', 'I', 'O', 'U'],
      consonants: [
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
    };

    const sequence = [
      'vowels/first',
      'consonants/first',
      'consonants/second',
      'vowels/second',
      'vowels/third',
      'vowels/fourth',
      'consonants/third',
    ];

    let hasConsonant = false;

    let currentSequencePosition = 0;
    let currentImagePosition = 0;

    letters.forEach((letter) => {
      const phonemeType = allowedLetters.vowels.includes(letter)
        ? 'vowels'
        : 'consonant';

      if (phonemeType == 'consonant') {
        hasConsonant = true;
      }

      for (let i = currentSequencePosition; i < sequence.length; i++) {
        if (sequence[i].includes(phonemeType)) {
          images[
            currentImagePosition
          ].src = `./../assets/letters/${sequence[i]}/${letter}.png`;

          currentSequencePosition = i + 1;
          currentImagePosition++;
          break;
        }
      }
    });

    if (!hasConsonant) {
      images[
        images.length - 1
      ].src = `./../assets/letters/consonants/first/NULL.png`;
    } else {
      images[
        images.length - 1
      ].src = `./../assets/letters/consonants/first/empty.png`;
    }
  });
}
