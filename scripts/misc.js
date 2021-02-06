/* MENU */
const menuButton = document.querySelector('.mobile-menu');
const menuLinks = document.querySelector('.menu ul');

menuButton.addEventListener('click', function () {
  menuIsShowing = menuLinks.style.display == 'flex';
  menuLinks.style.display = menuIsShowing ? 'none' : 'flex';

  menuIconIsClose = this.children[0].innerText == 'close';
  this.children[0].innerText = menuIconIsClose ? 'menu' : 'close';
});

window.addEventListener('resize', () => {
  menuLinks.style = '';
  menuButton.children[0].innerText = 'menu';
});

/* SETTINGS */
const changeFontBtn = document.querySelector('#change-font');

changeFontBtn.addEventListener('click', function () {
  const currentFont = localStorage.getItem('--bidi-font');

  if (currentFont == 'BIDI') {
    document.documentElement.style.setProperty(
      '--bidi-font',
      'BidiStylishHi_res-Regular'
    );
    localStorage.setItem('--bidi-font', 'BidiStylishHi_res-Regular');
  } else {
    document.documentElement.style.setProperty('--bidi-font', 'BIDI');
    localStorage.setItem('--bidi-font', 'BIDI');
  }
});

const debugModeBtn = document.querySelector('#debug-mode');

if (debugModeBtn) {
  debugModeBtn.addEventListener('click', function () {
    const currentDebugColor = localStorage.getItem('--debug-color');

    if (!currentDebugColor || currentDebugColor == '#000') {
      document.documentElement.style.setProperty('--debug-color', '#a200ff');
      localStorage.setItem('--debug-color', '#a200ff');
      debugModeBtn.style.border = '2px solid #fff';
    } else {
      document.documentElement.style.setProperty('--debug-color', '#000');
      localStorage.setItem('--debug-color', '#000');
      debugModeBtn.style.border = '2px solid transparent';
    }
  });
}

/* LOAD SETTINGS */
(() => {
  const bidiFont =
    localStorage.getItem('--bidi-font') || 'BidiStylishHi_res-Regular';
  document.documentElement.style.setProperty('--bidi-font', bidiFont);

  if (debugModeBtn) {
    const debugColor = localStorage.getItem('--debug-color') || '#000';
    document.documentElement.style.setProperty('--debug-color', debugColor);
    if (debugColor == '#a200ff') {
      debugModeBtn.style.border = '2px solid #fff';
    }
  }
})();

/* HANDLE CONVERT */
function handleConvert({ errors, syllables }) {
  handleErrors(errors);
  handleSyllables(syllables);
}

/* HANDLE ERRORS */
const errorsBox = document.querySelector('.errors');
const errorsCount = document.querySelector('.errors span');

function handleErrors(errors) {
  if (errors.length) {
    errorsBox.style.display = 'flex';
    errorsCount.innerText = `Erros: ${errors.length}`;
  } else {
    errorsBox.style.display = 'none';
    toggleErrorsTable('none');
  }

  populateErrorsTable(errors);
}

/* ERRORS TABLE */
const errorsTableBox = document.querySelector('.errors-table');
const errorsTable = document.querySelector('.errors-table table');

errorsBox.addEventListener('click', () => toggleErrorsTable());

function toggleErrorsTable(display) {
  if (display) {
    errorsTableBox.style.display = display;
  } else {
    toggleSyllablesTable('none');
    errorsTableIsShowing = errorsTableBox.style.display == 'block';
    errorsTableBox.style.display = errorsTableIsShowing ? 'none' : 'block';
  }
}

function populateErrorsTable(errors) {
  errorsTable.innerHTML = `
  <tr id="errors-syllable">
    <th>Sílaba</th>
  </tr>
  <tr id="errors-position">
    <th>Posição</th>
  </tr>
  `;

  const errorsSyllable = document.querySelector('#errors-syllable');
  const errorsPosition = document.querySelector('#errors-position');

  errors.forEach(([syllable, position]) => {
    const syllableTd = document.createElement('td');
    const positionTd = document.createElement('td');

    syllableTd.innerText = syllable;
    positionTd.innerText = position;

    errorsSyllable.append(syllableTd);
    errorsPosition.append(positionTd);
  });
}

/* SYLLABLES BOX */
const syllablesButton = document.querySelector('.syllables');
const syllablesBox = document.querySelector('.syllable-table');
const syllablesTable = document.querySelector('.syllable-table table');

syllablesButton.addEventListener('click', () => toggleSyllablesTable());

function toggleSyllablesTable(display) {
  if (display) {
    syllablesBox.style.display = display;
  } else {
    toggleErrorsTable('none');
    syllablesBoxIsShowing = syllablesBox.style.display == 'block';
    syllablesBox.style.display = syllablesBoxIsShowing ? 'none' : 'block';
  }
}

function handleSyllables(syllables) {
  if (syllables.length == 0) {
    toggleSyllablesTable('none');
  }

  populateSyllablesTable(syllables);
}

function populateSyllablesTable(syllables) {
  syllablesTable.innerHTML = `
    <tr id="syllables-word">
      <th>Palavra</th>
    </tr>
    <tr id="syllables-syllables">
      <th>Sílabas</th>
    </tr>
    `;

  const syllablesWord = document.querySelector('#syllables-word');
  const syllablesSyllables = document.querySelector('#syllables-syllables');

  syllables.forEach(([word, syllables]) => {
    const wordTd = document.createElement('td');
    const syllablesTd = document.createElement('td');

    wordTd.innerText = word;
    syllablesTd.innerText = syllables;

    syllablesWord.append(wordTd);
    syllablesSyllables.append(syllablesTd);
  });
}
