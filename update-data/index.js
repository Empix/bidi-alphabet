const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');
const { resolve } = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

/*
 Retorna um csv com aspas e aparentemente remove linhas vazias
 https://docs.google.com/spreadsheets/d/{{ID}}/gviz/tq?tqx=out:csv&gid={{gid}}
 
 Retorna um csv sem aspas (assim como quando é feito download pelo google)
 https://docs.google.com/spreadsheets/d/{{ID}}/export?gid={{gid}}&format=csv
*/
const mainSheetURL = `https://docs.google.com/spreadsheets/d/${process.env.SHEET_ID}/export?format=csv`;

const syllablesSheet = {
  tempPath: path.join(__dirname, 'files', 'syllablesSheet.csv'),
  finalPath: path.join(__dirname, '..', 'scripts', 'syllablesData.js'),
  url: `${mainSheetURL}&gid=0`,
  process: (info) => csvToJs(info, parseSyllablesJson),
};

const wordsSheet = {
  tempPath: path.join(__dirname, 'files', 'wordsSheet.csv'),
  finalPath: path.join(__dirname, '..', 'scripts', 'wordsData.js'),
  url: `${mainSheetURL}&gid=1116965470`,
  process: (info) => csvToJs(info, parseWordsJson),
};

const fontsDownload = {
  tempPath: path.join(__dirname, 'files', 'fonts.zip'),
  finalPath: path.join(__dirname, '..', 'assets', 'fonts'),
  url: `https://www.dropbox.com/sh/xmowiag4ap530pe/AAB1xfiQ8mXHxHJSh2XM8reBa?dl=1`,
  process: unzip,
};

(async () => {
  console.log('\n- Baixando csv sílabas...');
  await fetchData(syllablesSheet);

  console.log('\n- Baixando csv palavras...');
  await fetchData(wordsSheet);

  console.log('\n- Baixando fontes...');
  await fetchData(fontsDownload);
})();

async function fetchData(info) {
  await fetch(info.url).then(async (res) => {
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(info.tempPath);
      res.body.pipe(stream).on('close', async () => {
        await info.process(info);
        resolve();
      });
    });
  });
}

async function unzip(info) {
  console.log('- Extraindo zip...');
  const zip = new AdmZip(info.tempPath);
  await new Promise((resolve, reject) => {
    zip.extractAllToAsync(info.finalPath, true, (err) => {
      if (err) {
        console.log(err);
        return reject();
      }

      console.log('- Excluindo zip...');
      fs.unlink(info.tempPath, (err) => {
        if (err) {
          console.log(err);
          return reject();
        }

        return resolve();
      });
    });
  });
}

async function csvToJs(info, parser) {
  console.log('- Convertendo csv...');
  await csv()
    .fromFile(info.tempPath)
    .then(async (json) => {
      const parsed = parser(json);

      await new Promise((resolve, reject) => {
        fs.writeFile(info.finalPath, parsed, (err) => {
          if (err) {
            console.log(err);
            return reject();
          }

          console.log('- Excluindo csv...');
          fs.unlink(info.tempPath, (err) => {
            if (err) {
              console.log(err);
              return reject();
            }

            return resolve();
          });
        });
      });
    });
}

function parseSyllablesJson(json) {
  const result = {};

  json.forEach((obj) => {
    if (obj['IGNORAR?\n(FILTRO 1)'] == 'TRUE') {
      return;
    }

    const pt = obj['Português \n(NÃO MEXER!)'];
    const bidi = obj['BIDI\n(NÃO MEXER!)'];

    if (!bidi) return;

    result[pt] = bidi;
  });

  return 'const syllablesData = ' + JSON.stringify(result);
}

function parseWordsJson(json) {
  const result = {};

  json.forEach((obj) => {
    const syllables = [
      obj['Sílaba 1'],
      obj['Sílaba 2'],
      obj['Sílaba 3'],
      obj['Sílaba 4'],
      obj['Sílaba 5'],
    ].join('');

    const pt = syllables;
    const bidi = obj['Resultado\n(NÃO MEXER!)'];

    result[pt] = bidi;
  });

  return 'const wordsData = ' + JSON.stringify(result);
}
