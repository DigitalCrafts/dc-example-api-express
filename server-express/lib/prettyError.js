const PrettyError = require('pretty-error');
const path = require('path');
const pe = new PrettyError();

pe.skipNodeFiles();
pe.skipPackage('express');
pe.alias(path.resolve(), `[${path.basename(path.resolve())}]`);
pe.appendStyle({
  'pretty-error > header': {
    marginTop: 1,
  },
  'pretty-error > header > title > kind': {
    padding: '0 1',
  },
  'pretty-error > header > colon': {
    display: 'none',
  },
  'pretty-error > header > message': {
    color: 'bright-white',
    background: 'cyan',
    padding: '0 1',
  },
  'pretty-error > trace': {
    marginTop: 0,
    marginLeft: 2,
  },
  'pretty-error > trace > item': {
    marginBottom: 0,
  },
});

module.exports = pe;
