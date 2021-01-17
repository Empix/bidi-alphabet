const fs = require('fs');
const path = require('path');
const data = require('./csvjson.json');

const result = {};

data.forEach((obj) => {
  const pt = obj['Português \n(NÃO MEXER!)'];
  const bidi = obj['BIDI\n(NÃO MEXER!)__1'];

  if (!bidi) return;

  result[pt] = bidi;
});

// parsed = removeEqualValues(parsed);

// function removeEqualValues(array) {
//   const result = [];
//   const uniqueValues = [];

//   for (const obj of array) {
//     if (!uniqueValues.includes(obj.pt)) {
//       uniqueValues.push(obj.pt);

//       result.push({
//         pt: obj.pt,
//         bidi: obj.bidi,
//       });
//     }
//   }

//   return result;
// }

fs.writeFileSync(
  path.join(__dirname, 'data.js'),
  'const data = ' + JSON.stringify(result)
);
