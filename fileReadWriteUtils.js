const fs = require('fs');

const readFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeToFile = (filePath, contents) => fs.writeFile(filePath, JSON.stringify(contents), (err) => {
  if (err) throw err;
});

module.exports = { readFile, writeToFile };