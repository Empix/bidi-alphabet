const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');

// https://docs.google.com/spreadsheets/d/1-7DOQuRnRQ9xH2RjzgcJxXoMGHWKWkO_feX29cowpYc/edit#gid=0
const sheetId = '1-7DOQuRnRQ9xH2RjzgcJxXoMGHWKWkO_feX29cowpYc';
const gid = '0';

/**
 * Retorna um csv com aspas e aparentemente remove linhas vazias
 * https://docs.google.com/spreadsheets/d/{{ID}}/gviz/tq?tqx=out:csv&gid={{gid}}
 *
 * Retorna um csv sem aspas (assim como quando é feito download pelo google)
 * https://docs.google.com/spreadsheets/d/{{ID}}/export?gid={{gid}}&format=csv
 */
const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?gid=${gid}&format=csv`;
const csvPath = path.join(__dirname, 'files', 'sheet.csv');
const finalDataPath = path.join(__dirname, '..', 'data.js');

const fontsUrl = `https://www.dropbox.com/sh/xmowiag4ap530pe/AAB1xfiQ8mXHxHJSh2XM8reBa?dl=1`;
const fontsPath = path.join(__dirname, 'files', 'fonts.zip');
const finalFontsPath = path.join(__dirname, '..', 'fonts');

(async () => {
  console.log('- Baixando csv...');
  fetch(sheetUrl).then((res) => {
    const stream = fs.createWriteStream(csvPath);
    res.body.pipe(stream).on('close', csvToJs);
  });

  console.log('- Baixando fontes...');
  fetch(fontsUrl).then((res) => {
    const stream = fs.createWriteStream(fontsPath);
    res.body.pipe(stream).on('close', unzip);
  });
})();

async function unzip() {
  console.log('- Extraindo fontes...');
  const zip = new AdmZip(fontsPath);
  zip.extractAllToAsync(finalFontsPath, true, (err) => {
    if (err) return console.log(err);
    console.log('- Excluindo fonts.zip');
    fs.unlinkSync(fontsPath);
  });
}

async function csvToJs() {
  console.log('- Convertendo csv...');
  csv()
    .fromFile(csvPath)
    .then(async (json) => {
      const result = {};

      json.forEach((obj) => {
        const pt = obj['Português \n(NÃO MEXER!)'];
        const bidi = obj['BIDI\n(NÃO MEXER!)'];

        if (!bidi) return;

        result[pt] = bidi;
      });

      fs.writeFile(
        finalDataPath,
        'const data = ' + JSON.stringify(result),
        (err) => {
          if (err) return console.log(err);
          console.log('- Excluindo sheet.csv');
          fs.unlinkSync(csvPath);
        }
      );
    });
}
