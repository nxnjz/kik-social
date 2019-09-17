import loadPolyfills from '../kiksocial/load_polyfills';
import { start } from '../kiksocial/common';

start();

loadPolyfills().then(() => {
  require('../kiksocial/main').default();
}).catch(e => {
  console.error(e);
});
