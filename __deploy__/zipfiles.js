/* eslint-disable func-names */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const archiver = require('archiver');

const archive = archiver('zip');
const fs = require('fs');
const packageSettings = require('../package.json');

console.log('Compactando arquivos...');

const folderName = `${packageSettings.name}-${packageSettings.version}`;

console.log(`Criando arquivo ${folderName}.zip`);

const output = fs.createWriteStream(`${__dirname}/installer/${folderName}.zip`);

archive.pipe(output);

archive.directory('__deploy__', `${folderName}`);

archive.on('error', function(err) {
  throw err;
});

archive.finalize(function(err, bytes) {
  if (err) {
    throw err;
  }
  console.log(`${bytes} bytes`);
  console.log(`Arquivo ${folderName}.zip criado com sucesso`);
});
