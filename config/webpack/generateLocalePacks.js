// To avoid adding a lot of boilerplate, locale packs are
// automatically generated here. These are written into the tmp/
// directory and then used to generate locale_en.js, locale_fr.js, etc.

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const localesJsonPath = path.join(__dirname, '../../app/javascript/kiksocial/locales');
const locales = fs.readdirSync(localesJsonPath).filter(filename => {
  return /\.json$/.test(filename) &&
    !/defaultMessages/.test(filename) &&
    !/whitelist/.test(filename);
}).map(filename => filename.replace(/\.json$/, ''));

const outPath = path.join(__dirname, '../../tmp/packs');

rimraf.sync(outPath);
mkdirp.sync(outPath);

const outPaths = [];

locales.forEach(locale => {
  const localePath = path.join(outPath, `locale_${locale}.js`);
  const baseLocale = locale.split('-')[0]; // e.g. 'zh-TW' -> 'zh'
  const localeDataPath = [
    // first try react-intl
    `../../node_modules/react-intl/locale-data/${baseLocale}.js`,
    // then check locales/locale-data
    `../../app/javascript/kiksocial/locales/locale-data/${baseLocale}.js`,
    // fall back to English (this is what react-intl does anyway)
    '../../node_modules/react-intl/locale-data/en.js',
  ].filter(filename => fs.existsSync(path.join(outPath, filename)))
    .map(filename => filename.replace(/..\/..\/node_modules\//, ''))[0];

  const localeContent = `//
// locale_${locale}.js
// automatically generated by generateLocalePacks.js
//
import messages from '../../app/javascript/kiksocial/locales/${locale}.json';
import localeData from ${JSON.stringify(localeDataPath)};
import { setLocale } from '../../app/javascript/kiksocial/locales';
setLocale({messages, localeData});
`;
  fs.writeFileSync(localePath, localeContent, 'utf8');
  outPaths.push(localePath);
});

module.exports = outPaths;


